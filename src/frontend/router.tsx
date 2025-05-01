import { RouteObject } from "react-router-dom";
import { routes } from "../config/routes.config";
import MainLayout from "./layouts/main/main";
import HomePage from "./pages/home/home";
import NotFoundPage from "./pages/notFound";
import ErrorPage from "./pages/error";
import ChatPage from "./pages/chat";

export const reactRouter: RouteObject[] = [
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.home.root,
        element: <HomePage />,
      },
    
      {
        path: routes.chat,
        element: <ChatPage />,
      },],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
