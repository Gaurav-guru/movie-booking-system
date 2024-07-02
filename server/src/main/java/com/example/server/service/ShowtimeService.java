package com.example.server.service;

import com.example.server.model.Showtime;
import com.example.server.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepository showtimeRepository;
    public List<Showtime> getAllShowtime(){
        return showtimeRepository.findAll();
    }


}
