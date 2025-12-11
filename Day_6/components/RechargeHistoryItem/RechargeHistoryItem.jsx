function RechargeHistoryItem({ history }) {
  return (
    <div>
      <p>Mobile: {history.mobile}</p>
      <p>Plan: ₹{history.plan}</p>
      <p>Date: {history.date}</p>
    </div>
  );
}

export default RechargeHistoryItem;
