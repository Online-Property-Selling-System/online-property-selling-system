package com.backend.booking.dtos;

import com.backend.booking.entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingStatusUpdateDTO {
	private BookingStatus status;
}
