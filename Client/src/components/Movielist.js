import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleBookNow = (showtimeId) => {
    navigate(`/seats/${showtimeId}`);
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom align="center" sx={{ mt: 4 }}>
        Available Movies
      </Typography>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {movies.map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {movie.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Genre: {movie.genre}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Showtimes
                  </Typography>
                  <ul>
                    {movie.showtimes.map(showtime => (
                      <li key={showtime.id}>
                        {new Date(showtime.dateTime).toLocaleString()} - {showtime.screen}
                        <Button size="small" variant="contained" color="primary" onClick={() => handleBookNow(showtime.id)}>
                          Book Now
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default MovieList;
