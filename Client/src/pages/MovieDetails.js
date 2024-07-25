import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FetchMovieDetails from '../API/GetMovieDetails';
import SeatPlan from '../components/SeatPlan';
import FormatDate from '../utils/FormatDate';
import FormatRuntime from '../utils/FormatRuntime';
import RemoveUnwantedGenres from '../utils/RemoveNonCinemaGenres'; // Import the function

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY ='31b58c686943248bf6d986be03dc5152';

  useEffect(() => {
    const fetchData = async () => {
      const movieData = await FetchMovieDetails(id, API_KEY);
      if (movieData && movieData.genres) {
        movieData.genres = RemoveUnwantedGenres(movieData.genres); // Filter unwanted genres
      }
      setMovie(movieData);
    };

    fetchData();
  }, [id, API_KEY]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='container px-4 py-8 mx-auto'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex flex-wrap items-start justify-center'>
            <div className='flex justify-center w-full mb-8 md:w-1/2 lg:w-1/3 md:mb-0'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className='w-full h-auto rounded'
              />
            </div>
            <div className='w-full px-6 text-left md:w-1/2 lg:w-2/3'>
              <h2 className='text-3xl font-semibold'>{movie.title}</h2>
              <p className='mt-2 text-sm text-justify text-gray-800 md:text-sm lg:text-base'>
                {movie.overview}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Genres:</b>{' '}
                {movie.genres.map((genre) => genre.name).join(', ')}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Tagline:</b> {movie.tagline}
              </p>
              <p className='mt-1 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Runtime:</b> {FormatRuntime(movie.runtime)}
              </p>
              <p className='mt-1 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Rating:</b> {movie.vote_average.toFixed(1)}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Release Date:</b> {FormatDate(movie.release_date)}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Production Companies:</b>{' '}
                {movie.production_companies
                  .map((company) => company.name)
                  .join(', ')}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Production Countries:</b>{' '}
                {movie.production_countries
                  .map((country) => country.name)
                  .join(', ')}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Spoken Languages:</b>{' '}
                {movie.spoken_languages
                  .map((lang) => lang.english_name)
                  .join(', ')}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Budget:</b> ${movie.budget.toLocaleString()}
              </p>
              <p className='mt-2 text-sm text-gray-800 md:text-sm lg:text-base'>
                <b>Revenue:</b> ${movie.revenue.toLocaleString()}
              </p>
              <a
                className='block mt-2 text-blue-500'
                href={movie.homepage}
                target='_blank'
                rel='noopener noreferrer'
              >
                Visit Homepage
              </a>
            </div>
          </div>
        </div>
      </div>
      <SeatPlan movie={movie} />
    </div>
  );
};

export default MovieDetails;
