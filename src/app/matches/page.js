// src/app/matches/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LikedMoviesService from "../../services/LikedMoviesService.js";

export default function MatchesPage() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likedMoviesService] = useState(() => new LikedMoviesService());

  useEffect(() => {
    async function loadLikedMovies() {
      try {
        setLoading(true);
        const movies = await likedMoviesService.getLikedMovies();
        setLikedMovies(movies);
        setError(null);
      } catch (err) {
        setError("Failed to load liked movies. Please try again.");
        console.error("Error loading liked movies:", err);
      } finally {
        setLoading(false);
      }
    }

    loadLikedMovies();
  }, [likedMoviesService]);


  const deleteMovie = async (movieId) => {
    try {
      await likedMoviesService.unlikeMovie(movieId);

      setLikedMovies(likedMovies.filter((m) => m.id !== movieId));
    } catch (err) {
      setError("Failed to remove movie. Please try again.");
      console.error("Error removing movie:", err);
    }
  };


  if (loading) {
    return (
      <div className='text-center p-10'>
        <h1>My Matches</h1>
        <p>Loading your liked movies...</p>
      </div>
    );
  }


  if (error) {
    return (
      <div className='text-center p-10'>
        <h1>My Matches</h1>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }


  if (likedMovies.length === 0) {
    return (
      <div className='text-center p-10'>
        <h1>My Matches</h1>
        <p>No movies liked yet!</p>
        <Link
          href="/swipe"
          className="px-[20px] py-[10px] bg-[#007bff] text-white rounded"
        >
          Start Swiping Movies
        </Link>
      </div>
    );
  }

  return (
    <div className='p-5 bg-black'>
      <h1 className='text-center text-white'>
        My Matches ({likedMovies.length})
      </h1>

      <div
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5 mt-5"
      >
        {likedMovies.map((movie) => (
          <div
            key={movie.id}
            className="border border-gray-300 rounded-lg p-4 text-center bg-white"
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              width={150}
              height={225}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <h3 className="text-black" style={{ margin: "10px 0 5px 0" }}>
              {movie.title}
            </h3>
            <p className="text-black" style={{ margin: 0, color: "#666" }}>
              {movie.year}
            </p>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          href="/swipe"
          className="inline-block px-5 py-2 bg-green-600 text-white rounded"
        >
          Discover More Movies
        </Link>
      </div>
    </div>
  );
}
