package com.backend.properties.service;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.backend.properties.dtos.ApiResponse;
import com.backend.properties.dtos.PropertiesDTO;
import com.backend.properties.dtos.PropertyCardDTO;
import com.backend.properties.dtos.PropertyDetailsDTO;
import com.backend.properties.dtos.PropertyResponseDTO;
import com.backend.properties.dtos.PropertySellerResponseDTO;
import com.backend.properties.dtos.PropertyUpdateDTO;
import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.Properties;
import com.backend.properties.entities.PropertyType;
import com.backend.properties.entities.Status;
import com.backend.properties.repository.PropertiesRepository;
import com.backend.user.entities.Users;
import com.backend.user.repository.UserRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class PropertiesServiceImpl implements PropertiesService{

	private final PropertiesRepository propertiesRepository;
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	
	

	@Override
	public List<PropertyResponseDTO> getAllProperties() {

	    return propertiesRepository.findAll()
	            .stream()
	            .map(property -> {

	                PropertyResponseDTO dto =
	                        modelMapper.map(property, PropertyResponseDTO.class);

	                // ✅ SAFE image mapping
	                if (property.getImages() != null && !property.getImages().isEmpty()) {
	                    List<String> base64Images = property.getImages()
	                            .stream()
	                            .map(img -> Base64.getEncoder().encodeToString(img))
	                            .toList();
	                    dto.setImages(base64Images);
	                } else {
	                    dto.setImages(List.of()); // empty list instead of null
	                }

	                dto.setUserId(property.getUserDetails().getUserId());

	                return dto;
	            })
	            .toList();
	}




	// Save property info only
	@Override
	public Long addPropertyInfo(PropertiesDTO dto) {

	    if (dto.getPropertyType() == PropertyType.COMMERCIAL) {
	        dto.setBhk(null);
	    }

	    // 🔐 Get logged-in user email from JWT
	    String email = SecurityContextHolder
	            .getContext()
	            .getAuthentication()
	            .getName();

	    // 🔍 Find seller from DB
	    Users user = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    // 🏠 Map & save property
	    Properties property = modelMapper.map(dto, Properties.class);
	    property.setUserDetails(user);

	    propertiesRepository.save(property);
	    return property.getPropertyId();
	}


	@Override
	public void addPropertyImages(Long propertyId, List<MultipartFile> files) {

	    Properties property = propertiesRepository.findById(propertyId)
	            .orElseThrow(() -> new RuntimeException("Property not found"));

	    List<byte[]> images = property.getImages() != null
	            ? new ArrayList<>(property.getImages())
	            : new ArrayList<>();

	    for (MultipartFile file : files) {
	        try {
	            images.add(file.getBytes());
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to read file", e);
	        }
	    }

	    property.setImages(images);
	    propertiesRepository.save(property);
	}





	@Override
	public void updatePropertyStatus(Long propertyId, Status status) {
		// TODO Auto-generated method stub
		 Properties property = propertiesRepository.findById(propertyId)
		            .orElseThrow(() -> new RuntimeException("Property not found"));
		    property.setStatus(status);
		    propertiesRepository.save(property);
	}




	@Override
	public List<PropertySellerResponseDTO> getPropertiesByUserId(Long userId) {

	    // ✅ USE FETCH JOIN METHOD (ONLY CHANGE)
	    List<Properties> properties =
	            propertiesRepository.findByUserIdWithImages(userId);

	    return properties.stream()
	            .map(property -> {
	                PropertySellerResponseDTO dto =
	                        modelMapper.map(property, PropertySellerResponseDTO.class);

	                // ✅ SAFE image conversion
	                if (property.getImages() != null && !property.getImages().isEmpty()) {
	                    List<String> base64Images = property.getImages()
	                            .stream()
	                            .map(img -> Base64.getEncoder().encodeToString(img))
	                            .toList();
	                    dto.setImages(base64Images);
	                } else {
	                    dto.setImages(List.of());
	                }

	                return dto;
	            })
	            .toList();
	}








	@Override
	public void updateProperty(Long propertyId, Long userId, PropertyUpdateDTO dto) {

	    Properties property = propertiesRepository.findById(propertyId)
	            .orElseThrow(() -> new RuntimeException("Property not found"));

	    // ✅ Ownership check
	    if (!property.getUserDetails().getUserId().equals(userId)) {
	        throw new RuntimeException("Unauthorized to edit this property");
	    }

	    if (dto.getPropertyType() == PropertyType.COMMERCIAL) {
	        dto.setBhk(null);
	    }
	    property.setListType(dto.getListType());
	    property.setTitle(dto.getTitle());
	    property.setAddress(dto.getAddress());
	    property.setLocation(dto.getLocation());
	    property.setPropertyType(dto.getPropertyType());
	    property.setDescription(dto.getDescription());
	    property.setPrice(dto.getPrice());

	    propertiesRepository.save(property);
	}





	@Transactional
	public void updatePropertyImages(
	        Long propertyId,
	        Long userId,
	        List<MultipartFile> images) {

	    Properties property = propertiesRepository.findById(propertyId)
	            .orElseThrow(() -> new RuntimeException("Property not found"));

	    // 🔐 Seller ownership check
	    if (!property.getUserDetails().getUserId().equals(userId)) {
	        throw new RuntimeException("You are not allowed to update this property");
	    }

	    if (property.getImages() == null) {
	        property.setImages(new ArrayList<>());
	    } else {
	        property.getImages().clear(); // replace old images
	    }

	    try {
	        for (MultipartFile file : images) {
	            property.getImages().add(file.getBytes());
	        }
	    } catch (IOException e) {
	        throw new RuntimeException("Failed to read image", e);
	    }

	    propertiesRepository.save(property);
	}




	@Override
	public ApiResponse deleteProperty(Long propertyId) {
		if(propertiesRepository.existsById(propertyId))
		{
			propertiesRepository.deleteById(propertyId);
			return new ApiResponse("Success","Property Deleted Successfully!");
		}
		return new ApiResponse("Failed","Property Not Found");
	}




	@Override
	public PropertyDetailsDTO getPropertyDetails(Long propertyId) {
		 Properties property = propertiesRepository.findById(propertyId)
		            .orElseThrow(() -> new RuntimeException("Property not found"));

		    PropertyDetailsDTO dto = new PropertyDetailsDTO();

		    dto.setPropertyId(property.getPropertyId());
		    dto.setListType(property.getListType());
		    dto.setTitle(property.getTitle());
		    dto.setAddress(property.getAddress());
		    dto.setLocation(property.getLocation());
		    dto.setPropertyType(property.getPropertyType());
		    dto.setDescription(property.getDescription());
		    dto.setPrice(property.getPrice());
		    dto.setStatus(property.getStatus());

		    // seller info
		    dto.setSellerId(property.getUserDetails().getUserId());
		    dto.setSellerName(
		            property.getUserDetails().getFirstName() + " " +
		            property.getUserDetails().getLastName()
		    );

		    // ✅ images → Base64
		    if (property.getImages() != null) {
		        List<String> base64Images = property.getImages()
		                .stream()
		                .map(img -> Base64.getEncoder().encodeToString(img))
		                .toList();
		        dto.setImages(base64Images);
		    }

		    return dto;
	}




	@Override
	public List<PropertyCardDTO> getApprovedPropertiesByType(ListingType type) {

	    return propertiesRepository
	            .findByStatusAndListType(Status.APPROVED, type)
	            .stream()
	            .map(property -> {
	                PropertyCardDTO dto = new PropertyCardDTO();
	                dto.setPropertyId(property.getPropertyId());
	                dto.setTitle(property.getTitle());
	                dto.setLocation(property.getLocation());
	                dto.setPrice(property.getPrice());

	                if (property.getImages() != null && !property.getImages().isEmpty()) {
	                    dto.setImage(
	                        Base64.getEncoder()
	                              .encodeToString(property.getImages().get(0))
	                    );
	                }

	                return dto;
	            })
	            .toList();
	}




	@Override
	public List<PropertyCardDTO> filterApprovedProperties(ListingType type, String location, PropertyType propertyType,
			Integer bhk, Double minPrice, Double maxPrice) {
		 List<Properties> properties =
		            propertiesRepository.findByStatusAndListType(Status.APPROVED, type);

		    return properties.stream()
		        .filter(p -> location == null || p.getLocation().equalsIgnoreCase(location))
		        .filter(p -> propertyType == null || p.getPropertyType() == propertyType)
		        .filter(p -> bhk == null || (p.getBhk() != null && p.getBhk().equals(bhk)))
		        .filter(p -> minPrice == null || p.getPrice() >= minPrice)
		        .filter(p -> maxPrice == null || p.getPrice() <= maxPrice)
		        .map(this::mapToCardDTO)
		        .toList();
	}

    //works as model mapper
	private PropertyCardDTO mapToCardDTO(Properties p) {
	    PropertyCardDTO dto = modelMapper.map(p, PropertyCardDTO.class);

	    if (p.getImages() != null && !p.getImages().isEmpty()) {
	        dto.setImage(
	            Base64.getEncoder().encodeToString(p.getImages().get(0))
	        );
	    }

	    return dto;
	}





	





}
