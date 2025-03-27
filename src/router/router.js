import { createBrowserRouter } from "react-router-dom";
import * as Pages from "../pages";
import { MainLayout } from "../common";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Pages.AboutPage /> },
      { path: "/news", element: <Pages.NewsPage /> },
    ],
  },
]);
