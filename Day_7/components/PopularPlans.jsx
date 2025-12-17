// PopularPlans.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import plansBg from "../assets/bg/plans.jpg";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

// Reusable Plan Card
function PlanCard({ plan, onClick }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md text-center">
      <p className="text-xl font-semibold mb-2" style={{ color: colors.sandBrown }}>
        ₹{plan.price}
      </p>

      <p className="mb-4" style={{ color: colors.darkCharcoal }}>
        {plan.details}
      </p>

      <button
        onClick={onClick}
        className="px-4 py-2 rounded transition"
        style={{
          backgroundColor: colors.darkCharcoal,
          color: colors.softBeige,
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.earthBrown)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = colors.darkCharcoal)
        }
      >
        Recharge
      </button>
    </div>
  );
}

export default function PopularPlans({ plansData = [], loading }) {
  const navigate = useNavigate();

  const handleRechargeClick = (plan) => {
    navigate("/payment", { state: plan });
  };

  return (
    <section
      id="plans"
      className="py-16 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${plansBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Popular Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* ✅ Loading State */}
          {loading ? (
            <p className="text-white text-center col-span-3">
              Loading plans...
            </p>
          ) : plansData.length === 0 ? (
            /* ✅ No Plans */
            <p className="text-white text-center col-span-3">
              No plans available
            </p>
          ) : (
            /* ✅ Plans from backend */
            plansData.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onClick={() => handleRechargeClick(plan)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
