class MovieSwipeController {
  #movies = [];
  #likedMovies = [];
  #dislikedMovies = [];
  #currentIndex = 0;

  #tmdbService;
  #likedMoviesService;

  constructor(tmdbService, likedMoviesService) {
    this.#tmdbService = tmdbService;
    this.#likedMoviesService = likedMoviesService;
  }

  async loadMovies(page = 1) {
    try {
      // Fetch movies from TMDB
      const allMovies = await this.#tmdbService.fetchPopularMovies(page);

      // Fetch already liked movies to filter them out
      const likedMovies = await this.#likedMoviesService.getLikedMovies();
      const likedMovieIds = new Set(likedMovies.map(m => m.id));

      // Filter out already liked movies
      const unseenMovies = allMovies.filter(movie => !likedMovieIds.has(movie.id));

      this.#movies = unseenMovies;
      this.#currentIndex = 0;

      return unseenMovies;
    } catch (error) {
      console.error("Error loading movies:", error);
      throw error;
    }
  }

  getCurrentMovie() {
    if (this.#currentIndex >= this.#movies.length) {
      return null;
    }
    return this.#movies[this.#currentIndex];
  }

  async handleLike() {
    const currentMovie = this.getCurrentMovie();

    if (!currentMovie) {
      return;
    }

    try {
      this.#likedMovies.push(currentMovie);

      await this.#likedMoviesService.likeMovie(currentMovie);

      this.#currentIndex++;

      return this.getCurrentMovie();
    } catch (error) {
      console.error("Error handling like:", error);

      throw error;
    }
  }

  handleDislike() {
    const currentMovie = this.getCurrentMovie();

    if (!currentMovie) {
      return;
    }

    this.#dislikedMovies.push(currentMovie);

    this.#currentIndex++;

    return this.getCurrentMovie();
  }

  hasMoreMovies() {
    return this.#currentIndex < this.#movies.length;
  }

  reset() {
    this.#currentIndex = 0;
    return this.getCurrentMovie();
  }

  getLikedMovies() {
    return [...this.#likedMovies]; // Return a copy, not the original array
  }

  getDislikedMovies() {
    return [...this.#dislikedMovies];
  }

  getProgress() {
    return {
      current: this.#currentIndex,
      total: this.#movies.length,
      percentage:
        this.#movies.length > 0
          ? Math.round((this.#currentIndex / this.#movies.length) * 100)
          : 0,
    };
  }
}

export default MovieSwipeController;
