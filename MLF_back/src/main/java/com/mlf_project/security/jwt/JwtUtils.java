package com.mlf_project.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.mlf_project.entities.Token;
import com.mlf_project.entities.User;
import com.mlf_project.repository.TokenRepository;
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
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.function.Function;

import static com.auth0.jwt.JWT.require;
import static com.auth0.jwt.algorithms.Algorithm.HMAC256;
import static java.util.regex.Pattern.matches;


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
    private final TokenRepository tokenRepository;


    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
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

    public String generateAccessTokenFromUserDetails(HttpServletResponse response, UserDetails userDetails, String issuerId) throws NoSuchAlgorithmException {
        return generateToken(response, userDetails.getUsername(), issuerId);
    }

    public String generateAccessTokenFromUsername(String username, HttpServletResponse response, String issuerId) throws NoSuchAlgorithmException {
        return generateToken(response, username, issuerId);
    }


    private String generateToken(HttpServletResponse response, String username, String issuerId) throws NoSuchAlgorithmException {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomFgp = new byte[50];
        secureRandom.nextBytes(randomFgp);
        String userFingerprint = Hex.encodeHexString(randomFgp);

        String fingerprintCookie = "__Secure-Fgp=" + userFingerprint + "; SameSite=Strict; HttpOnly; Secure";
        response.addHeader("Set-Cookie", fingerprintCookie);

        System.out.println(fingerprintCookie);
        System.out.println(userFingerprint);

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
        String userFingerprintHash = Hex.encodeHexString(userFingerprintDigest);

        Calendar c = Calendar.getInstance();
        Date now = c.getTime();
        c.add(Calendar.MINUTE, 15);
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

    //TODO убрать дублирование
//   public String generateTokenFromUserAndSave(HttpServletResponse response, User user, String issuerId) throws NoSuchAlgorithmException{
//       SecureRandom secureRandom = new SecureRandom();
//       byte[] randomFgp = new byte[50];
//       secureRandom.nextBytes(randomFgp);
//       String userFingerprint = Hex.encodeHexString(randomFgp);
//
//       String fingerprintCookie = "__Secure-Fgp=" + userFingerprint + "; SameSite=Strict; HttpOnly; Secure";
//       response.addHeader("Set-Cookie", fingerprintCookie);
//
//       System.out.println(fingerprintCookie);
//       System.out.println(userFingerprint);
//
//       MessageDigest digest = MessageDigest.getInstance("SHA-256");
//       byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
//       String userFingerprintHash = Hex.encodeHexString(userFingerprintDigest);
//
//       Calendar c = Calendar.getInstance();
//       Date now = c.getTime();
//       c.add(Calendar.MINUTE, 15);
//       Date expirationDate = c.getTime();
//
//       Map<String, Object> headerClaims = new HashMap<>();
//       headerClaims.put("typ", "JWT");
//
//       Algorithm algorithm = HMAC256(SECRET_KEY);
//
//       String generatedToken = JWT.create()
//               .withSubject(user.getUsername())
//               .withExpiresAt(expirationDate)
//               .withIssuer(issuerId)
//               .withNotBefore(now)
//               .withClaim("userFingerprint", userFingerprintHash)
//               .withHeader(headerClaims)
//               .sign(algorithm);
//
//       saveToken(user, generatedToken, expirationDate);
//
//       return generatedToken;
//   }
    private void saveToken(User user, String token, Date expirationDate) {
        Token newToken = Token.builder()
                .token(token)
                .createdAt(LocalDateTime.now())
                .expiresAt(expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .user(user)
                .build();

        tokenRepository.save(newToken);
    }

//    public String validateToken(String token, HttpServletRequest request) throws Exception {
//        if (token != null) {
//            try {
//                logger.debug("Token received for validation: {}", token);
//                String decipheredToken = tokenCipher.decipherToken(token);
//
//                Claims claims = Jwts.parser()
//                        .setSigningKey(Base64.getEncoder().encodeToString(SECRET_KEY.getBytes()))
//                        .requireIssuer(ISSUER_UD)
//                        .parseClaimsJws(decipheredToken)
//                        .getBody();
//
//                // Extract user fingerprint from cookie (optional)
//                String userFingerprint = getUserFingerprintFromCookie(request);
//                if (userFingerprint != null) {
//                    // Validate user fingerprint pattern
//                    if (!Pattern.matches("[A-Z0-9]{100}", userFingerprint)) {
//                        throw new IllegalArgumentException("Invalid user fingerprint!");
//                    }
//
//                    // Compute SHA-256 hash of the user fingerprint and compare with the claim
//                    MessageDigest digest = MessageDigest.getInstance("SHA-256");
//                    byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
//                    String userFingerprintHash = Base64.getEncoder().encodeToString(userFingerprintDigest);
//
//                    if (!claims.get("userFingerprint", String.class).equals(userFingerprintHash)) {
//                        throw new IllegalArgumentException("User fingerprint mismatch!");
//                    }
//                }
//                return "Token OK - Welcome '" + claims.getSubject() + "'!'";
//            } catch (ExpiredJwtException | MalformedJwtException | SignatureException | UnsupportedJwtException ex) {
//                throw new IllegalArgumentException("Invalid token!", ex);
//            }
//        } else {
//            throw new IllegalArgumentException("Token is mandatory!");
//        }
//    }

    public String validateToken(String authToken, HttpServletRequest request) throws GeneralSecurityException {
        String token = authToken.trim();
        System.out.println("Validating token: " + token);

        String decipheredToken = tokenCipher.decipherToken(authToken);
        System.out.println("Deciphered token: " + decipheredToken);
        try {
            if (this.tokenRevoker.isTokenRevoked(authToken)) {
                System.out.println("Token already revoked !");
                return "Token already revoked !";
            } else {
                String userFingerprint = null;
                if (request.getCookies() != null && request.getCookies().length > 0) {
                    List<Cookie> cookies = Arrays.stream(request.getCookies()).toList();
                    Optional<Cookie> cookie = cookies.stream().filter(c -> "__Secure-Fgp".equals(c.getName())).findFirst();
                    if (cookie.isPresent()) {
                        userFingerprint = cookie.get().getValue();
                    }
                }
                System.out.println("FGP ===> " + userFingerprint);
                if (userFingerprint != null && matches("[A-Z0-9]{100}", userFingerprint)) {

//                    String token = this.tokenCipher.decipherToken(authToken);

                    MessageDigest digest = MessageDigest.getInstance("SHA-256");
                    byte[] userFingerprintDigest = digest.digest(userFingerprint.getBytes(StandardCharsets.UTF_8));
                    String userFingerprintHash = DatatypeConverter.printHexBinary(userFingerprintDigest);

                    JWTVerifier verifier = require(HMAC256(this.SECRET_KEY))
                            .withIssuer(this.ISSUER_UD)
                            .withClaim("userFingerprint", userFingerprintHash)
                            .build();

                    DecodedJWT decodedToken = verifier.verify(decipheredToken);

                    return "Token OK - Welcome '" + decodedToken.getSubject() + "' !";
                } else {
                    return "Invalid parameter provided !";
                }
            }
        } catch (JWTVerificationException e) {
            logger.warn("Verification of the token failed", e);
            return "Invalid token !";
        } catch (Exception e) {
            logger.warn("Error during token validation", e);
            return "An error occur !";
        }
    }

//    private String getUserFingerprintFromCookie(HttpServletRequest request) {
//        if (request.getCookies() != null && request.getCookies().length > 0) {
//            List<Cookie> cookies = Arrays.stream(request.getCookies()).toList();
//            Optional<Cookie> cookie = cookies.stream()
//                    .filter(c -> "__Secure-Fgp".equals(c.getName()))
//                    .findFirst();
//            return cookie.map(Cookie::getValue).orElse(null);
//        }
//        return null;
//    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();
    }
}