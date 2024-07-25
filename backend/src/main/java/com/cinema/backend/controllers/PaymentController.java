package com.cinema.backend.controllers;

import com.cinema.backend.services.RazorpayService;
import com.razorpay.Order;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/createOrder")
    public Order createOrder() throws Exception {
        return razorpayService.createOrder();
    }

    @PostMapping("/verifyPayment")
    public boolean verifyPayment(@RequestBody String payload) throws Exception {
        JSONObject response = new JSONObject(payload);
        return razorpayService.verifyPayment(response);
    }
}

