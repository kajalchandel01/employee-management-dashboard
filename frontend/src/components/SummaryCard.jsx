const SummaryCard = ({title,value, color}) => {
  return (
    <div className="card" style={{backgroundColor:color || "red"}}>
      <h3>{title}</h3>
      <p>{value}</p>
      
    </div>
  );
};

export default SummaryCard;