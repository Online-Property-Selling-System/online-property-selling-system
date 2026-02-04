package com.backend.booking.entities;



import java.time.LocalDateTime;

import com.backend.properties.entities.Properties;
import com.backend.user.entities.Users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Properties property;

    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private Users buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private Users seller;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;
 // PENDING, APPROVED, REJECTED

    private LocalDateTime createdAt;
}

