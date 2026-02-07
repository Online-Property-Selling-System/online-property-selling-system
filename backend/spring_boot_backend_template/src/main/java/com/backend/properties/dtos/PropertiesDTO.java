package com.backend.properties.dtos;

import java.util.List;

import com.backend.properties.entities.ListingType;
import com.backend.properties.entities.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PropertiesDTO {
    private ListingType listType;
    private String title;
    private String address;
    private String location;
    private PropertyType propertyType;
    private String description;
    private double price;
    private Integer bhk;
}

