package com.backend.properties.dtos;

import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyUpdateDTO {

    private ListingType listType;
    private String title;
    private String address;
    private String location;
    private PropertyType propertyType;
    private String description;
    private Integer bhk;
    private double price;
}

