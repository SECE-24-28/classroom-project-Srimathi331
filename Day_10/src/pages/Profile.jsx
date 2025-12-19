import { useState, useEffect, useContext } from "react";
import { FaUserCircle, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaLock } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
  gradientStart: "#F2E6D8",
  gradientEnd: "#D9C8B4",
};

export default function Profile() {
  const { user: authUser, token } = useContext(AuthContext); // get token from AuthContext
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    avatar: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile
  useEffect(() => {
    if (!token) return; // no token, skip

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      setUser(updated);
      setFormData(updated);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const savePassword = async () => {
    if (!passwordData.newPassword) return alert("New password cannot be empty!");
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return alert("New passwords do not match!");

    try {
      const res = await fetch("/api/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update password");
      }
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      alert("Password changed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="flex justify-center p-6 min-h-screen" style={{ backgroundColor: colors.softBeige }}>
      <div
        className="w-full max-w-md rounded-lg shadow-lg p-6 relative space-y-6 transform transition-transform hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
          color: colors.darkCharcoal,
        }}
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6 relative">
          {formData.avatar ? (
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-earthBrown shadow-md transition-transform hover:scale-110"
            />
          ) : (
            <FaUserCircle className="text-6xl mb-3 transition-transform hover:scale-110" />
          )}

          {editMode && (
            <label
              htmlFor="avatarUpload"
              className="absolute bottom-0 right-0 bg-earthBrown text-softBeige rounded-full p-2 cursor-pointer hover:opacity-90 transition"
            >
              Edit
            </label>
          )}
          <input
            type="file"
            id="avatarUpload"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />

          <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {[
            { icon: <FaEnvelope />, name: "email", type: "email" },
            { icon: <FaPhone />, name: "mobile", type: "text" },
            { icon: <FaUserCircle />, name: "name", type: "text" },
          ].map((field) => (
            <div className="flex items-center gap-3" key={field.name}>
              {field.icon}
              {editMode ? (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="border p-2 rounded w-full transition-shadow focus:shadow-outline"
                  style={{ borderColor: colors.earthBrown }}
                />
              ) : (
                <span>{user[field.name]}</span>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          {editMode ? (
            <>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData(user);
                }}
                style={{ backgroundColor: colors.earthBrown, color: colors.softBeige }}
                className="px-4 py-2 rounded hover:opacity-90 transition flex items-center gap-2"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={saveProfile}
                style={{ backgroundColor: colors.sandBrown, color: colors.softBeige }}
                className="px-4 py-2 rounded hover:opacity-90 transition flex items-center gap-2"
              >
                <FaSave /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              style={{ backgroundColor: colors.earthBrown, color: colors.softBeige }}
              className="px-4 py-2 rounded hover:opacity-90 transition flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        {/* Change Password Section */}
        <div className="mt-6 border-t pt-4 space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaLock /> Change Password
          </h3>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            className="border p-2 rounded w-full transition-shadow focus:shadow-outline"
            style={{ borderColor: colors.earthBrown }}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="border p-2 rounded w-full transition-shadow focus:shadow-outline"
            style={{ borderColor: colors.earthBrown }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="border p-2 rounded w-full transition-shadow focus:shadow-outline"
            style={{ borderColor: colors.earthBrown }}
          />

          <button
            onClick={savePassword}
            style={{ backgroundColor: colors.sandBrown, color: colors.softBeige }}
            className="px-4 py-2 rounded hover:opacity-90 transition w-full flex justify-center gap-2 items-center"
          >
            <FaSave /> Save Password
          </button>
        </div>
      </div>
    </div>
  );
}
