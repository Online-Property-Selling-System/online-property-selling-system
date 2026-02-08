package com.backend.user.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.user.custom_exceptions.InvalidInputException;
import com.backend.user.dtos.UserDTO;
import com.backend.user.dtos.UserResponseDTO;
import com.backend.user.entities.IsActive;
import com.backend.user.entities.Users;
import com.backend.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;
    @Override
    public String addUser(UserDTO userDto) {

        // 1️⃣ Check duplicate email or phone
        if (userRepository.existsByEmailOrPhoneNumber(
                userDto.getEmail(), userDto.getPhoneNumber())) {

            throw new InvalidInputException("Duplicate email or phone number");
        }

        // 2️⃣ DTO → Entity
        Users user = modelMapper.map(userDto, Users.class);

     // Encrypt password (custom override)
	    user.setPassword(passwordEncoder.encode(userDto.getPassword()));
	 // Set other fields not present in DTO
	    user.setIsActive(IsActive.PENDING);
        // 3️⃣ Save user (ID + regDate auto handled)
        Users persistentUser = userRepository.save(user);

        // 4️⃣ Return response
        return "New User added with ID = " + persistentUser.getUserId();
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .toList();
    }

	@Override
	public void updateUserStatus(Long userId, IsActive isActive) {
		// TODO Auto-generated method stub
		Users users=userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("Property not found"));
		users.setIsActive(isActive);
		userRepository.save(users);
	}

}
