// Hero.jsx
import React from "react";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

export default function Hero() {
  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `${colors.darkCharcoal}80` }} // 50% opacity overlay
      ></div>

      {/* Content */}
      <div className="relative text-center px-4 max-w-3xl">
        {/* Main Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          style={{ color: colors.softBeige }}
        >
          Recharge Anytime, Anywhere
        </h1>

        {/* Subheading */}
        <p
          className="text-base sm:text-lg md:text-xl mb-6"
          style={{ color: colors.earthBrown }}
        >
          Fast, secure, and instant recharges with{" "}
          <span className="font-semibold" style={{ color: colors.softBeige }}>
            RechaGo
          </span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary Button */}
          <button
            onClick={() => scrollToSection("plans")}
            className="px-6 py-3 rounded-md font-semibold transition-all duration-300"
            style={{
              backgroundColor: colors.warmBeige,
              color: colors.darkCharcoal,
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = colors.sandBrown)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colors.warmBeige)}
          >
            View Plans
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => scrollToSection("recharge")}
            className="px-6 py-3 rounded-md font-semibold border transition-all duration-300"
            style={{
              borderColor: colors.softBeige,
              color: colors.softBeige,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = colors.sandBrown;
              e.currentTarget.style.color = colors.darkCharcoal;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = colors.softBeige;
            }}
          >
            Recharge Now
          </button>
        </div>
      </div>
    </section>
  );
}
