package com.backend.properties.dtos;

import java.time.LocalDate;
import java.util.List;

import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.PropertyType;
import com.backend.properties.entities.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PropertyResponseDTO {

    private Long propertyId;
    private ListingType listType;
    private String title;
    private String address;
    private String location;
    private PropertyType propertyType;
    private String description;
    private double price;

    private Status status;
    private LocalDate registerDate;

    // FK as ID only
    private Long userId;

    private Integer bhk;

    // Images as Base64
    private List<String> images;
}
