'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import TMDBService from "../../services/TMDBService.js";
import LikedMoviesService from "../../services/LikedMoviesService.js";
import MovieSwipeController from "../../controllers/MovieSwipeController.js";

export default function SwipePage() {

  const [controller] = useState(() => {
    const tmdbService = new TMDBService();
    const likedMoviesService = new LikedMoviesService();
    return new MovieSwipeController(tmdbService, likedMoviesService);
  });

  const [currentMovie, setCurrentMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data: session } = useSession();

  // Load movies on mount
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        await controller.loadMovies();
        setCurrentMovie(controller.getCurrentMovie());
        setError(null);
      } catch (err) {
        setError("Failed to load movies. Please check your API key.");
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [controller]);

  // Handle like
  const handleLike = async () => {
    try {
      await controller.handleLike();
      const nextMovie = controller.getCurrentMovie();

      if (!nextMovie) {
        setShowPopup(true);
      } else {
        setCurrentMovie(nextMovie);
      }
    } catch (err) {
      setError("Failed to save liked movie. Please try again.");
      console.error("Error liking movie:", err);
    }
  };

  // Handle dislike
  const handleDislike = () => {
    controller.handleDislike();
    const nextMovie = controller.getCurrentMovie();

    if (!nextMovie) {
      setShowPopup(true);
    } else {
      setCurrentMovie(nextMovie);
    }
  };

  // Handle reset
  const handleReset = () => {
    controller.reset();
    setCurrentMovie(controller.getCurrentMovie());
    setShowPopup(false);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Movie Matcher</h1>
        <p>Loading amazing movies for you...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}>
        <h1>Movie Matcher</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  // No movies state
  if (!currentMovie && !showPopup) {
    return (
      <div style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}>
        <h1>Movie Matcher</h1>
        <p>No movies found!</p>
      </div>
    );
  }

  // All done popup
  if (showPopup) {
    const progress = controller.getProgress();
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: "black",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "400px",
            color: "black",
          }}
        >
          <h1>🎬 All Done!</h1>
          <p>You&apos;ve seen all {progress.total} movies in this collection.</p>
          <p>Check back soon for more movies to discover!</p>

          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Main swipe UI
  return (
    <div
      style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}
    >
      <h1 style={{ color: "white" }}>Movie Matcher</h1>
      <div
        style={{
          border: "1px solid #ccc",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "300px",
          margin: "0 auto",
        }}
      >
        <Image
          src={currentMovie.poster}
          alt={currentMovie.title}
          width={300}
          height={450}
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
        />
        <h2 className="text-black">{currentMovie.title}</h2>
        <p className="text-black">{currentMovie.year}</p>

        {session ? (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleDislike}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ff4757",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Pass
            </button>
            <button
              onClick={handleLike}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2ed573",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Like
            </button>
          </div>
        ) : (
          <p style={{ color: "red", marginTop: "20px" }}>Please sign in to start matching movies!</p>
        )}
      </div>
    </div>
  );
}
