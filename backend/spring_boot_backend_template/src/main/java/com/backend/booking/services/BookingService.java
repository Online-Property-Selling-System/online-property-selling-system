package com.backend.booking.service;

import java.util.List;

import com.backend.booking.dtos.BookingRequestDTO;
import com.backend.booking.dtos.BookingResponseDTO;
import com.backend.booking.dtos.BookingSellerResponseDTO;
import com.backend.booking.dtos.BookingStatusUpdateDTO;


public interface BookingService {

	BookingResponseDTO createBooking(BookingRequestDTO dto);
	
	List<BookingResponseDTO> getBookingsByBuyer(Long buyerId);
	
	List<BookingSellerResponseDTO> getBookingsBySeller(Long sellerId);
	
	void updateBookingStatus(Long bookingId, BookingStatusUpdateDTO dto);
}
