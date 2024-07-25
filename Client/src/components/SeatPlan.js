import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuyTickets from '../API/BuyTickets';
import getSeatPlan from '../API/GetSeatPlan';
import updateSeatsInHall from '../API/UpdateSeatsInHall';
import generateRandomOccupiedSeats from '../utils/GenerateRandomOccupiedSeats';
import SeatSelector from './SeatSelector';
import SeatShowcase from './SeatShowcase';

const movies = [
  {
    title: '',
    price: 10,
    occupied: generateRandomOccupiedSeats(1, 64, 64),
  },
];

function SeatPlan({ movie }) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [recommendedSeat, setRecommendedSeat] = useState(null);
  const navigate = useNavigate();
  const [movieSession, setMovieSession] = useState(null);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');

  const [seatPlan, setSeatPlan] = useState(null);

  useEffect(() => {
    const storedMovieSession = JSON.parse(localStorage.getItem('movieSession'));
    if (storedMovieSession) {
      setMovieSession(storedMovieSession);
    }
  }, []);

  useEffect(() => {
    const fetchSeatPlan = async () => {
      try {
        if (movieSession && movieSession.time) {
          const data = await getSeatPlan(movie.id, movieSession);
          setSeatPlan(data);
        }
      } catch (error) {
        console.error('Error fetching seat plan:', error);
      }
    };

    if (movieSession) {
      fetchSeatPlan();
    }
  }, [movie.id, movieSession]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUserName(storedUser.userName);
      setUserId(storedUser.userId);
    }
  }, []);

  const occupiedSeats =
    seatPlan && seatPlan.length > 0 ? seatPlan : movies[0].occupied;

  const availableSeats = [27, 28, 29, 30, 35, 36, 37, 38, 43, 44, 45, 46];

  const filteredAvailableSeats = availableSeats.filter(
    (seat) => !occupiedSeats.includes(seat),
  );

  useEffect(() => {
    let recommended = null;
    for (let i = 0; i < filteredAvailableSeats.length; i++) {
      const seat = filteredAvailableSeats[i];
      if (!occupiedSeats.includes(seat)) {
        recommended = seat;
        break;
      }
    }
    setRecommendedSeat(recommended);
  }, [filteredAvailableSeats, occupiedSeats]);

  let selectedSeatText = '';
  if (selectedSeats.length > 0) {
    selectedSeatText = selectedSeats.map((seat) => seat + 1).join(', ');
  }

  let totalPrice = selectedSeats.length * movies[0].price;

  const isAnySeatSelected = selectedSeats.length > 0;

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const isAnySeatSelected = selectedSeats.length > 0;

    if (isAnySeatSelected) {
      const orderSeats = selectedSeats;
      const updatedOccupiedSeats = [...orderSeats, ...occupiedSeats];

      const order = {
        customerId: userId || Math.floor(Math.random() * 1000000),
        userName: userName || '',
        orderDate: new Date().toISOString(),
        seats: [...orderSeats, ...occupiedSeats],
        seat: orderSeats,
        movie: {
          id: movie.id,
          title: movie.title,
          genres: movie.genres.map((genre) => genre.name).join(', '),
          runtime: movie.runtime,
          language: movie.original_language,
          price: movies[0].price,
        },
      };

      const myOrder = {
        customerId: order.customerId,
        orderDate: order.orderDate,
        movieId: order.movie.id,
        movieTitle: order.movie.title,
        movieGenres: order.movie.genres,
        movieRuntime: order.movie.runtime,
        movieLanguage: order.movie.language,
        moviePrice: order.movie.price,
        seat: order.seat,
        userName: order.userName,
      };

      const hallUpdate = {
        movieId: movie.id,
        movieSession: movieSession.time,
        orderTime: order.orderDate,
        updatedSeats: updatedOccupiedSeats,
      };

      try {
        setSuccessPopupVisible(true); // Show the success popup immediately

        // Wait for both API calls to finish
        const [updateSuccess, buyTickets] = await Promise.all([
          updateSeatsInHall(BASE_URL, hallUpdate),
          BuyTickets(BASE_URL, myOrder),
        ]);

        if (updateSuccess && buyTickets) {
          setTimeout(() => {
            setSuccessPopupVisible(false);
            navigate('/');
          }, 2000); // Wait for 2 seconds before redirecting
        } else {
          setSuccessPopupVisible(false); // Hide the success popup if any API call fails
          console.error('Failed to process the order');
        }
      } catch (error) {
        setSuccessPopupVisible(false); // Hide the success popup on error
        console.error('Error processing the order:', error);
      }
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full px-6 md:w-1/2 lg:w-2/3'>
        <h2 className='mb-8 text-2xl font-semibold text-center'>
          Choose your seats by clicking on the available seats
        </h2>
      </div>

      <div className='CinemaPlan'>
        <SeatSelector
          movie={{ ...movies[0], occupied: occupiedSeats }}
          selectedSeats={selectedSeats}
          recommendedSeat={recommendedSeat}
          onSelectedSeatsChange={(selectedSeats) =>
            setSelectedSeats(selectedSeats)
          }
          onRecommendedSeatChange={(recommendedSeat) =>
            setRecommendedSeat(recommendedSeat)
          }
        />
        <SeatShowcase />

        <p className='mb-2 text-sm info md:text-sm lg:text-base'>
          You have selected{' '}
          <span className='font-semibold count'>{selectedSeats.length}</span>{' '}
          seat{selectedSeats.length !== 1 ? 's' : ''}
          {selectedSeats.length === 0 ? '' : ':'}{' '}
          {selectedSeatText ? (
            <span className='font-semibold selected-seats'>
              {' '}
              {selectedSeatText}
            </span>
          ) : (
            <span></span>
          )}{' '}
          {selectedSeats.length > 0 && (
            <>
              for the price of{' '}
              <span className='font-semibold total'>{totalPrice}€</span>
            </>
          )}
        </p>

        {isAnySeatSelected ? (
          <div>
            <button
              className='px-3 py-2 text-sm font-semibold text-white bg-green-500 rounded cursor-pointer hover:bg-green-700'
              onClick={handleButtonClick}
            >
              Buy at <span className='font-semibold total'>{totalPrice}€</span>
            </button>
          </div>
        ) : (
          <div>
            <p className='text-sm info md:text-sm lg:text-base'>
              Please select a seat
            </p>
          </div>
        )}

        {successPopupVisible && (
          <div className='absolute flex justify-center px-4 py-2 mb-8 mr-8 text-sm text-white bg-green-500 rounded md:text-sm lg:text-base bottom-1/2'>
            Order Successful
          </div>
        )}
      </div>
    </div>
  );
}

export default SeatPlan;
