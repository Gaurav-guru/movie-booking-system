import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SeatSelection from './components/SeatSelection';
import Register from './components/Register';
import Login from './components/Login';
import { routePath } from './routes/route';
import Home from './components/Home';
import BookingPage from './components/Bookingpage';
import PaymentPage from './components/PaymentPage';

function App() {
    return (
        <>
        <Router>
            <div>
                <nav>{/* Navigation links */}</nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/seats/:showtimeId" element={<SeatSelection />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path={routePath.register} element={<Register />} />
                    <Route path={routePath.login} element={<Login />} />
                    <Route path={"/payment"} element={<PaymentPage />} />
                </Routes>
            </div>
        </Router>
        </>
    );
}

export default App;