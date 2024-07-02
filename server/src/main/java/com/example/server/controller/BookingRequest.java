package com.example.server.controller;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookingRequest {
    private Long userId;
    private Long showtimeId;
    private List<Long> seatIds;
    private double totalPrice;
    private String paymentStatus;

    // Getters and setters
}
