package com.backend.user.dtos;

import java.time.LocalDate;

import com.backend.user.entities.IsActive;
import com.backend.user.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponseDTO {

    private Long userId;

    private String email;

    private String firstName;

    private String lastName;

    private Long phoneNumber;

    private Role role;

    private IsActive isActive;

    private LocalDate regDate;
}
