package com.example.server.service;

import com.example.server.model.Seat;
import com.example.server.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatLockingService {

    @Autowired
    private SeatRepository seatRepository;

    public boolean lockSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if (!seat.isBooked() && !seat.isLocked()) {
            seat.setLocked(true);
            seatRepository.save(seat);
            return true; // Seat successfully locked
        } else {
            return false; // Seat is already booked or locked
        }
    }

    public void releaseSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        seat.setLocked(false);
        seatRepository.save(seat);
    }
}
