package com.backend.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.booking.entities.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByBuyer_UserId(Long buyerId);
    List<Booking> findByProperty_UserDetails_UserId(Long sellerId);
}

