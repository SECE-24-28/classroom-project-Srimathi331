// src/pages/DataPacks.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DataPacks() {
  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataPacks = async () => {
      try {
        const res = await axios.get("/api/plans?type=DATA"); // fetch data packs from backend
        setPacks(res.data);
      } catch (error) {
        console.error("Error fetching data packs:", error);
        alert("Failed to fetch data packs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDataPacks();
  }, []);

  if (loading) return <div className="text-center p-10 text-white font-bold">Loading Data Packs...</div>;

  return (
    <div
      className="min-h-screen p-12 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1470&q=80")',
      }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-white drop-shadow">
        Data Packs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packs.map((p) => (
          <div
            key={p.id}
            className="bg-white/90 p-8 rounded-2xl shadow-lg text-center"
          >
            <h3 className="text-2xl font-semibold mb-2">{p.planName}</h3>
            <p className="mb-6 text-xl text-[#8C7C68]">₹{p.price}</p>
            <button
              onClick={() =>
                navigate("/payment", {
                  state: { ...p },
                })
              }
              className="w-full py-3 bg-[#A6937C] rounded-lg text-black font-semibold"
            >
              Recharge Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
