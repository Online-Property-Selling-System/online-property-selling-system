package com.backend.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.user.entities.Users;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<Users, Long> {

	boolean existsByEmailOrPhoneNumber(String email, Long phoneNumber);
	
	Optional<Users> findByUserId(Long userId);

	Optional<Users> findByEmail(String email);

}
