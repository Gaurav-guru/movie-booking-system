import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Include credentials such as cookies if needed
  headers: {
    'Content-Type': 'application/json'}
});

export default api;
