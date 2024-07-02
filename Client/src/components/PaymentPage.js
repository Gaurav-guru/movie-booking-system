import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51PY2eoRtN0zTeMFZ2JH8sTF8oeNoBokxLk0pEopgItTb0HnEDdQYKq0fMd7HdXhQJMZxSyrhm2OlIAIXxC3jijac004UQbHUt1');

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
    } else {
      try {
        const response = await axios.post('http://localhost:8080/api/payment', {
          paymentMethodId: paymentMethod.id,
          bookingId: booking.id,
        });
        if (response.data.success) {
          navigate('/confirmation', { state: { booking: booking } });
        }
      } catch (err) {
        setError('Payment failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" disabled={!stripe} sx={{ mt: 2 }}>
        Pay ${booking.totalPrice}
      </Button>
    </form>
  );
};

function PaymentPage() {
  const { state } = useLocation();
  const { booking } = state;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </Box>
  );
}

export default PaymentPage;