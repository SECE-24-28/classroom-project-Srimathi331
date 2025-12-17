// RechargeOptions.jsx
import { useNavigate } from "react-router-dom";
import { FaMobileAlt, FaSatelliteDish, FaDatabase } from "react-icons/fa";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

// Reusable Card Component
function RechargeOptionCard({ title, desc, icon, action }) {
  return (
    <div
      onClick={action}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-8 text-center 
                 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
    >
      <div
        className="flex justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ color: colors.earthBrown }}
      >
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.earthBrown }}>
        {title}
      </h3>

      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

export default function RechargeOptions() {
  const navigate = useNavigate();

  const options = [
    {
      title: "Mobile Recharge",
      desc: "Quick and secure mobile recharge anytime.",
      icon: <FaMobileAlt size={28} />,
      action: () => navigate("/plans"),
    },
    {
      title: "DTH Recharge",
      desc: "Quick and secure DTH recharge anytime.",
      icon: <FaSatelliteDish size={28} />,
      action: () => navigate("/dth-recharge"),
    },
    {
      title: "Data Packs",
      desc: "Quick and secure data packs anytime.",
      icon: <FaDatabase size={28} />,
      action: () => navigate("/data-packs"),
    },
  ];

  return (
    // ✅ ADDED id="recharge" for scroll
    <section id="recharge" className="py-16" style={{ backgroundColor: colors.softBeige }}>
      <h2
        className="text-3xl font-bold text-center mb-12"
        style={{ color: colors.darkCharcoal }}
      >
        Recharge Options
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
        {options.map((item) => (
          <RechargeOptionCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
