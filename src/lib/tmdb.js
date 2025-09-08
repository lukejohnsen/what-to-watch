// src/lib/tmdb.js
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export async function fetchPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  // Transform the data to match what your component expects
  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: new Date(movie.release_date).getFullYear(),
    poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
    overview: movie.overview,
    rating: movie.vote_average,
  }));
}
