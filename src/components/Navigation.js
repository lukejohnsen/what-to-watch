'use client';
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
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
        <p>Loading...</p>
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

  return (
    <div className ='flex items-center justify-between px-5 py-5 w-full bg-gray-100 border-b'>
    <nav className='flex items-center justify-between w-full'>
      <div className='flex items-center w-1/3 gap-4'>
      {session ? (
        <>
          <div className='flex gap-4 flex-col flex-start'>
            <span className="text-gray-700">Signed in as {session.user.email}</span>
            <button
              onClick={() => signOut()}
              className="px-[20px] py-[10px] bg-[#dc3545] text-white rounded"

            >
              Sign out
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => signIn()}
          className="px-[20px] py-[10px] bg-[#28a745] text-white rounded"
        >
          Sign In
        </button>
      )}
      </div>
      <div className='flex items-center w-1/3 justify-center gap-4'>
      <Link
        href="/swipe"
        className="px-[20px] py-[10px] bg-[#007bff] text-white rounded"
      >
        Discover Movies
      </Link>
      <Link
        href="/matches"
        className="px-[20px] py-[10px] bg-[#28a745] text-white rounded"
      >
        My Matches
      </Link>
      </div>
      <div className='w-1/3'></div>
    </nav>
    </div>
  );
}
