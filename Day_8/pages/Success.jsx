import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    // Safety fallback
    navigate("/plans");
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://media.istockphoto.com/id/1150170445/photo/blur-abstract-background-of-corridor-in-clean-hospital-blurred-view-of-aisle-in-office-with.jpg?s=612x612&w=0&k=20&c=shLqGSo6nuRktVbT-CVGAxG1A78Iub8krV7S0wYq5Vw=")`,
      }}
    >
      <div className="bg-black/70 p-8 rounded-2xl text-[#F2E6D8] text-center w-[360px] shadow-xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4 drop-shadow-md">
          Recharge Successful
        </h2>

        <p className="mb-1">{state.mobile}</p>
        <p className="mb-1">{state.planName}</p>
        <p className="mb-4 font-semibold">Amount: ₹{state.amount}</p>

        <button
          onClick={() => navigate("/history")}
          className="w-full py-3 bg-[#A6937C] text-black rounded-lg font-semibold hover:opacity-90 transition"
        >
          View Recharge History
        </button>
      </div>
    </div>
  );
}
