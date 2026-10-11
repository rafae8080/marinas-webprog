import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useParams } from "react-router-dom";

// HomePage Structure
// Public pages stay in the main bundle: each is only a few KB, and a separate chunk would add a round trip
import Layout from "./layouts/Layout";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import NotesPage from "./pages/LandingPages/NotesPage";
import NotePage from "./pages/LandingPages/NotePage";
import WorkPage from "./pages/LandingPages/WorkPage";
import CaseStudyPage from "./pages/LandingPages/CaseStudyPage";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

// Sign-in and the dashboard (MUI, charts, Leaflet) load on demand, so visitors never download them
const SignInPage = lazy(() => import("./pages/AuthPages/SignInpage"));
const DashLayout = lazy(() => import("./layouts/DashLayout"));
const DashboardPage = lazy(() => import("./pages/DashboardPages/DashboardPage"));
const ReportsPage = lazy(() => import("./pages/DashboardPages/ReportsPage"));
const UsersPage = lazy(() => import("./pages/DashboardPages/UsersPage"));
const DashArticleListPage = lazy(() => import("./pages/DashboardPages/DashArticleListPage"));

const Loading = () => (
  <p role="status" className="p-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
    Loading…
  </p>
);

const withSuspense = (element) => <Suspense fallback={<Loading />}>{element}</Suspense>;

// Old article URLs keep working (§B3)
const ArticleRedirect = () => {
  const { name } = useParams();
  return <Navigate to={`/notes/${name}`} replace />;
};

const routes = [
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
        element: withSuspense(<SignInPage />),
      },
    ],
  },
  {
    path: "dashboard/",
    element: <ProtectedRoute>{withSuspense(<DashLayout />)}</ProtectedRoute>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: withSuspense(<DashboardPage />),
      },
      {
        path: "reports",
        element: withSuspense(<ReportsPage />),
      },
      {
        path: "users",
        element: withSuspense(<UsersPage />),
      },
      {
        path: "articles",
        element: withSuspense(<DashArticleListPage />),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
