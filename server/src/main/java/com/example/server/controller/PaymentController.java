package com.example.server.controller;

import com.example.server.model.Booking;
import com.example.server.service.BookingService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Autowired
    private BookingService bookingService;

    @PostMapping("/api/payment")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        Stripe.apiKey = stripeSecretKey;

        try {
            Booking booking = bookingService.getBookingById(paymentRequest.getBookingId());

            Map<String, Object> params = new HashMap<>();
            params.put("amount", (int) (booking.getTotalPrice() * 100)); // amount in cents
            params.put("currency", "usd");
            params.put("payment_method", paymentRequest.getPaymentMethodId());
            params.put("confirm", true);

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            if ("succeeded".equals(paymentIntent.getStatus())) {
                booking.setPaymentStatus("PAID");
                bookingService.updateBooking(booking);
                return ResponseEntity.ok(Map.of("success", true));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Payment failed"));
            }
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}

class PaymentRequest {
    private String paymentMethodId;
    private Long bookingId;

    // Getters and setters
    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
}