package com.backend.user.security;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.backend.user.entities.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // 🔐 MUST be same everywhere (min 32 chars)
    private static final String SECRET_KEY =
            "my_super_secure_secret_key_which_is_32_chars_long";

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 1 day

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // ================== TOKEN GENERATION ==================

    public String generateToken(Users user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ================== TOKEN VALIDATION ==================

    public Authentication validateToken(String token) {
        try {
            String username = extractUsername(token);
            String role = extractClaim(token, claims -> claims.get("role", String.class));

            return new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    java.util.List.of(new SimpleGrantedAuthority("ROLE_" + role))
            );
        } catch (Exception e) {
            return null; // invalid token
        }
    }

    // ================== CLAIM EXTRACTION ==================

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return resolver.apply(claims);
    }
}
