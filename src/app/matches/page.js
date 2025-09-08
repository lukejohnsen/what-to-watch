// src/app/matches/page.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MatchesPage() {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("likedMovies");
    if (saved) {
      setLikedMovies(JSON.parse(saved));
    }
  }, []);

  const deleteMovie = (id) => {
    const updated = likedMovies.filter((m) => m.id !== id);
    setLikedMovies(updated);
    localStorage.setItem("likedMovies", JSON.stringify(updated));
  };

  if (likedMovies.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h1>❤️ My Matches</h1>
        <p>No movies liked yet!</p>
        <Link
          href="/swipe"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Start Swiping Movies
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "black" }}>
      <h1 style={{ textAlign: "center", color: "white" }}>
        ❤️ My Matches ({likedMovies.length})
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {likedMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
                backgroundColor: "white",
            }}
          >
            <Image
              src={movie.poster}
              alt={movie.title}
              width={150}
              height={225}
              style={{ width: "100%", height: "auto", borderRadius: "4px" }}
            />
            <h3 style={{ margin: "10px 0 5px 0" }}>{movie.title}</h3>
            <p style={{ margin: 0, color: "#666" }}>{movie.year}</p>
            <button
              onClick={() => deleteMovie(movie.id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#ff4757",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link
          href="/swipe"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Discover More Movies
        </Link>
      </div>
    </div>
  );
}
