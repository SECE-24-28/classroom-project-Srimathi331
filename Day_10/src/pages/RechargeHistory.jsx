import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RechargeHistory() {
  const navigate = useNavigate();

  const colors = {
    softBeige: "#F2E6D8",
    warmBeige: "#D9C8B4",
    sandBrown: "#A6937C",
    earthBrown: "#8C7C68",
    darkCharcoal: "#403C34",
    white: "#FFFFFF",
  };

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/recharges"); // Fetch from backend
        const sortedData = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setHistory(sortedData);
      } catch (error) {
        console.error("Error fetching recharge history:", error);
        alert("Failed to load recharge history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-center p-10 text-white font-bold">Loading Recharge History...</div>;

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center relative"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1581091870620-3c1c6e2f93d0?auto=format&fit=crop&w=1470&q=80")`,
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2
          className="text-3xl font-bold mb-6 text-center drop-shadow-md"
          style={{ color: colors.softBeige }}
        >
          Recharge History
        </h2>

        <div className="text-center mb-6">
          <button
            onClick={() => navigate("/plans")}
            className="px-6 py-2 rounded-lg bg-[#A6937C] text-black font-semibold hover:opacity-90 transition"
          >
            Back to Plans
          </button>
        </div>

        {history.length === 0 ? (
          <p
            className="text-center opacity-60 text-lg mt-10"
            style={{ color: colors.warmBeige }}
          >
            No recharges done yet
          </p>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-md hover:bg-white/20 transition-all duration-300"
              >
                <div>
                  <p
                    className="font-semibold text-lg"
                    style={{ color: colors.softBeige }}
                  >
                    {item.planName} • ₹{item.amount}
                  </p>
                  <p
                    className="text-sm opacity-70 mt-1"
                    style={{ color: colors.warmBeige }}
                  >
                    {item.mobile} • {item.date}
                  </p>
                </div>

                <div className="mt-3 md:mt-0 text-right">
                  <p
                    className={`text-sm font-medium ${
                      item.status === "Success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.status}
                  </p>
                  <p
                    className="text-xs opacity-60 mt-1"
                    style={{ color: colors.sandBrown }}
                  >
                    {item.paymentMethod}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
