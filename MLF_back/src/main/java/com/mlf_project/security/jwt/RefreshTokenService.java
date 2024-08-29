package com.mlf_project.security.jwt;

import com.mlf_project.entities.RefreshToken;
import com.mlf_project.config.handler.TokenRefreshException;
import com.mlf_project.repository.RefreshTokenRepository;
import com.mlf_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${jwt.refreshExpirationTime}")
    private long refreshExpirationTime;


    private final RefreshTokenRepository refreshTokenRepository;

    private final JwtUtils utils;


    private final UserRepository userRepository;


    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        refreshToken.setExpiresAt(Instant.now().plusMillis(refreshExpirationTime));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiresAt().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(Long userId) {
        return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
    }
    @Transactional
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
