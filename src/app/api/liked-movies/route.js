import { getServerSession } from "next-auth";
import DatabaseService from "@/services/DatabaseService.js";

// Create database service instance
const dbService = new DatabaseService();

// GET /api/liked-movies - Get all liked movies for a user
export async function GET(request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userEmail = session.user.email;
    const movies = await dbService.getLikedMovies(userEmail);

    return Response.json({
      likedMovies: movies
    });
  } catch (error) {
    console.error('Error in GET /api/liked-movies:', error);
    return Response.json(
      { error: "Failed to fetch liked movies" },
      { status: 500 }
    );
  }
}

// POST /api/liked-movies - Like a movie
export async function POST(request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const movie = body.movie;

    if (!movie || !movie.id) {
      return Response.json({ error: "Invalid movie data" }, { status: 400 });
    }

    const userEmail = session.user.email;

    // Add to database
    await dbService.addLikedMovie(userEmail, movie);

    return Response.json(
      { success: true, message: "Movie liked successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/liked-movies:', error);

    // Handle duplicate
    if (error.message === 'Movie already liked') {
      return Response.json({ error: "Movie already liked" }, { status: 409 });
    }

    return Response.json(
      { error: "Failed to like movie" },
      { status: 500 }
    );
  }
}

// DELETE /api/liked-movies - Unlike a movie
export async function DELETE(request) {
  const session = await getServerSession();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const movieId = body.movieId;

    if (!movieId) {
      return Response.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const userEmail = session.user.email;

    // Remove from database
    await dbService.removeLikedMovie(userEmail, movieId);

    return Response.json(
      { success: true, message: "Movie removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/liked-movies:', error);

    // Handle not found
    if (error.message === 'Movie not found in liked list') {
      return Response.json(
        { error: "Movie not found in liked list" },
        { status: 404 }
      );
    }

    return Response.json(
      { error: "Failed to remove movie" },
      { status: 500 }
    );
  }
}
