import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { admin, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;
  if (!admin) return <Navigate to="/admin-login" replace state={{ from: location.pathname }} />;
  return children;
}
