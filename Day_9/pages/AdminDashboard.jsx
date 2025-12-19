import { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaClipboardList,
  FaSignal,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const colors = {
  softBeige: "#F2E6D8",
  warmBeige: "#D9C8B4",
  sandBrown: "#A6937C",
  earthBrown: "#8C7C68",
  darkCharcoal: "#403C34",
};

export default function AdminDashboard() {
  const [plans, setPlans] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [open, setOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    planName: "",
    price: "",
    validity: "",
    description: "",
  });

  const token = localStorage.getItem("adminToken");

  // FETCH PLANS & RECHARGES
  const fetchData = async () => {
    try {
      const [pRes, rRes] = await Promise.all([
        fetch("http://localhost:5000/api/plans", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/recharges", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!pRes.ok || !rRes.ok) {
        if (pRes.status === 401 || rRes.status === 401) {
          alert("Session expired. Please login again.");
          localStorage.removeItem("adminToken");
          window.location.href = "/admin-login";
        }
        throw new Error("Failed to fetch data");
      }

      const plansData = await pRes.json();
      const rechargesData = await rRes.json();

      setPlans(plansData);
      setRecharges(rechargesData);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // backup fetch
    return () => clearInterval(interval);
  }, []);

  const revenue = recharges.reduce((s, r) => s + r.amount, 0);

  const chartData = {
    labels: recharges.map((r) => new Date(r.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: "Revenue",
        data: recharges.map((r) => r.amount),
        backgroundColor: colors.earthBrown,
        borderColor: colors.earthBrown,
        tension: 0.3,
      },
    ],
  };

  // SAVE PLAN AND UPDATE STATE IMMEDIATELY
  const savePlan = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add plan");

      const newPlan = await res.json();
      setPlans((prev) => [...prev, newPlan]);

      setModal(false);
      setForm({ planName: "", price: "", validity: "", description: "" });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ✅ ADD RECHARGE LOCALLY (REAL-TIME)
  const addRechargeLocally = (recharge) => {
    setRecharges((prev) => [...prev, recharge]);
  };

  // Example: simulate adding a recharge (you can call this from a form)
  // addRechargeLocally({ _id: "r123", mobileNumber: "9876543210", plan: { name: "Gold" }, amount: 199, createdAt: new Date() });

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <div
        style={{ background: colors.darkCharcoal }}
        className={`${open ? "w-64" : "w-16"} text-white p-4 transition-all duration-300`}
      >
        <button onClick={() => setOpen(!open)} className="mb-4">
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        {open && <h2 className="mt-6 font-bold text-lg">ADMIN</h2>}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6" style={{ background: colors.softBeige }}>
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Stat title="Plans" value={plans.length} icon={<FaClipboardList />} />
          <Stat title="Recharges" value={recharges.length} icon={<FaSignal />} />
          <Stat title="Revenue" value={revenue} icon={<FaMoneyBillWave />} />
          <Stat
            title="Popular"
            value={plans[0]?.planName || "N/A"}
            icon={<FaStar />}
          />
        </div>

        {/* REVENUE CHART */}
        <div className="bg-white p-4 rounded mb-6 shadow">
          <Line data={chartData} />
        </div>

        {/* ADD PLAN BUTTON */}
        <button
          onClick={() => setModal(true)}
          className="px-4 py-2 text-white rounded mb-4 transition hover:opacity-90"
          style={{ background: colors.earthBrown }}
        >
          + Add Plan
        </button>

        {/* PLANS TABLE */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full bg-white rounded shadow">
            <thead style={{ background: colors.warmBeige }}>
              <tr>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.planName}</td>
                  <td className="p-2">₹{p.price}</td>
                  <td className="p-2">{p.validity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECHARGES TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead style={{ background: colors.warmBeige }}>
              <tr>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Plan</th>
                <th className="p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recharges.map((r) => (
                <tr key={r._id} className="border-t">
                  <td className="p-2">{r.mobileNumber}</td>
                  <td className="p-2">{r.plan?.name || "N/A"}</td>
                  <td className="p-2">₹{r.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD PLAN MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h2 className="font-bold mb-4 text-lg">Add Plan</h2>
            {["planName", "price", "validity", "description"].map((f) => (
              <input
                key={f}
                placeholder={f}
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                className="w-full border p-2 mb-3 rounded outline-none"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={savePlan}
                className="px-4 py-2 text-white rounded"
                style={{ background: colors.earthBrown }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// STAT COMPONENT
function Stat({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded flex justify-between items-center shadow">
      <div>
        <p className="text-sm">{title}</p>
        <h2 className="text-2xl font-bold">
          <CountUp end={value} duration={1} />
        </h2>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  );
}
