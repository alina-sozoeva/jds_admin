import { createBrowserRouter, Navigate } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../common";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to="/reviews" replace /> },
      { path: "/reviews", element: <Pages.ReviewsPage /> },
      { path: "/edu", element: <Pages.EducationPage /> },
      // { path: "/edu/add", element: <Pages.EditEduPage /> },
      // { path: "/edu/edit/:codeid", element: <Pages.EditEduPage /> },
      { path: "/banners", element: <Pages.BannersPage /> },
    ],
  },
]);
