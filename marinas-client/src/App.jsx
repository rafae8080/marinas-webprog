import { createBrowserRouter, Navigate, RouterProvider, useParams } from "react-router-dom";

// HomePage Structure
import Layout from "./layouts/Layout";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import NotesPage from "./pages/LandingPages/NotesPage";
import NotePage from "./pages/LandingPages/NotePage";
import WorkPage from "./pages/LandingPages/WorkPage";
import CaseStudyPage from "./pages/LandingPages/CaseStudyPage";

import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/AuthPages/SignInpage";

import DashLayout from "./layouts/DashLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import UsersPage from "./pages/DashboardPages/UsersPage";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";

import NotFoundPage from "./pages/NotFoundPage";
import StyleguidePage from "./pages/StyleguidePage"; // TEMP: remove in Phase 13

// Old article URLs keep working (§B3)
const ArticleRedirect = () => {
  const { name } = useParams();
  return <Navigate to={`/notes/${name}`} replace />;
};

const routes = [
  // TEMP: remove in Phase 13
  {
    path: "styleguide",
    element: <StyleguidePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "work",
        element: <WorkPage />,
      },
      {
        path: "work/:slug",
        element: <CaseStudyPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "notes/:name",
        element: <NotePage />,
      },
      {
        path: "articles",
        element: <Navigate to="/notes" replace />,
      },
      {
        path: "articles/:name",
        element: <ArticleRedirect />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
    ],
  },
  {
    path: "dashboard/",
    element: (
      <ProtectedRoute>
        <DashLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "articles",
        element: <DashArticleListPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
