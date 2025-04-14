import { useEdenMutation } from "@/hooks/eden-query";
import { useEden } from "@/providers/eden.provider";
import { useState } from "react";

export default function HomePage() {
  const { api } = useEden();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, data } = useEdenMutation(api.v1.users.create.post, {
    key: ["users"],
  });

  const handleCreateUser = () => {
    setIsLoading(true);
    mutate(
      { name: "John" },
      {
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100">
              Welcome to BREP Stack
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Bun + React + ElysiaJS + Prisma: A modern full-stack boilerplate
              for building fast and scalable web applications
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                  Bun
                </h3>
                <p className="text-slate-400">
                  Lightning-fast JavaScript runtime & package manager
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                  Elysia
                </h3>
                <p className="text-slate-400">
                  Fast, and friendly web framework for Bun
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">⚛️</div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                  React
                </h3>
                <p className="text-slate-400">
                  A JavaScript library for building user interfaces
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-2xl font-semibold mb-3 text-slate-200">
                  Prisma
                </h3>
                <p className="text-slate-400">
                  Next-generation ORM for Node.js and TypeScript
                </p>
              </div>
            </div>

            {/* Try Demo API Section */}
            <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-slate-200">
                Try Demo API
              </h2>
              <p className="text-slate-400 mb-6">
                Test our user creation API with a single click
              </p>
              <button
                onClick={handleCreateUser}
                disabled={isLoading}
                className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating User...
                  </span>
                ) : (
                  "Create Test User"
                )}
              </button>
            </div>

            <div className="space-x-4">
              <a
                href="https://github.com/yourusername/bun-elysia-fullstack"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900/50 hover:bg-slate-800/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block backdrop-blur-lg border border-slate-700/50"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { data: userData } = data;

  if (userData?.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 -right-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100">
              User Created Successfully!
            </h1>
            <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-slate-200">
                User Details:
              </h2>
              <pre className="text-left bg-slate-800/50 p-6 rounded-xl text-slate-300">
                {JSON.stringify(userData.data, null, 2)}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              disabled={isLoading}
              className="mt-8 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating User...
                </span>
              ) : (
                "Create Another User"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-slate-800 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-300 to-slate-100">
            Error
          </h1>
          <div className="bg-slate-900/50 backdrop-blur-lg p-8 rounded-2xl border border-slate-700/50 max-w-md mx-auto">
            <pre className="text-left bg-slate-800/50 p-6 rounded-xl text-slate-300">
              {JSON.stringify(userData?.error?.message, null, 2)}
            </pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            disabled={isLoading}
            className="mt-8 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating User...
              </span>
            ) : (
              "Try Again"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
