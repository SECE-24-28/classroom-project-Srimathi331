import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClockCircle } from "react-icons/ai";   // Fast Recharge
import { BiShield } from "react-icons/bi";               // Secure Payment
import { MdSupportAgent } from "react-icons/md";         // 24/7 Support

// Map icon strings from backend to actual React Icons
const iconMap = {
  AiOutlineClockCircle: <AiOutlineClockCircle size={50} className="mx-auto mb-4 text-sandBrown" />,
  BiShield: <BiShield size={50} className="mx-auto mb-4 text-earthBrown" />,
  MdSupportAgent: <MdSupportAgent size={50} className="mx-auto mb-4 text-darkCharcoal" />,
};

export default function Benefits() {
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/benefits");
        setBenefits(res.data);
      } catch (err) {
        console.error("Failed to fetch benefits:", err);
      }
    };
    fetchBenefits();
  }, []);

  return (
    <section className="relative py-16 px-4 md:px-20 flex flex-col items-center gap-12 bg-softBeige">
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

      <h2 className="relative text-3xl md:text-4xl font-bold text-sandBrown mb-12 z-10">
        Why Choose RechaGo
      </h2>

      <div className="relative flex flex-wrap justify-center gap-8 z-10">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl w-60 text-center shadow-lg hover:scale-105 transform transition z-10"
            style={{
              background: "linear-gradient(145deg, #F2E6D8, #D9C8B4)",
            }}
          >
            {iconMap[benefit.icon] || <AiOutlineClockCircle size={50} className="mx-auto mb-4 text-sandBrown" />}
            <h3 className="text-xl font-bold text-earthBrown">{benefit.title}</h3>
            <p className="mt-2 text-sandBrown">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
