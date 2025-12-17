import React, { useEffect, useState } from "react";
import { AiFillFacebook, AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import axios from "axios";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

const socialIcons = {
  facebook: <AiFillFacebook size={24} />,
  twitter: <AiFillTwitterCircle size={24} />,
  instagram: <AiFillInstagram size={24} />,
};

export default function Footer() {
  const [footerData, setFooterData] = useState({ links: [], socialMedia: [] });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/footer");
        setFooterData(res.data);
      } catch (err) {
        console.error("Failed to fetch footer:", err);
      }
    };
    fetchFooter();
  }, []);

  return (
    <footer
      className="py-10 px-4 md:px-20 flex flex-col items-center gap-6"
      style={{ backgroundColor: colors.warmBeige, borderTop: `1px solid ${colors.earthBrown}33` }}
    >
      {/* Links */}
      <div className="flex flex-wrap justify-center gap-8">
        {footerData.links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            className="hover:underline transition duration-300"
            style={{ color: colors.darkCharcoal }}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Social Media Icons */}
      <div className="flex gap-4 mt-4">
        {footerData.socialMedia.map((sm, idx) => (
          <a
            key={idx}
            href={sm.url}
            style={{ color: colors.darkCharcoal }}
            className="hover:text-earthBrown transition duration-300"
          >
            {socialIcons[sm.platform.toLowerCase()] || null}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <div className="text-sm mt-4" style={{ color: colors.earthBrown }}>
        &copy; 2025 RechaGo. All rights reserved.
      </div>
    </footer>
  );
}
