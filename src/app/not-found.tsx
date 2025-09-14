"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6 text-center">
      {/* Animated Emoji */}
      <div className="mb-6 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="text-red-500"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
        </svg>
      </div>

      {/* 404 Title */}
      <h1 className="mb-4 text-6xl font-extrabold text-red-600">404</h1>

      {/* Subtitle */}
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">
        Oops! Page Not Found
      </h2>

      {/* Description */}
      <p className="mb-6 max-w-md text-gray-600">
        The page you are looking for doesn’t exist, may have been moved, or
        there was a typo in the URL. Don’t worry, we’ll get you back on track!
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-red-500 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-red-600"
        >
          Go to Home
        </Link>
        <button
          className="rounded-lg border border-red-500 bg-white px-6 py-3 font-medium text-red-500 shadow-md transition-all duration-300 hover:bg-red-50"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
