// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Movie Matcher</h1>
      <p>Discover movies you&#39;ll love!</p>
      <Link
        className="inline-block py-[15px] px-[30px] bg-blue-600 rounded mt-[20px] text-white text-lg"
        href="/swipe"
      >
        {" "}
        Start Discovering Movies
      </Link>
    </div>
  );
}
