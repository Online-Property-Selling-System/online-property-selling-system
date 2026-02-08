package com.backend.properties.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PropertyCardDTO {

    private Long propertyId;
    private String title;
    private String location;
    private double price;

    // only one image
    private String image;
}

