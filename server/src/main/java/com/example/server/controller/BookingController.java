package com.example.server.controller;

import com.example.server.model.Booking;
import com.example.server.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking createBooking(@RequestBody BookingRequest bookingRequest) {
        return bookingService.createBooking(
                bookingRequest.getUserId(),
                bookingRequest.getShowtimeId(),
                bookingRequest.getSeatIds(),
                bookingRequest.getTotalPrice(),
                bookingRequest.getPaymentStatus()
        );
    }
}
