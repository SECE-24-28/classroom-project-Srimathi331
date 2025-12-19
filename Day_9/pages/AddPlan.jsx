import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

const dashboardBgUrl = "https://cdn.pixabay.com/photo/2017/08/30/12/45/background-2693929_1280.jpg";

export default function AddPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const editId = query.get("id"); // If editing existing plan

  const [plan, setPlan] = useState({
    planName: "",
    price: "",
    validity: "",
    description: "",
  });

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (editId) {
      fetchPlan();
    }
  }, [editId]);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/plans/${editId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch plan");
      const data = await res.json();
      setPlan({
        planName: data.planName,
        price: data.price,
        validity: data.validity,
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!plan.planName || !plan.price || !plan.validity) {
      return alert("Plan Name, Price, and Validity are required!");
    }
    if (isNaN(plan.price)) return alert("Price must be a number");

    try {
      const url = editId
        ? `http://localhost:5000/api/plans/${editId}`
        : "http://localhost:5000/api/plans";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(plan),
      });

      if (!res.ok) throw new Error("Failed to save plan");

      alert(editId ? "Plan updated successfully!" : "Plan added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: `url(${dashboardBgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="rounded shadow-lg w-full max-w-md p-6 transform hover:scale-105 transition-transform"
        style={{ backgroundColor: colors.warmBeige, color: colors.darkCharcoal }}
      >
        <h2 className="text-2xl font-bold mb-4">{editId ? "Edit Plan" : "Add New Plan"}</h2>

        <input
          name="planName"
          placeholder="Plan Name"
          value={plan.planName}
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
          style={{ borderColor: colors.earthBrown }}
        />

        <input
          name="price"
          placeholder="Price (₹)"
          value={plan.price}
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
          style={{ borderColor: colors.earthBrown }}
        />

        <input
          name="validity"
          placeholder="Validity (e.g., 28 Days)"
          value={plan.validity}
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
          style={{ borderColor: colors.earthBrown }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={plan.description}
          onChange={handleChange}
          className="border p-2 mb-3 w-full rounded"
          style={{ borderColor: colors.earthBrown }}
        />

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 rounded hover:opacity-90 transition"
            style={{ backgroundColor: colors.earthBrown, color: colors.softBeige }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded hover:opacity-90 transition"
            style={{ backgroundColor: colors.sandBrown, color: colors.softBeige }}
          >
            {editId ? "Update Plan" : "Add Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
