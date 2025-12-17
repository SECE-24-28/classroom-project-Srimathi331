import { createContext, useEffect, useState } from "react";
import axios from "axios"; // We'll use plain axios here

export const AuthContext = createContext();

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/users", // backend prefix
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    if (storedUser && token) setUser(JSON.parse(storedUser));
    if (storedAdmin && token) setAdmin(JSON.parse(storedAdmin));
    setLoading(false);
  }, []);

  // -------------------- Signup --------------------
  const signup = async ({ username, email, password }) => {
    try {
      const res = await axiosInstance.post("/register", {
        username,
        email,
        password,
      });

      // Save user and token
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Use token from backend if available
      if (res.data.token) localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error || "Signup failed",
      };
    }
  };

  // -------------------- User Login --------------------
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/login", { email, password });

      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.token) localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error || "Login failed",
      };
    }
  };

  // -------------------- Logout --------------------
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // -------------------- Admin Login --------------------
  const adminLogin = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      if (res.data.token) localStorage.setItem("token", res.data.token);

      setAdmin(res.data.admin);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.error || "Admin login failed",
      };
    }
  };

  // -------------------- Admin Logout --------------------
  const adminLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        signup,
        login,
        logout,
        adminLogin,
        adminLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
