import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login({ onClose, onSwitch }) {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    const res = await login(email.trim(), password.trim());
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Login failed. Please try again.");
      return;
    }

    if (onClose) onClose();
    navigate("/plans"); // redirect after login
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-[360px] rounded-3xl p-8 bg-white/90 backdrop-blur shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6937C]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6937C]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 py-3 rounded-lg bg-[#A6937C] text-white font-semibold hover:bg-[#8b7a63] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-700 text-sm text-center mt-5">
          Don’t have an account?{" "}
          <span
            className="text-[#A6937C] cursor-pointer font-semibold hover:underline"
            onClick={onSwitch}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
