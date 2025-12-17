// Offers.jsx
import React from "react";
import offersBg from "../assets/bg/offers.jpg"; // your uploaded image

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

// Reusable Offer Card
function OfferCard({ title, desc }) {
  return (
    <div
      className="w-60 p-6 rounded-xl text-center shadow-md hover:shadow-lg hover:scale-105 transition transform"
      style={{ backgroundColor: colors.warmBeige }}
    >
      <h3 className="text-xl font-bold" style={{ color: colors.earthBrown }}>
        {title}
      </h3>
      <p className="mt-2" style={{ color: colors.darkCharcoal }}>
        {desc}
      </p>
    </div>
  );
}

export default function Offers() {
  const offers = [
    { title: "Get 50% extra data", desc: "On recharges above ₹499" },
    { title: "Cashback Offer", desc: "Flat ₹100 cashback on first recharge" },
    { title: "Weekend Special", desc: "Recharge on weekend & get 1GB extra" },
  ];

  return (
    <section
      className="py-16 px-4 md:px-20 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${offersBg})` }}
    >
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `linear-gradient(to bottom, ${colors.softBeige}B3, ${colors.softBeige}66, ${colors.softBeige}B3)`,
        }}
      ></div>

      <div className="relative z-10 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-12"
          style={{ color: colors.darkCharcoal }}
        >
          Current Offers
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {offers.map((offer, idx) => (
            <OfferCard key={idx} {...offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
