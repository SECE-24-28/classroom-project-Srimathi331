import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup({ onClose, onSwitch }) {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      return setError("Please fill all fields");
    }
    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");

    const res = await signup({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    });

    setLoading(false);

    if (!res.success) {
      return setError(res.message || "Signup failed. Try again.");
    }

    if (onClose) onClose();
    navigate("/plans"); // Redirect after successful signup
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[360px] rounded-3xl p-8 bg-white/90 backdrop-blur shadow-xl z-10 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Signup
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6937C]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A6937C]"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-3 py-3 rounded-lg bg-[#A6937C] text-white font-semibold hover:bg-[#8b7a63] transition"
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <p className="text-gray-700 text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-[#A6937C] cursor-pointer font-semibold hover:underline"
            onClick={onSwitch}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
