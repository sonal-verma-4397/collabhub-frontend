import React from "react";
import { useLocation, useNavigate, useRouteError } from "react-router";

export default function Error() {
  const error = useRouteError();
  const {
    status,
    statusText,
    data,
    message,
    stack,
    constructor = {},
  } = error || {};
  const navigate = useNavigate();
  // Inside your component
  const [showFullStack, setShowFullStack] = React.useState(false);
  const [showNodeModules, setShowNodeModules] = React.useState(false);

  // Filter stack trace
  const getFilteredStack = (stack) => {
    return stack
      ?.split("\n")
      .filter((line) => {
        const isNodeModule = line.includes("node_modules");
        const isAtLine = line.trim().startsWith("at");
        return isAtLine && (showNodeModules || !isNodeModule);
      })
      .map((line) => {
        if (!showFullStack) {
          const match = line.trim().match(/^at\s+([^\s]+)/);
          return match ? `at ${match[1]}` : line;
        }
        return line;
      })
      .join("\n");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <div className="overflow-hidden text-center bg-gray-100 dark:bg-[#1a1a1a] p-10 rounded-2xl shadow-lg  transition-colors duration-500">
        <h1 className="text-5xl font-extrabold text-red-600 dark:text-red-500 mb-4">
          {status || constructor.name || "Unknown Error"}
        </h1>
        {statusText}
        <p className="text-xl mb-2">
          <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
            {data || message || "Something went wrong."}
          </span>
        </p>
        {!status && (
          <>
            <pre className="w-fit m-auto text-left max-h-64 overflow-auto bg-gray-200 dark:bg-gray-800 p-4 rounded-md text-sm mt-4 whitespace-pre-wrap">
              {getFilteredStack(stack)}
            </pre>

            <div className="mt-2 flex gap-4 text-sm w-fit m-auto">
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <button
                  onClick={() => setShowFullStack((prev) => !prev)}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-400 dark:border-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  {showFullStack ? "🙈 Hide Full path" : "🔍 Show Full path"}
                </button>

                <button
                  onClick={() => setShowNodeModules((prev) => !prev)}
                  className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-400 dark:border-yellow-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  {showNodeModules
                    ? "📦 Hide node_modules"
                    : "📂 Show node_modules"}
                </button>
              </div>
            </div>
          </>
        )}

        {status && (
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 rounded-md text-white font-medium transition-all duration-300"
          >
            ⬅ Go Back
          </button>
        )}
      </div>
    </div>
  );
}
