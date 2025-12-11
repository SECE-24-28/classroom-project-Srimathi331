function PlanCard({ plan }) {
  return (
    <div>
      <h3>{plan.planName}</h3>
      <p>Price: ₹{plan.price}</p>
      <p>Validity: {plan.validity}</p>
      <p>{plan.description}</p>
      <p>Speed: {plan.speed}</p>
      <button>Recharge</button>
    </div>
  );
}

export default PlanCard;
