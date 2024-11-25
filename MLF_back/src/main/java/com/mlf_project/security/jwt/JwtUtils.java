package com.mlf_project.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mlf_project.exception.PermissionDeniedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Hex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.util.*;
import java.util.function.Function;

import static com.auth0.jwt.JWT.require;
import static com.auth0.jwt.algorithms.Algorithm.HMAC256;


@Service
@PropertySource("classpath:application.properties")
@RequiredArgsConstructor
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${my.secret.key}")
    private transient String SECRET_KEY;
    @Value("${issuer_id}")
    private transient String ISSUER_UD;
    private final TokenCipher tokenCipher;
    private final TokenRevoker tokenRevoker;


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessTokenFromUserDetails(UserDetails userDetails, String issuerId,String userFingerprintHash ) throws NoSuchAlgorithmException {
        return generateToken( userDetails.getUsername(), issuerId, userFingerprintHash);
    }

    public String generateAccessTokenFromUsername(String username, String issuerId,String userFingerprintHash) throws NoSuchAlgorithmException {
        return generateToken( username, issuerId,userFingerprintHash);
    }

    public String hashFingerprint(String userFingerprint) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
        return Hex.encodeHexString(userFingerprintDigest).toLowerCase();
    }


//    public void createCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly, boolean secure) {
//        ResponseCookie cookie = ResponseCookie.from(name, value)
//                .path("/")// Кука доступна для всего приложения
//                .httpOnly(httpOnly) // Доступна только через HTTP
//                .secure(secure) // Использовать только по HTTPS
//                .sameSite("None") // Защита от CSRF
//                .maxAge(maxAge) // Время жизни куки в секундах
//                .build();
//
//        System.out.println("Set-Cookie header: " + cookie);
//        response.addHeader("Set-Cookie", String.valueOf(cookie));
//    }

    public void createCookie(HttpServletResponse response, String name, String value, int maxAge, boolean httpOnly, boolean secure) {
        // Создаем объект Cookie
        Cookie cookie = new Cookie(name, value);

        // Настраиваем параметры куки
        cookie.setPath("/"); // Кука доступна для всего приложения
        cookie.setHttpOnly(httpOnly); // Доступна только через HTTP
        cookie.setSecure(secure); // Использовать только по HTTPS
        cookie.setMaxAge(maxAge); // Время жизни куки в секундах

        // Указываем SameSite=None через настройку заголовка (т.к. стандартный Cookie API не поддерживает SameSite)
        response.addHeader("Set-Cookie", String.format(
                "%s=%s; Path=%s; Max-Age=%d; HttpOnly=%s; Secure=%s; SameSite=None",
                cookie.getName(),
                cookie.getValue(),
                cookie.getPath(),
                cookie.getMaxAge(),
                httpOnly ? "true" : "false",
                secure ? "true" : "false"
        ));
        response.addCookie(cookie);

        System.out.println("Set-Cookie header: " + cookie);
    }




    public String createUserFingerprint(){
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomFgp = new byte[50];
        secureRandom.nextBytes(randomFgp);
        return Hex.encodeHexString(randomFgp);
    }

//    public String extractUserFingerprint(String jwt) {
//        DecodedJWT decodedJWT = JWT.decode(jwt);
//
//        String userFingerprint = decodedJWT.getClaim("userFingerprint").asString();
//
//        return userFingerprint;
//    }


    private String generateToken( String username, String issuerId, String userFingerprintHash) {
//        SecureRandom secureRandom = new SecureRandom();
//        byte[] randomFgp = new byte[50];
//        secureRandom.nextBytes(randomFgp);
//        String userFingerprint = Hex.encodeHexString(randomFgp);
        //TODO make https for secure attribute
//        String userFingerprint = createUserFingerprint();
//        System.out.println("Fingerprint cookie: " + userFingerprint);
//
//        MessageDigest digest = MessageDigest.getInstance("SHA-256");
//        byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
//        String userFingerprintHash = Hex.encodeHexString(userFingerprintDigest).toLowerCase();
//
//        System.out.println("Generated userFingerprintHash: " + userFingerprintHash);

        Calendar c = Calendar.getInstance();
        Date now = c.getTime();
        c.add(Calendar.HOUR, 24);
        Date expirationDate = c.getTime();

        Map<String, Object> headerClaims = new HashMap<>();
        headerClaims.put("typ", "JWT");

        Algorithm algorithm = HMAC256(SECRET_KEY);

        return JWT.create()
                .withSubject(username)
                .withExpiresAt(expirationDate)
                .withIssuer(issuerId)
                .withNotBefore(now)
                .withClaim("userFingerprint", userFingerprintHash)
                .withHeader(headerClaims)
                .sign(algorithm);
    }
    public Boolean validateToken(String authToken, HttpServletRequest request) throws GeneralSecurityException {
        String token = authToken.trim();
        logger.info("Validating token: " + token);

        String decipheredToken = tokenCipher.decipherToken(authToken);
        logger.info("Deciphered token: " + decipheredToken);

        try {
            if (this.tokenRevoker.isTokenRevoked(authToken)) {
                logger.info("Token already revoked !");
                logger.info("Token already revoked !");

                return false;
            }

            String userFingerprint = null;

            if (request.getCookies() != null && request.getCookies().length > 0) {
                List<Cookie> cookies = Arrays.stream(request.getCookies()).toList();
                Optional<Cookie> cookie = cookies.stream().filter(c -> "fingerprint".equals(c.getName())).findFirst();
                if (cookie.isPresent()) {
                    userFingerprint = cookie.get().getValue();
                    logger.info("Found userFingerprint: " + userFingerprint);
                } else {
                    logger.info("Cookie '__secure-Fgp' not found!");
                }
            } else {
                logger.info("No cookies in the request.");
            }

            logger.info("FGP ===> " + userFingerprint);

            if (userFingerprint != null && userFingerprint.matches("[a-zA-Z0-9]{1,10}")) {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
                String userFingerprintHash = DatatypeConverter.printHexBinary(userFingerprintDigest).toLowerCase();


                logger.info("Verifying userFingerprintHash: " + userFingerprintHash);

                JWTVerifier verifier = require(HMAC256(this.SECRET_KEY))
                        .withIssuer(this.ISSUER_UD)
                        .withClaim("userFingerprint", userFingerprintHash)
                        .build();

                DecodedJWT decodedToken = verifier.verify(decipheredToken);

                logger.info("Token successfully verified for subject: " + decodedToken.getSubject());

                logger.info("Token OK - Welcome '" + decodedToken.getSubject() + "' !");
                return true;
            } else {
                logger.info("Invalid userFingerprint provided or missing!");
                logger.info("Invalid userFingerprint provided or missing!");
                return false;
            }
        } catch (JWTVerificationException e) {
            logger.warn("Verification of the token failed", e);
            return false;
        } catch (Exception e) {
            logger.warn("Error during token validation", e);
            return false;
        }
    }

    public String getUsernameFromJwtToken(String token) {
        try {
            String decipheredToken = tokenCipher.decipherToken(token);

            DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(SECRET_KEY))
                    .withIssuer(ISSUER_UD)
                    .build()
                    .verify(decipheredToken);
            logger.info("getUsername Method " + decodedJWT.getSubject());
            return decodedJWT.getSubject();

        } catch (JWTVerificationException e) {
            logger.error("Invalid or expired JWT token", e);
            throw new PermissionDeniedException();

        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

}