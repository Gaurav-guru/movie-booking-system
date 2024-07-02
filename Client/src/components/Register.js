import React, { useState } from 'react';
import { Typography, TextField, Button, Snackbar, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { routePath } from '../routes/route';
import Login from './Login';
import CloseIcon from '@mui/icons-material/Close';
import Header from './Header';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', { name, email, password });
      if (response && response.data) {
        console.log(response.data);
        setMessage('Registration successful!');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate(routePath.login);
        }, 1000); // 5000 milliseconds = 5 seconds
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header/>
      <Typography variant="h2" gutterBottom align="center" sx={{ mt: 10 }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      {message && <Typography variant="body1">{message}</Typography>}
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        message="Registered successfully!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleAlertClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}

export default Register;
