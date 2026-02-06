package com.backend.user.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.user.dtos.UserDTO;
import com.backend.user.dtos.UserResponseDTO;
import com.backend.user.entities.IsActive;
import com.backend.user.entities.Users;
import com.backend.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")

@RequiredArgsConstructor
@Validated
public class UserController {

	private final UserService userservice;
	
	
	
	@GetMapping
	public /* @ResponseBody */  ResponseEntity<?> renderUserList() {
		System.out.println("in render user list");
		List<UserResponseDTO> list = userservice.getAllUsers();
		if(list.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build(); //only status code : 204
		//=> non empty body
		return ResponseEntity.ok(list); //SC 200 + List -> Json[]
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> addUser(@RequestBody UserDTO userdto)
	{
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(userservice.addUser(userdto));
		}catch(RuntimeException e)
		{
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(e.getMessage());
		}
	}
	
	@PutMapping("/{userId}/isActive")
	public ResponseEntity<String> updateUserStatus(@PathVariable Long userId,@RequestParam IsActive isActive)
	{
		userservice.updateUserStatus(userId,isActive);
		
		return ResponseEntity.ok("User status updated successfully");
	}
	
}
