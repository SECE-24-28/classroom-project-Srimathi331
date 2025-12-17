// src/components/ProtectedRoute.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);

  if (!user) {
    return (
      <>
        {showLogin || <Login onClose={() => setShowLogin(false)} onSwitch={() => {}} />}
      </>
    );
  }

  return children;
}
