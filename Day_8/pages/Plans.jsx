import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBolt, FaCheckCircle, FaLock, FaHeadset } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState("Popular");
  const [sortOrder, setSortOrder] = useState("low");
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const rechargeType = location.state?.type || "MOBILE";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plans"); // backend endpoint

        const categorizedPlans = res.data.map((plan) => {
          // Clean price
          const priceNum = Number((plan.price || "0").toString().replace(/\D/g, "")) || 0;
          const desc = (plan.description || "").toLowerCase();
          const validity = (plan.validity || "").toLowerCase();

          // Determine category
          let category = "Other";
          if (priceNum <= 200) category = "Popular";
          else if (desc.includes("gb")) category = "Data";
          else if (validity && validity !== "na") category = "Validity";

          // Recommended if high price + data
          const recommended = priceNum > 500 && desc.includes("gb");

          return { ...plan, category, recommended, priceNum };
        });

        setPlans(categorizedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const tabs = ["Popular", "Data", "Validity"];

  const handleTabChange = (tab) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(tab);
      setFade(true);
    }, 200);
  };

  const filteredPlans = plans
    .filter((plan) => plan.category === activeTab)
    .sort((a, b) =>
      sortOrder === "low" ? a.priceNum - b.priceNum : b.priceNum - a.priceNum
    );

  const handleRecharge = (plan) => {
    navigate("/payment", { state: { ...plan, ...location.state } });
  };

  if (loading)
    return <div className="text-center p-10 text-white font-bold">Loading plans...</div>;

  const benefits = [
    { title: "Fast Recharge", desc: "Instant recharge without delays", icon: <FaBolt size={30} /> },
    { title: "Secure Payment", desc: "Safe & trusted transactions", icon: <FaLock size={30} /> },
    { title: "24/7 Support", desc: "Always here to help", icon: <FaHeadset size={30} /> },
  ];

  return (
    <div
      className="min-h-screen p-10 relative bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://media.istockphoto.com/id/2153687275/photo/new-generation-abstract-empty-building-structure-made-of-gray-concrete.jpg?s=612x612&w=0&k=20&c=78AVteysMKBPXMtK736O5nHqooMlRMw_nLzOG8kwxgI=")',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          {rechargeType === "DTH" ? "DTH Plans" : rechargeType === "DATA" ? "Data Packs" : "Mobile Plans"}
        </h1>

        {/* Benefits */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
          {benefits.map((b, idx) => (
            <div key={idx} className="p-6 text-center rounded-lg bg-white/10 hover:scale-105 transition">
              <div className="mb-3 text-[#F2E6D8]">{b.icon}</div>
              <h3 className="text-white font-bold">{b.title}</h3>
              <p className="text-sm text-white">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6 relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab ? "bg-[#A6937C] text-white" : "bg-[#403C34] text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sort Buttons */}
        <div className="flex justify-center gap-4 mb-6 relative z-10">
          <button
            onClick={() => setSortOrder("low")}
            className="px-3 py-1 bg-[#403C34] text-white rounded"
          >
            Price: Low
          </button>
          <button
            onClick={() => setSortOrder("high")}
            className="px-3 py-1 bg-[#403C34] text-white rounded"
          >
            Price: High
          </button>
        </div>

        {/* Plans Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all ${fade ? "opacity-100" : "opacity-0"}`}>
          {filteredPlans.map((plan) => (
            <div key={plan._id} className="p-6 rounded-xl bg-white/10 hover:scale-105 transition">
              {plan.recommended && <FaCheckCircle className="text-[#A6937C] mb-2" />}
              <h2 className="text-xl font-bold text-white mb-2">{plan.planName}</h2>
              <p className="text-white mb-1">₹{plan.price}</p>
              <p className="text-white text-sm mb-1">{plan.description}</p>
              <p className="text-white text-sm mb-4">Validity: {plan.validity}</p>
              <button
                onClick={() => handleRecharge(plan)}
                className="w-full py-2 bg-[#A6937C] rounded text-black font-semibold"
              >
                Recharge
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
