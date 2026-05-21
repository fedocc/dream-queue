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
          <span>Панель оператора</span>
          <h1>Прогноз загрузки и управление слотами</h1>
        </div>
        <div className="metricGrid">
          <div className="metric"><Gauge size={19} /><span>Среднее ожидание, сценарий</span><strong>72.3 мин</strong></div>
          <div className="metric"><TrendingUp size={19} /><span>Быстрые слоты, модельный расчет</span><strong>145 тыс. ₽/день</strong></div>
          <div className="metric"><AlertTriangle size={19} /><span>Зоны риска, сценарий</span><strong>2</strong></div>
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
        <p>Сценарный расчет: Мельница перегружена, и прогноз остается чувствительным к опозданиям, неявкам и простоям.</p>
        <p>Гипотеза пилота: ограничить платную емкость, сохранить порог защиты обычной очереди и перенаправить гостей только там, где соблюдение маршрута подтверждается в пилоте.</p>
        <RevenueChart />
      </aside>
    </div>
  );
}
