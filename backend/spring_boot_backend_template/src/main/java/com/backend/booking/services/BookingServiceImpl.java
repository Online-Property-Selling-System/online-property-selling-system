package com.backend.booking.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.booking.dtos.BookingRequestDTO;
import com.backend.booking.dtos.BookingResponseDTO;
import com.backend.booking.dtos.BookingSellerResponseDTO;
import com.backend.booking.dtos.BookingStatusUpdateDTO;
import com.backend.booking.entities.Booking;
import com.backend.booking.entities.BookingStatus;
import com.backend.booking.repository.BookingRepository;
import com.backend.properties.entities.Properties;
import com.backend.properties.repository.PropertiesRepository;
import com.backend.user.entities.Users;
import com.backend.user.repository.UserRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final PropertiesRepository propertiesRepository;
    private final UserRepository userRepository;

//    // 🔹 Buyer: create booking
//    public BookingResponseDTO createBooking(BookingRequestDTO dto) {
//
//        Properties property = propertiesRepository.findById(dto.getPropertyId())
//                .orElseThrow(() -> new RuntimeException("Property not found"));
//
//        Users buyer = userRepository.findById(dto.getBuyerId())
//                .orElseThrow(() -> new RuntimeException("Buyer not found"));
//
//        // ✅ Seller comes from property owner
//        Users seller = property.getUserDetails();
//
//        Booking booking = new Booking();
//        booking.setProperty(property);
//        booking.setBuyer(buyer);
//        booking.setSeller(seller);   // ⭐ FIX
//        booking.setStatus(BookingStatus.PENDING);
//        booking.setCreatedAt(LocalDateTime.now());
//
//        bookingRepository.save(booking);
//
//        return mapToBuyerDTO(booking);
//    }

    
    public BookingResponseDTO createBooking(BookingRequestDTO dto) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        Users buyer = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Properties property = propertiesRepository.findById(dto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Users seller = property.getUserDetails();

        Booking booking = new Booking();
        booking.setProperty(property);
        booking.setBuyer(buyer);
        booking.setSeller(seller);
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());

        bookingRepository.save(booking);

        return mapToBuyerDTO(booking);
    }


    // 🔹 Buyer: fetch own bookings
    public List<BookingResponseDTO> getBookingsByBuyer(Long buyerId) {
        return bookingRepository.findByBuyer_UserId(buyerId)
                .stream()
                .map(this::mapToBuyerDTO)
                .toList();
    }

    // 🔹 Seller: fetch bookings for their properties
    public List<BookingSellerResponseDTO> getBookingsBySeller(Long sellerId) {
        return bookingRepository.findByProperty_UserDetails_UserId(sellerId)
                .stream()
                .map(this::mapToSellerDTO)
                .toList();
    }

    // 🔹 Seller: update booking status
    public void updateBookingStatus(Long bookingId, BookingStatusUpdateDTO dto) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(dto.getStatus());
        bookingRepository.save(booking);
    }

    private BookingResponseDTO mapToBuyerDTO(Booking booking) {

        BookingResponseDTO dto = new BookingResponseDTO();

        dto.setBookingId(booking.getBookingId());

        // ✅ Property info
        dto.setPropertyId(booking.getProperty().getPropertyId());
        dto.setPropertyTitle(booking.getProperty().getTitle());
        dto.setPropertyLocation(booking.getProperty().getLocation());

        // ✅ SAFE image handling (Base64)
        if (booking.getProperty().getImages() != null
                && !booking.getProperty().getImages().isEmpty()
                && booking.getProperty().getImages().get(0) != null) {

            dto.setPropertyImage(
                Base64.getEncoder()
                      .encodeToString(booking.getProperty().getImages().get(0))
            );
        } else {
            dto.setPropertyImage(null);
        }

        // ✅ Booking status
        dto.setStatus(booking.getStatus());

        // ✅ Seller name (safe)
        dto.setSellerName(
            booking.getProperty().getUserDetails().getFirstName() + " " +
            booking.getProperty().getUserDetails().getLastName()
        );

        // ✅ Created date
        dto.setCreatedAt(booking.getCreatedAt());

        return dto;
    }


    private BookingSellerResponseDTO mapToSellerDTO(Booking booking) {
        BookingSellerResponseDTO dto = new BookingSellerResponseDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setPropertyId(booking.getProperty().getPropertyId());
        dto.setPropertyTitle(booking.getProperty().getTitle());
        dto.setPropertyLocation(booking.getProperty().getLocation());
        dto.setPropertyImage(
            booking.getProperty().getImages() != null && !booking.getProperty().getImages().isEmpty() ?
            Base64.getEncoder().encodeToString(booking.getProperty().getImages().get(0)) : null
        );
        dto.setStatus(booking.getStatus());
        dto.setBuyerName(booking.getBuyer().getFirstName() + " " + booking.getBuyer().getLastName());
        dto.setBuyerEmail(booking.getBuyer().getEmail());
        dto.setBuyerPhone(booking.getBuyer().getPhoneNumber());
        dto.setCreatedAt(booking.getCreatedAt());
        return dto;
    }
    
    
    
}

