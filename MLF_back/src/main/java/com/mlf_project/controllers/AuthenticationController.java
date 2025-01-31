package com.mlf_project.controllers;

import com.mlf_project.dto.request.LoginRequest;
import com.mlf_project.dto.request.RefreshTokenRequest;
import com.mlf_project.dto.request.RegisterRequest;
import com.mlf_project.dto.response.AuthenticationResponse;
import com.mlf_project.dto.response.MessageResponse;
import com.mlf_project.dto.response.RefreshTokenResponse;
import com.mlf_project.security.services.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;

@RequestMapping("/api/auth")
@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200/*", allowCredentials = "true", maxAge = 86400)
@RestController
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    @Value(value = "${issuer_id}")
    private transient String issuerId;


    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) throws MessagingException {
        logger.info("Attempting to register user: {}", registerRequest.getUsername());
        MessageResponse messageResponse = authenticationService.registerUser(registerRequest);
        if (messageResponse.getMessage().startsWith("Error:")) {
            logger.warn("Registration error: {}", messageResponse.getMessage());
            return ResponseEntity.badRequest().body(messageResponse);
        } else {
            logger.info("User registered successfully: {}", registerRequest.getUsername());
            return ResponseEntity.ok(messageResponse);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) throws NoSuchAlgorithmException {
        logger.info("Attempting to authenticate user: {}", loginRequest.getUsername());
        return ResponseEntity.ok(authenticationService.authenticateUser(loginRequest, response, issuerId));

    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
        logger.info("Attempting to refresh token for user");
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest, issuerId, response));
    }


    @PostMapping("/logout")
    public MessageResponse logout(@RequestHeader("Authorization") String jwt, HttpServletResponse response) {
        if (jwt != null && !jwt.isEmpty()) {
            if (jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }

            logger.debug("Token received for logout: {}", jwt);

            try {
                return authenticationService.logout(jwt, response, "fingerprint");
            } catch (IllegalArgumentException e) {
                logger.error("Base64 decoding error in logout method: {}", e.getMessage(), e);
                return new MessageResponse("Error during logout: Invalid token format");
            } catch (Exception e) {
                logger.error("Error in logout method: {}", e.getMessage(), e);
                return new MessageResponse("Error during logout: " + e.getMessage());
            }
        } else {
            return new MessageResponse("Error in logout method: Authorization header is missing or empty");
        }
    }

    @GetMapping("/activate-account")
    public void confirm(@RequestParam String token) throws MessagingException {
        authenticationService.activateAccount(token);
    }

    @PostMapping("/validate-token")
    public MessageResponse validateToken(@RequestBody String token) throws GeneralSecurityException {
        return authenticationService.isTokenExpired(token);
    }

//    @PostMapping("/validate-token")
//    public ResponseEntity<Map<String, String>> validateToken(@RequestBody String token, HttpServletRequest request) {
//        try {
//            boolean isValid = utils.validateToken(token, request);
//            logger.info("Token validation result: " + isValid);
//            logger.info(token);
//
//            if (isValid) {
//                return ResponseEntity.ok(Map.of("message", "Token is valid"));
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(Map.of("message", "Token is invalid or expired"));
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("message", "Error validating token"));
//        }
//    }
}