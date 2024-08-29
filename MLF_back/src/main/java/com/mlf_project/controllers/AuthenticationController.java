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

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

@RequestMapping("/api/auth")
@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final AuthenticationService authenticationService;

    @Value(value = "${issuer_id}")
    private transient String issuerId;

    @PostMapping("/register")
    public ResponseEntity<MessageResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) throws NoSuchAlgorithmException, MessagingException {
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
    public ResponseEntity<AuthenticationResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest, HttpServletResponse response) throws UnsupportedEncodingException, NoSuchAlgorithmException {

            logger.info("Attempting to authenticate user: {}", loginRequest.getUsername());
//            AuthenticationResponse authenticationResponse = authenticationService.authenticateUser(loginRequest, response, issuerId);
//        logger.info("User authenticated successfully: {}", loginRequest.getUsername());
            return ResponseEntity.ok(authenticationService.authenticateUser(loginRequest, response, issuerId));

//        } catch (UnsupportedEncodingException | NoSuchAlgorithmException e) {
//            logger.error("Internal server error during authentication for user: {}", loginRequest.getUsername(), e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        } catch (AuthenticationException e) {
//            logger.warn("Authentication failed for user: {}", loginRequest.getUsername(), e);
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password");
//        } catch (Exception e) {
//            logger.error("Unexpected error during authentication for user: {}", loginRequest.getUsername(), e);
//            return ResponseEntity.badRequest().body("An unexpected error occurred");
//        }
        }




    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshTokens(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletResponse response) {
            logger.info("Attempting to refresh token for user");
//            RefreshTokenResponse tokenResponse = authenticationService.refreshToken(refreshTokenRequest, issuerId, response);
//            logger.info("Token refreshed successfully");
            return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest, issuerId, response));
    }


    @PostMapping("/logout")
    public MessageResponse logout(@RequestHeader("Authorization") String jwt) {
        if (jwt != null && !jwt.isEmpty()) {
            if (jwt.startsWith("Bearer ")) {
                jwt = jwt.substring(7);
            }

            logger.debug("Token received for logout: {}", jwt);

            try {
                return authenticationService.logout(jwt);
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
    public void confirm(@RequestParam String token) throws MessagingException, NoSuchAlgorithmException {
        authenticationService.activateAccount(token);
    }

}
