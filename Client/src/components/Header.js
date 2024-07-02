import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../routes/route';

const Header = () => {
    const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ bgcolor: 'black' }} elevation={0}>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ ml: 10, color: 'white' }}>
          Movie Booking System
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={() => navigate(routePath.login)} color="inherit" sx={{ color: 'white' }}>Log in</Button>
        <Button onClick={() => navigate(routePath.register)} color="inherit" sx={{ color: 'white' }}>Register</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
