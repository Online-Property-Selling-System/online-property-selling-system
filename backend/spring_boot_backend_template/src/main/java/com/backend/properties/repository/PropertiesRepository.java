package com.backend.properties.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.Properties;
import com.backend.properties.entities.Status;

public interface PropertiesRepository extends JpaRepository<Properties, Long> {

	List<Properties> findByUserDetails_UserId(Long userId);
	
	List<Properties> findByStatusAndListType(Status status, ListingType listType);

	@Query("""
		    SELECT p 
		    FROM Properties p 
		    LEFT JOIN FETCH p.images 
		    WHERE p.userDetails.userId = :userId
		""")
		List<Properties> findByUserIdWithImages(Long userId);




}
