import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SeatSelection() {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/showtimes/${showtimeId}/seats`)
      .then(response => {
        const allSeats = Array.from({ length: 60 }, (_, index) => ({
          id: index + 1,
          seatNumber: index + 1,
          isBooked: false
        }));
        
        response.data.forEach(seat => {
          const index = allSeats.findIndex(s => s.id === seat.id);
          if (index !== -1) {
            allSeats[index] = {...seat, seatNumber: index + 1};
          }
        });
        
        setSeats(allSeats);
      })
      .catch(error => console.error('Error fetching seats:', error));
  }, [showtimeId]);

  const handleSeatClick = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleProceedToPayment = () => {
    const totalPrice = selectedSeats.length * 10;
    navigate('/booking', {
      state: {
        showtimeId: parseInt(showtimeId),
        seatIds: selectedSeats,
        totalPrice
      }
    });
  };

  const seatRows = [
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
    [17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    [32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],
    [48,49,50,51,52,53,54,55,56,57,58,59,60]
  ];

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Select Seats
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px'
      }}>
        {seatRows.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
            {row.map((seatNumber) => {
              const seat = seats.find(s => s.seatNumber === seatNumber);
              const isSelected = selectedSeats.includes(seat?.id);
              return (
                <Button
                  key={seatNumber}
                  variant="outlined"
                  onClick={() => seat && !seat.isBooked && handleSeatClick(seat.id)}
                  sx={{
                    width: 30,
                    height: 30,
                    minWidth: 0,
                    padding: 0,
                    border: '1px solid',
                    borderColor: seat?.isBooked ? 'red' : 'green',
                    color: seat?.isBooked ? 'red' : (isSelected ? 'white' : 'green'),
                    backgroundColor: isSelected ? 'green' : 'transparent',
                    '&:hover': {
                      backgroundColor: seat && !seat.isBooked ? (isSelected ? 'darkgreen' : 'lightgreen') : 'transparent',
                    },
                  }}
                  disabled={seat?.isBooked}
                >
                  {seatNumber}
                </Button>
              );
            })}
          </Box>
        ))}
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleProceedToPayment} 
        sx={{ mt: 4 }}
      >
        Proceed to Payment
      </Button>
    </Container>
  );
}

export default SeatSelection;