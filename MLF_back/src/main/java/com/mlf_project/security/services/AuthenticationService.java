package com.mlf_project.security.services;

import com.mlf_project.dto.request.LoginRequest;
import com.mlf_project.dto.request.RefreshTokenRequest;
import com.mlf_project.dto.request.RegisterRequest;
import com.mlf_project.dto.response.AuthenticationResponse;
import com.mlf_project.dto.response.MessageResponse;
import com.mlf_project.dto.response.RefreshTokenResponse;
import com.mlf_project.entities.*;
import com.mlf_project.config.handler.TokenRefreshException;
import com.mlf_project.repository.RoleRepository;
import com.mlf_project.repository.TokenRepository;
import com.mlf_project.repository.UserRepository;
import com.mlf_project.security.email.EmailService;
import com.mlf_project.security.email.EmailTemplateName;
import com.mlf_project.security.jwt.JwtUtils;
import com.mlf_project.security.jwt.RefreshTokenService;
import com.mlf_project.security.jwt.TokenCipher;
import com.mlf_project.security.jwt.TokenRevoker;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final TokenRepository tokenRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;

    private final RefreshTokenService refreshTokenService;

    private final TokenCipher tokenCipher;

    private final TokenRevoker tokenRevoker;

    private final EmailService emailService;

    @Value("${mailing.frontend.activation-url}")
    private String activationUrl;


    public MessageResponse registerUser(RegisterRequest registerRequest) throws NoSuchAlgorithmException, MessagingException {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new MessageResponse("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new MessageResponse("Error: Email is already in use!");
        }
        User user = new User(registerRequest.getUsername(), registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()));


        Set<String> strRoles = registerRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);

        var userStatus = UserStatus.builder()
                .accountLocked(false)
                .enabled(false)
                .user(user)
                .build();

        user.setUserStatus(userStatus);

        userRepository.save(user);
        sendValidationEmail(user);

        return new MessageResponse("User registered successfully!");
    }


    private void sendValidationEmail(User user) throws NoSuchAlgorithmException, MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(
                user.getEmail(),
                user.getUsername(),
                EmailTemplateName.ACTIVATE_ACCOUNT,
                activationUrl,
                newToken,
                "Account activation"
        );
    }

    private String generateAndSaveActivationToken(User user) throws NoSuchAlgorithmException {
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);

        return generatedToken;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));

        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticateUser(LoginRequest loginRequest, HttpServletResponse response, String issuerId) throws UnsupportedEncodingException, NoSuchAlgorithmException {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException e) {
            System.out.println("Auth error " + e);
            throw e;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateAccessTokenFromUserDetails(response, userDetails, issuerId);
        String cipheredJwt;
        try {
            cipheredJwt = tokenCipher.cipherToken(jwt);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }

        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return new AuthenticationResponse(cipheredJwt, refreshToken.getToken(), userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles);
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest request, String issuerId, HttpServletResponse response) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(refreshToken -> {

                    refreshTokenService.deleteByToken(requestRefreshToken);

                    RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(refreshToken.getUser().getId());

                    String token;
                    String cipheredToken;
                    try {
                        token = jwtUtils.generateAccessTokenFromUsername(refreshToken.getUser().getUsername(), response, issuerId);
                    } catch (NoSuchAlgorithmException e) {
                        throw new RuntimeException(e);
                    }
                    try {
                        cipheredToken = tokenCipher.cipherToken(token);
                    } catch (GeneralSecurityException e) {
                        throw new RuntimeException(e);
                    }

                    return new RefreshTokenResponse(cipheredToken, newRefreshToken.getToken());
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!"));
    }

    public MessageResponse logout(String jwtInHex) {
        MessageResponse messageResponse;
        try {
            tokenRevoker.revokeToken(jwtInHex);
            messageResponse = new MessageResponse("Token successfully revoked!");
        } catch (Exception e) {
            logger.warn("Error during token validation", e);
            messageResponse = new MessageResponse("Error during token validation");
        }
        return messageResponse;
    }

//    @Transactional
    public void activateAccount(String token) throws MessagingException, NoSuchAlgorithmException {
    Token savedToken = tokenRepository.findByToken(token)
            .orElseThrow(()-> new RuntimeException("Invalid Token"));
    if(LocalDateTime.now().isAfter(savedToken.getExpiresAt())){
        sendValidationEmail(savedToken.getUser());
        throw new RuntimeException("Activation token has expired. A new token has been sent to the same email address");
    }
    var user = userRepository.findById(savedToken.getUser().getId())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserStatus userStatus = user.getUserStatus();
        if (userStatus == null) {
            userStatus = UserStatus.builder()
                    .accountLocked(false)
                    .enabled(true)
                    .user(user)
                    .build();
            user.setUserStatus(userStatus);
        } else {
            userStatus.setAccountLocked(false);
            userStatus.setEnabled(true);
        }

        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }
}
