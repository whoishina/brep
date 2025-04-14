import { RouteObject } from "react-router-dom";
import { routes } from "../config/routes.config";
import MainLayout from "./layouts/main/main";
import HomePage from "./pages/home/home";
import NotFoundPage from "./pages/notFound";
import ErrorPage from "./pages/error";

export const reactRouter: RouteObject[] = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.home.root,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
