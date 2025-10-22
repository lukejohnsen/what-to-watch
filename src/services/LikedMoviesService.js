import Movie from '../models/Movie.js'

class LikedMoviesService {
    #apiUrl;

    constructor(apiUrl = '/api/liked-movies') {
        this.#apiUrl = apiUrl;
    }

    async getLikedMovies() {
        try {
            const response = await fetch(this.#apiUrl);

            if (!response.ok) {
                throw new Error(`Failed to fetch liked movies: ${response.statusText}`);
            }

            const data = await response.json();

            const movies = data.likedMovies.map(movieData => Movie.fromJSON(movieData));

            return movies;
        } catch (error) {
            console.error("Error fetching liked movies: ", error);
            throw error;
        }
    }

    async likeMovie(movie) {
        try {
            const response = await fetch(this.#apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie: movie.toJSON() }),
            });
            
            if (!response.ok) {
                throw new Error(`Failed to like movie: ${response.statusText}`);
            }

            const data = await response.json();
            return data;

        } catch (error) {
            console.error("Error liking movie: ", error);
            throw error;
        }
    }

    async unlikeMovie(movieId) {
        try {
            const response = await fetch(this.#apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId: movieId }),
            });

            if (!response.ok) {
                throw new Error(`Failed to unlike movie: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error unliking movie: ", error);
            throw error;
        }
    }


}

export default LikedMoviesService;