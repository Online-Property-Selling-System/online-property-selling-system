package com.backend.user.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            // 🔒 Disable CSRF (JWT based)
            .csrf(csrf -> csrf.disable())

            // 🌐 Enable CORS (global config)
            .cors(cors -> {})

            // 🔐 Stateless session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 🔑 Authorization rules
            .authorizeHttpRequests(auth -> auth

            	    // PUBLIC
            	    .requestMatchers(
            	        "/api/auth/login",
            	        "/users/register",
            	        "/users/**",
            	        "/v3/api-docs/**",
            	        "/swagger-ui/**",
            	        "/swagger-ui.html"
            	    ).permitAll()
            	    .requestMatchers("/auth/**").permitAll()

            	    // ROLE BASED
            	    .requestMatchers("/admin/**").hasRole("ADMIN")
            	    .requestMatchers("/seller/**").hasRole("SELLER")
            	    .requestMatchers("/buyer/**").hasRole("BUYER")

            	    // PROPERTIES
            	 // PROPERTIES
            	    .requestMatchers(HttpMethod.POST, "/properties/**").hasRole("SELLER")
            	    .requestMatchers(HttpMethod.PUT, "/properties/**").hasAnyRole("SELLER", "ADMIN")
            	    .requestMatchers(HttpMethod.DELETE, "/properties/**").hasRole("SELLER")
            	    .requestMatchers(HttpMethod.GET, "/properties/**").permitAll()

            	    
            	    .requestMatchers(HttpMethod.GET, "/properties/**").permitAll()
            	 // USERS (ADMIN ONLY)
            	    .requestMatchers(HttpMethod.PUT, "/users/*/isActive").hasRole("ADMIN")
            	 // BOOKINGS
            	 // BOOKINGS
            	    .requestMatchers(HttpMethod.POST, "/api/bookings/**").hasRole("BUYER")
            	    .requestMatchers(HttpMethod.GET, "/api/bookings/buyer/**").hasRole("BUYER")
            	    .requestMatchers(HttpMethod.GET, "/api/bookings/seller/**").hasRole("SELLER")
            	    .requestMatchers(HttpMethod.PUT, "/api/bookings/**").hasRole("SELLER")





            	    .anyRequest().authenticated()
            	)



            // 🔐 Authentication provider
            .authenticationProvider(authenticationProvider())

            // 🔐 JWT Filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🔐 Authentication provider
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    // 🔐 Authentication manager
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
}
