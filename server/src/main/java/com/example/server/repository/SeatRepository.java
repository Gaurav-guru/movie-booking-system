package com.example.server.repository;

import com.example.server.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByShowtimeId(Long showtimeId);
}
