import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data passed from Plans page
  const plan = location.state;

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>No plan selected. Go back to <span className="text-yellow-400 cursor-pointer" onClick={() => navigate("/")}>Home</span></p>
      </div>
    );
  }

  const handlePayment = () => {
    alert(`Payment of ₹${plan.price} for ${plan.planName} successful!`);
    navigate("/"); // redirect after payment
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Confirm Payment</h1>

      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">{plan.planName}</h2>
        <p className="mb-2">Price: <span className="text-yellow-400">₹{plan.price}</span></p>
        {plan.description && <p className="mb-2">{plan.description}</p>}
        {plan.validity && <p className="mb-4">Validity: {plan.validity}</p>}

        <button
          onClick={handlePayment}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
