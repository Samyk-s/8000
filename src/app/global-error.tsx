"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-6 text-center">
      {/* Animated Icon */}
      <div className="mb-6 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="currentColor"
          className="text-red-500"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="mb-2 text-4xl font-extrabold text-red-600">
        Something Went Wrong!
      </h1>

      {/* Description */}
      <p className="mb-6 max-w-md text-gray-700">
        {error?.message ||
          "The page is currently unable to handle this request. Please try again."}
      </p>

      {/* Try Again Button */}
      <button
        onClick={reset}
        className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-600"
      >
        Try Again
      </button>

      {/* Optional Debug Info */}
      {error?.digest && (
        <p className="mt-4 break-words text-sm text-gray-400">
          Debug Info: {error.digest}
        </p>
      )}
    </div>
  );
}
