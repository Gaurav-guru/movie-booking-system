const RemoveNonCinemaGenres = (genres) => {
  if (!Array.isArray(genres)) {
    console.error('Expected an array but received:', genres);
    return [];
  }

  return genres.filter(
    (genre) =>
      genre.name !== 'Documentary' &&
      genre.name !== 'TV Movie' &&
      genre.name !== 'Western',
  );
};

export default RemoveNonCinemaGenres;

