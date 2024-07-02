package com.example.server.service;

import com.example.server.model.Seat;
import com.example.server.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public List<Seat> getSeatsByShowtime(Long showtimeId) {
        return seatRepository.findByShowtimeId(showtimeId);
    }
}
