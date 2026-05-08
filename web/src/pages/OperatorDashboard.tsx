import { AlertTriangle, Gauge, TrendingUp } from "lucide-react";
import QueueTimeline from "../components/QueueTimeline";
import RevenueChart from "../components/RevenueChart";

const load = [
  ["Мельница", 87],
  ["Кобра", 68],
  ["Река Динозавров", 79],
  ["Ночное Дерби", 41],
];

export default function OperatorDashboard() {
  return (
    <div className="operatorGrid">
      <section>
        <div className="pageHeader">
          <span>Operator dashboard</span>
          <h1>Прогноз загрузки и управление слотами</h1>
        </div>
        <div className="metricGrid">
          <div className="metric"><Gauge size={19} /><span>Avg wait</span><strong>24 мин</strong></div>
          <div className="metric"><TrendingUp size={19} /><span>Fast slots</span><strong>1.4 млн ₽/день</strong></div>
          <div className="metric"><AlertTriangle size={19} /><span>Risk zones</span><strong>2</strong></div>
        </div>
        <div className="loadPanel">
          {load.map(([name, value]) => (
            <div className="loadRow" key={name}>
              <span>{name}</span>
              <div><i style={{ width: `${value}%` }} /></div>
              <b>{value}%</b>
            </div>
          ))}
        </div>
        <QueueTimeline />
      </section>
      <aside className="recommendationPanel">
        <h2>Рекомендация системы</h2>
        <p>Мельница перегружена: прогноз очереди 55 мин через 30 минут.</p>
        <p>Ограничить бесплатные слоты, поднять fast slot до 590 ₽, перенаправить гостей на Кобру и Ночное Дерби.</p>
        <RevenueChart />
      </aside>
    </div>
  );
}

