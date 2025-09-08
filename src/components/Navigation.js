// src/components/Navigation.js
import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Link
        href="/swipe"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "4px",
        }}
      >
        🎬 Discover Movies
      </Link>
      <Link
        href="/matches"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: "4px",
        }}
      >
        ❤️ My Matches
      </Link>
    </nav>
  );
}
