package com.backend.properties.dtos;


import java.util.List;

import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.PropertyType;
import com.backend.properties.entities.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PropertyDetailsDTO {

    private Long propertyId;
    private ListingType listType;
    private String title;
    private String address;
    private String location;
    private PropertyType propertyType;
    private String description;
    private double price;
    private Status status;

    // seller info (optional but useful)
    private Long sellerId;
    private String sellerName;

    // images as Base64
    private List<String> images;
}

