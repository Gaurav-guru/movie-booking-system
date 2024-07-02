package com.example.server.service;

import com.example.server.model.Booking;
import com.example.server.model.Seat;
import com.example.server.model.Showtime;
import com.example.server.model.User;
import com.example.server.repository.BookingRepository;
import com.example.server.repository.SeatRepository;
import com.example.server.repository.ShowtimeRepository;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private UserRepository userRepository;

    public Booking createBooking(Long userId, Long showtimeId, List<Long> seatIds, double totalPrice, String paymentStatus) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Showtime> showtimeOptional = showtimeRepository.findById(showtimeId);

        if (userOptional.isPresent() && showtimeOptional.isPresent()) {
            Booking booking = new Booking();
            booking.setUser(userOptional.get()); // Associate with the user
            booking.setShowtime(showtimeOptional.get());

            List<Seat> seats = seatRepository.findAllById(seatIds);
            seats.forEach(seat -> {
                seat.setBooked(true);
                seatRepository.save(seat); // Mark seats as booked
            });

            booking.setSeats(seats);
            booking.setTotalPrice(totalPrice);
            booking.setPaymentStatus(paymentStatus);

            return bookingRepository.save(booking);
        } else {
            throw new RuntimeException("User or Showtime not found");
        }


}

    // Add these new methods
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
}