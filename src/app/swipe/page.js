'use client'
import { useState, useEffect } from "react";
import { fetchPopularMovies } from "../../lib/tmdb";
import Image from "next/image";

export default function SwipePage() {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [dislikedMovies, setDislikedMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies when component loads
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const movies = await fetchPopularMovies();
        setMovies(movies);
        setError(null);
      } catch (err) {
        setError("Failed to load movies. Please check your API key.");
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  // Your task: Add a function to handle button clicks
  const handleChoice = (choice) => {
    const currentMovie = movies[currentIndex];

    if (choice === "like") {
      setLikedMovies([...likedMovies, currentMovie]);

      localStorage.setItem("likedMovies", JSON.stringify([...likedMovies, currentMovie]));
    } else {
      setDislikedMovies([...dislikedMovies, currentMovie]);
    }

    const nextIndex = currentIndex + 1;

    if (nextIndex >= movies.length) {
      setShowPopup(true);
    }

    setCurrentIndex(nextIndex);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setShowPopup(false);
  };

    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Movie Matcher</h1>
          <p>Loading amazing movies for you...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}>
          <h1>Movie Matcher</h1>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}>
          <h1>Movie Matcher</h1>
          <p>No movies found!</p>
        </div>
      );
    }

  if (showPopup) {
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
          <p>You&apos;ve seen all {movies.length} movies in this collection.</p>
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
            🔄 Start Over
          </button>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "black" }}>
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
        <h2>{currentMovie.title}</h2>
        <p>{currentMovie.year}</p>

        {/* Your task: Add the buttons here */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => handleChoice("dislike")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4757",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            👎 Pass
          </button>
          <button
            onClick={() => handleChoice("like")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2ed573",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            👍 Like
          </button>
        </div>
      </div>
    </div>
  );
}
