package com.example.server.controller;

import com.example.server.model.Seat;
import com.example.server.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {

    @Autowired
    private SeatService seatService;

    @GetMapping("/api/showtimes/{showtimeId}/seats")
    public List<Seat> getSeatsByShowtime(@PathVariable Long showtimeId) {
        return seatService.getSeatsByShowtime(showtimeId);
    }
}
