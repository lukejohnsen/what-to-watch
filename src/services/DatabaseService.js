import { createClient } from '@supabase/supabase-js';

class DatabaseService {
  #supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }

    this.#supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Get all liked movies for a user
  async getLikedMovies(userEmail) {
    try {
      const { data, error } = await this.#supabase
        .from('liked_movies')
        .select('movie_data')
        .eq('user_email', userEmail)
        .order('liked_at', { ascending: false });

      if (error) throw error;

      // Extract just the movie_data from each row
      return data.map(row => row.movie_data);
    } catch (error) {
      console.error('Error getting liked movies:', error);
      throw error;
    }
  }

  // Add a liked movie
  async addLikedMovie(userEmail, movie) {
    try {
      const { data, error } = await this.#supabase
        .from('liked_movies')
        .insert({
          user_email: userEmail,
          movie_id: movie.id,
          movie_data: movie
        })
        .select();

      if (error) {
        // Check if it's a duplicate (unique constraint violation)
        if (error.code === '23505') {
          throw new Error('Movie already liked');
        }
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error('Error adding liked movie:', error);
      throw error;
    }
  }

  // Remove a liked movie
  async removeLikedMovie(userEmail, movieId) {
    try {
      const { data, error } = await this.#supabase
        .from('liked_movies')
        .delete()
        .eq('user_email', userEmail)
        .eq('movie_id', movieId)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('Movie not found in liked list');
      }

      return data[0];
    } catch (error) {
      console.error('Error removing liked movie:', error);
      throw error;
    }
  }

  // Check if a movie is already liked
  async isMovieLiked(userEmail, movieId) {
    try {
      const { data, error } = await this.#supabase
        .from('liked_movies')
        .select('id')
        .eq('user_email', userEmail)
        .eq('movie_id', movieId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 = no rows returned (not an error, just not found)
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking if movie is liked:', error);
      throw error;
    }
  }
}

export default DatabaseService;
