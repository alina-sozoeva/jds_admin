import { createBrowserRouter, Navigate } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../common";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/news" replace /> },
      { path: "/news", element: <Pages.NewsPage /> },
    ],
  },
]);
