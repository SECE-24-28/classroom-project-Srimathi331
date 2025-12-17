import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { FaUserCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, admin, logout, adminLogout } = useContext(AuthContext);
  const [menuItems, setMenuItems] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const colors = {
    softBeige: "#F2E6D8",
    warmBeige: "#D9C8B4",
    sandBrown: "#A6937C",
    earthBrown: "#8C7C68",
    darkCharcoal: "#403C34",
  };

  // Fetch menu items from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(res.data);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  // Close profile dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 shadow-md" style={{ backgroundColor: colors.darkCharcoal }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <Link to="/" className="font-bold text-xl" style={{ color: colors.softBeige }}>
            RechaGo
          </Link>

          <div className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium transition"
                style={{
                  color: location.pathname === item.path ? colors.warmBeige : colors.softBeige,
                }}
              >
                {item.name}
              </Link>
            ))}

            {user && !admin && (
              <Link
                to="/history"
                className="text-sm font-medium transition"
                style={{
                  color: location.pathname === "/history" ? colors.warmBeige : colors.softBeige,
                }}
              >
                History
              </Link>
            )}

            {admin && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.softBeige }}>
                  <FaUserCircle size={20} />
                  {profileOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded shadow-lg z-50" style={{ backgroundColor: colors.softBeige, color: colors.darkCharcoal }}>
                    <div onClick={() => { navigate("/admin"); setProfileOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-[#D9C8B4]">
                      Admin Dashboard
                    </div>
                    <div onClick={() => { adminLogout(); setProfileOpen(false); }} className="px-4 py-2 cursor-pointer hover:bg-[#D9C8B4]">
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}

            {user && !admin && (
              <button onClick={logout} className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.softBeige }}>
                <FaUserCircle size={20} />
                Logout
              </button>
            )}

            {!user && !admin && (
              <button onClick={() => setShowLogin(true)} className="text-sm font-medium" style={{ color: colors.softBeige }}>
                Login / Signup
              </button>
            )}
          </div>
        </div>
      </nav>

      {showLogin && <Login onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowSignup(true); }} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} onSwitch={() => { setShowSignup(false); setShowLogin(true); }} />}
    </>
  );
}
