import { createBrowserRouter, RouterProvider } from "react-router-dom";

// HomePage Structure
import ArticleListPage from "./pages/ArticleListPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import ArticlePage from "./pages/ArticlePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/articles",
        element: <ArticleListPage />,
      },
      {
        path: "/articles/:name",
        element: <ArticlePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
