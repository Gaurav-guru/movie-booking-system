package com.cinema.backend.services;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import com.razorpay.*;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

    private RazorpayClient razorpayClient;

    public RazorpayService() throws RazorpayException {
        this.razorpayClient = new RazorpayClient("rzp_test_EnAxUPqpm81SvQ", "rt9pjyjxK6xenaWZxClh8mFG");
    }

    public Order createOrder() throws RazorpayException {
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", 50000); // amount in the smallest currency unit
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "order_rcptid_11");
        return razorpayClient.orders.create(orderRequest);
    }

    public boolean verifyPayment(JSONObject response) {
        // Implement payment verification logic here
        // Refer to Razorpay documentation for details
        return true;
    }
}
