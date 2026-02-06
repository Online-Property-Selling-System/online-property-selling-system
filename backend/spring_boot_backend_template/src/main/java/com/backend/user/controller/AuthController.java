package com.backend.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.backend.user.dtos.LoginRequest;
import com.backend.user.dtos.LoginResponse;
import com.backend.user.entities.Users;
import com.backend.user.repository.UserRepository;
import com.backend.user.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user);

        return ResponseEntity.ok(
        	    new LoginResponse(
        	        token,
        	        user.getEmail(),
        	        user.getRole().name(),
        	        user.getUserId()     // ✅ SEND USER ID
        	    )
        	);

    }
}
