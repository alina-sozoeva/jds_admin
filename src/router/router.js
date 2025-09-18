import { createBrowserRouter, Navigate } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../common";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/reviews" replace /> },
      { path: "/reviews", element: <Pages.ReviewsPage /> },
      { path: "/study", element: <Pages.StudyPage /> },
    ],
  },
]);
