package com.backend.user.dtos;

import java.time.LocalDate;

import com.backend.user.entities.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
	

    // Basic user info
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "First Name required")
    private String firstName;

    @NotBlank(message = "Last Name required")
    private String lastName;

    @NotNull
    private Long phoneNumber;

    // Security & Authorization
    @NotNull(message = "Role is required")
    private Role role; // ADMIN, SELLER, BUYER, etc.

}