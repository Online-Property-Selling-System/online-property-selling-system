package com.backend.properties.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.properties.dtos.ApiResponse;
import com.backend.properties.dtos.PropertiesDTO;
import com.backend.properties.dtos.PropertyCardDTO;
import com.backend.properties.dtos.PropertyDetailsDTO;
import com.backend.properties.dtos.PropertyResponseDTO;
import com.backend.properties.dtos.PropertySellerResponseDTO;
import com.backend.properties.dtos.PropertyUpdateDTO;
import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.PropertyType;
import com.backend.properties.entities.Status;
import com.backend.properties.service.PropertiesService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/properties")

@RequiredArgsConstructor
@Validated
public class PropertiesController {
	
	private final PropertiesService propertiesService;
	
	
	@GetMapping
	public ResponseEntity<?> getAllProperties()
	{
		List<PropertyResponseDTO> list = propertiesService.getAllProperties();
		if(list.isEmpty())
		{
			return ResponseEntity.status(HttpStatus.NO_CONTENT)
					.build();
		}
		return ResponseEntity.ok(list);
	}
	
	@PreAuthorize("hasRole('SELLER')")
	@PostMapping("/add")
	public ResponseEntity<Long> addProperty(@RequestBody PropertiesDTO dto) {
	    Long propertyId = propertiesService.addPropertyInfo(dto);
	    return ResponseEntity.status(HttpStatus.CREATED).body(propertyId);
	}


	
	 @PostMapping(
	            value = "/{propertyId}/images",
	            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	    )
	    public ResponseEntity<?> uploadPropertyImages(
	            @PathVariable Long propertyId,
	            @RequestParam("images") List<MultipartFile> files) {

	        propertiesService.addPropertyImages(propertyId, files);
	        return ResponseEntity.ok("Images uploaded successfully");
	    }

	 

	 @PreAuthorize("hasRole('ADMIN')")

	 @PutMapping("/{propertyId}/status")
	    public ResponseEntity<String> updatePropertyStatus(
	            @PathVariable Long propertyId,
	            @RequestParam Status status) {

	        propertiesService.updatePropertyStatus(propertyId, status);
	        return ResponseEntity.ok("Property status updated successfully");
	    }
	 
	 

	    // 🔹 Seller dashboard: fetch own properties
	    @GetMapping("/user/{userId}")
	    public ResponseEntity<List<PropertySellerResponseDTO>> getPropertiesByUser(
	            @PathVariable Long userId) {

	        return ResponseEntity.ok(
	                propertiesService.getPropertiesByUserId(userId)
	        );
	    }

	    // 🔹 Seller edits property info
	    @PutMapping("/{propertyId}")
	    public ResponseEntity<String> updateProperty(
	            @PathVariable Long propertyId,
	            @RequestParam Long userId,
	            @RequestBody PropertyUpdateDTO dto) {

	        propertiesService.updateProperty(propertyId, userId, dto);
	        return ResponseEntity.ok("Property updated successfully");
	    }


	    // 🔹 Seller updates images
	    @PutMapping(
	    	    value = "/{propertyId}/images",
	    	    consumes = MediaType.MULTIPART_FORM_DATA_VALUE
	    	)
	    	public ResponseEntity<String> updateImages(
	    	        @PathVariable Long propertyId,
	    	        @RequestParam Long userId,
	    	        @RequestParam("images") List<MultipartFile> images) {

	    	    propertiesService.updatePropertyImages(propertyId, userId, images);
	    	    return ResponseEntity.ok("Images updated successfully");
	    	}
	    
	    
	    @PreAuthorize("hasRole('SELLER')")
	    @DeleteMapping("/{propertyId}")
	    public ResponseEntity<?> deleteProperty(@PathVariable Long propertyId) {
	        return ResponseEntity.ok(propertiesService.deleteProperty(propertyId));
	    }


	    @GetMapping("/{propertyId}")
	    public ResponseEntity<PropertyDetailsDTO> getPropertyDetails(
	            @PathVariable Long propertyId) {

	        return ResponseEntity.ok(
	                propertiesService.getPropertyDetails(propertyId)
	        );
	    }


	 // 🔹 Home Page (Rent / Buy)
	    @GetMapping("/approved")
	    public ResponseEntity<List<PropertyCardDTO>> getApprovedProperties(
	            @RequestParam ListingType type) {

	        return ResponseEntity.ok(
	            propertiesService.getApprovedPropertiesByType(type)
	        );
	    }


	    @GetMapping("/approved/filter")
	    public ResponseEntity<List<PropertyCardDTO>> getFilteredProperties(
	            @RequestParam ListingType type,
	            @RequestParam(required = false) String location,
	            @RequestParam(required = false) PropertyType propertyType,
	            @RequestParam(required = false) Integer bhk,
	            @RequestParam(required = false) Double minPrice,
	            @RequestParam(required = false) Double maxPrice
	    ) {
	        return ResponseEntity.ok(
	            propertiesService.filterApprovedProperties(
	                type, location, propertyType, bhk, minPrice, maxPrice
	            )
	        );
	    }

	    



}
