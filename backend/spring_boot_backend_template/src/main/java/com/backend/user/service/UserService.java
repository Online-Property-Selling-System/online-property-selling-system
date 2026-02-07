package com.backend.user.service;

import java.util.List;

import com.backend.user.dtos.UserDTO;
import com.backend.user.dtos.UserResponseDTO;
import com.backend.user.entities.IsActive;
import com.backend.user.entities.Users;

public interface UserService {

	String addUser(UserDTO userdto);

	List<UserResponseDTO> getAllUsers();

	void updateUserStatus(Long userId, IsActive isActive);

}
