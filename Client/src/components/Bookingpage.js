import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


function BookingPage() {
  const { state } = useLocation();
  const { showtimeId, seatIds, totalPrice } = state;
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    const bookingRequest = {
      userId: 1, // Assuming a logged-in user with ID 1, adjust as needed
      showtimeId: showtimeId,
      seatIds: seatIds,
      totalPrice: totalPrice,
    };

    axios.post('http://localhost:8080/api/bookings', bookingRequest)
      .then(response => {
        console.log('Booking successful:', response.data);
        navigate('/payment', { state: { booking: response.data } });
      })
      .catch(error => console.error('Error making booking:', error));
  };
  

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Summary
      </Typography>
      <Typography variant="body1">
        Showtime ID: {showtimeId}
      </Typography>
      <Typography variant="body1">
        Seats: {seatIds.join(', ')}
      </Typography>
      <Typography variant="body1">
        Total Price: ${totalPrice}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleConfirmBooking} sx={{ mt: 4 }}>
        Confirm Booking
      </Button>
    </Box>
  );
}

export default BookingPage;
