const scenarios = [
  ["Conservative", 0.42],
  ["Base", 1.4],
  ["Aggressive", 3.92],
];

export default function RevenueChart() {
  return (
    <div className="revenueChart">
      <h2>Revenue scenarios</h2>
      {scenarios.map(([name, value]) => (
        <div className="revenueRow" key={name}>
          <span>{name}</span>
          <div><i style={{ width: `${Number(value) * 22}%` }} /></div>
          <b>{value} млн ₽</b>
        </div>
      ))}
    </div>
  );
}

