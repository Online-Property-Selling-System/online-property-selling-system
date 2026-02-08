package com.backend.booking.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.booking.dtos.BookingRequestDTO;
import com.backend.booking.dtos.BookingResponseDTO;
import com.backend.booking.dtos.BookingSellerResponseDTO;
import com.backend.booking.dtos.BookingStatusUpdateDTO;
import com.backend.booking.service.BookingService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // 🔹 Buyer creates booking
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(@RequestBody BookingRequestDTO dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    // 🔹 Buyer: get own bookings
    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(bookingService.getBookingsByBuyer(buyerId));
    }

    // 🔹 Seller: get bookings for properties
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<BookingSellerResponseDTO>> getBookingsBySeller(@PathVariable Long sellerId) {
        return ResponseEntity.ok(bookingService.getBookingsBySeller(sellerId));
    }

    // 🔹 Seller: update status
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<String> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestBody BookingStatusUpdateDTO dto) {

        bookingService.updateBookingStatus(bookingId, dto);
        return ResponseEntity.ok("Booking status updated successfully");
    }
}

