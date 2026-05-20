const scenarios = [
  ["Conservative", 0.01],
  ["Base", 0.15],
  ["Aggressive", 0.27],
];

export default function RevenueChart() {
  return (
    <div className="revenueChart">
      <h2>Revenue scenarios (model output)</h2>
      {scenarios.map(([name, value]) => (
        <div className="revenueRow" key={name}>
          <span>{name}</span>
          <div><i style={{ width: `${(Number(value) / 0.27) * 100}%` }} /></div>
          <b>{value} млн ₽ scenario</b>
        </div>
      ))}
    </div>
  );
}
