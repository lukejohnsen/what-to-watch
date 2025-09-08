// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎬 Movie Matcher</h1>
      <p>Discover movies you&#39;ll love!</p>
      <Link
        href="/swipe"
        style={{
          display: "inline-block",
          padding: "15px 30px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontSize: "18px",
          marginTop: "20px",
        }}
      >
        Start Discovering Movies →
      </Link>
    </div>
  );
}
