package com.example.server.controller;

import com.example.server.model.Showtime;
import com.example.server.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/showtime")
@CrossOrigin(origins = "http://localhost:3000")
public class ShowtimeController {
    @Autowired
    private ShowtimeService showtimeService;

    @GetMapping
    public List<Showtime> getAllShowtime()
    {
        return showtimeService.getAllShowtime();
    }
}
