// src/pages/DTHRecharge.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DTHRecharge() {
  const [subscriberId, setSubscriberId] = useState("");
  const [operator, setOperator] = useState("");
  const [operatorsList, setOperatorsList] = useState([]);
  const navigate = useNavigate();

  // Fetch available DTH operators from backend
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const res = await axios.get("/api/operators?type=DTH");
        setOperatorsList(res.data);
      } catch (error) {
        console.error("Error fetching DTH operators:", error);
        alert("Failed to load operators.");
      }
    };
    fetchOperators();
  }, []);

  const handleProceed = () => {
    if (!subscriberId || !operator) {
      alert("Please fill all details");
      return;
    }

    navigate("/plans", {
      state: {
        type: "DTH",
        operator,
        subscriberId,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1470&q=80")',
      }}
    >
      <div className="bg-black/60 p-8 rounded-2xl shadow-xl w-[360px] text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">DTH Recharge</h2>

        <select
          className="w-full mb-4 px-4 py-2 rounded text-black"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="">Select Operator</option>
          {operatorsList.map((op) => (
            <option key={op.id} value={op.name}>
              {op.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subscriber ID"
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
          className="w-full px-4 py-2 rounded mb-4 text-black"
        />

        <button
          onClick={handleProceed}
          className="w-full py-3 bg-[#A6937C] text-black rounded-lg font-semibold"
        >
          Proceed to Plans
        </button>
      </div>
    </div>
  );
}
