import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { routes } from "../../../config/routes.config";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold mb-4">Oops!</h1>
      <h2 className="text-2xl font-semibold mb-6">Something went wrong</h2>
      <p className="text-gray-600 mb-4">
        {error?.statusText || error?.message || "An unexpected error occurred"}
      </p>
      <Link
        to={routes.home.root}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
