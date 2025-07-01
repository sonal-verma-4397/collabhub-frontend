import React from "react";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center h-full bg-white dark:bg-[#131416] transition-colors duration-500 rounded-xl">
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          We're working hard to bring something awesome. Stay tuned!
        </p>
        <div className="flex justify-center">
          <svg
            className="animate-spin h-8 w-8 text-indigo-500 dark:text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
