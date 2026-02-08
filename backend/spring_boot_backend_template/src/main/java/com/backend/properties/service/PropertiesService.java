package com.backend.properties.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;  // ✅ ADD THIS

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



public interface PropertiesService {

    // Method for adding property with multiple images
   

    // Method for getting all properties
    List<PropertyResponseDTO> getAllProperties();

	void addPropertyImages(Long propertyId, List<MultipartFile> files);

	Long addPropertyInfo(PropertiesDTO dto);

	void updatePropertyStatus(Long propertyId, Status status);

	List<PropertySellerResponseDTO> getPropertiesByUserId(Long userId);

	void updateProperty(Long propertyId, Long userId, PropertyUpdateDTO dto);

	void updatePropertyImages(Long propertyId, Long userId, List<MultipartFile> images);

	ApiResponse deleteProperty(Long propertyId);
	
	PropertyDetailsDTO getPropertyDetails(Long propertyId);
	
	List<PropertyCardDTO> getApprovedPropertiesByType(ListingType type);

	List<PropertyCardDTO> filterApprovedProperties(ListingType type, String location, PropertyType propertyType, Integer bhk,
			Double minPrice, Double maxPrice);

	

}
