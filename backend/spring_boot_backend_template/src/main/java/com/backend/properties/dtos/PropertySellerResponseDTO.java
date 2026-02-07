package com.backend.properties.dtos;

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
public class PropertySellerResponseDTO {

    private Long propertyId;
    private ListingType listType;
    private String title;
    private String address;
    private String location;
    private PropertyType propertyType;
    private String description;
    private double price;

    private Integer bhk;

    private Status status;       // seller can still see approval state
    private List<String> images;
}
