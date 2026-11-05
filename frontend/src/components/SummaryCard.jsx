
const SummaryCard = ({ title, value, color }) => {
  return (
    <div className="summary-card">
      <div
        className="summary-card-accent"
        style={{ backgroundColor: color || "#4f46e5" }}
      ></div>

      <div className="summary-card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
