const scenarios = [
  ["Консервативный", 0.01],
  ["Базовый", 0.15],
  ["Агрессивный", 0.27],
];

export default function RevenueChart() {
  return (
    <div className="revenueChart">
      <h2>Сценарии выручки, модельный расчет</h2>
      {scenarios.map(([name, value]) => (
        <div className="revenueRow" key={name}>
          <span>{name}</span>
          <div><i style={{ width: `${(Number(value) / 0.27) * 100}%` }} /></div>
          <b>{value} млн ₽, сценарий</b>
        </div>
      ))}
    </div>
  );
}
