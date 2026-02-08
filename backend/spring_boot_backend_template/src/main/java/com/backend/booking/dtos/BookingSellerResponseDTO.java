package com.backend.booking.dtos;

import java.time.LocalDateTime;

import com.backend.booking.entities.BookingStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingSellerResponseDTO {

    private Long bookingId;

    private Long propertyId;
    private String propertyTitle;
    private String propertyLocation;

    // Base64 image
    private String propertyImage;

    private BookingStatus status;

    private String buyerName;
    private String buyerEmail;
    private Long buyerPhone;

    private LocalDateTime createdAt;
}

