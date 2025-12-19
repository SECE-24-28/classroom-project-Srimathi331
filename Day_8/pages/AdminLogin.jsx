import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const loginBgUrl =
  "https://images.unsplash.com/photo-1601597115897-7b644fc01ee1?auto=format&fit=crop&w=1470&q=80";

export default function AdminLogin({ onClose }) {
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const colors = {
    softBeige: "#F2E6D8",
    warmBeige: "#D9C8B4",
    sandBrown: "#A6937C",
    earthBrown: "#8C7C68",
    darkCharcoal: "#403C34",
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await adminLogin(email.trim(), password); // ✅ await here
    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (onClose) onClose();
    navigate("/admin");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: `url(${loginBgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        className="relative w-[380px] rounded-2xl p-8 shadow-2xl"
        style={{
          backgroundColor: "rgba(243,234,219,0.9)",
          color: colors.darkCharcoal,
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="px-4 py-2 rounded-lg outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Admin Password"
            className="px-4 py-2 rounded-lg outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-lg font-semibold transition"
            style={{ backgroundColor: colors.sandBrown }}
          >
            {loading ? "Authenticating..." : "Login as Admin"}
          </button>
        </form>

        <p className="text-xs mt-4 text-center opacity-70">
          Restricted access • Admins only
        </p>
      </div>
    </div>
  );
}
