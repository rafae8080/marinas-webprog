import { Navigate } from "react-router-dom";

// Renders children only when a token is saved; otherwise redirects to sign in.
// The server still checks the token on every protected request.
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;
