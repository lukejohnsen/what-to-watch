import Movie from "../models/Movie.js";

class TMDBService {
  #apiKey;
  #baseUrl;
  #imageBaseUrl;

  constructor() {
    this.#apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    this.#baseUrl = "https://api.themoviedb.org/3";
    this.#imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  }

  async fetchPopularMovies(page = 1) {
    const response = await fetch(
      `${this.#baseUrl}/movie/popular?api_key=${this.#apiKey}&page=${page}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results.map(
      (movie) =>
        new Movie({
          id: movie.id,
          title: movie.title,
          year: new Date(movie.release_date).getFullYear(),
          poster: `${this.#imageBaseUrl}${movie.poster_path}`,
          overview: movie.overview,
          rating: movie.vote_average,
        })
    );
  }
}

export default TMDBService;
