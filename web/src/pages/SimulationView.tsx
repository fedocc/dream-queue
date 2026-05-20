import { useState } from "react";
import { Activity, Coins, Users } from "lucide-react";
import RevenueChart from "../components/RevenueChart";

const data = {
  baseline: { wait: 82.0, attractions: 2.01, satisfaction: 58.3, revenue: 0 },
  optimized: { wait: 72.3, attractions: 2.0, satisfaction: 61.7, revenue: 145000 },
};

export default function SimulationView() {
  const [mode, setMode] = useState<"baseline" | "optimized">("optimized");
  const current = data[mode];
  return (
    <div>
      <div className="pageHeader">
        <span>Pitch simulation</span>
        <h1>До/после на основе assumptions</h1>
      </div>
      <div className="segmented">
        <button className={mode === "baseline" ? "selected" : ""} onClick={() => setMode("baseline")}>Без продукта</button>
        <button className={mode === "optimized" ? "selected" : ""} onClick={() => setMode("optimized")}>С продуктом</button>
      </div>
      <div className="metricGrid wide">
        <div className="metric"><Activity size={19} /><span>Среднее ожидание</span><strong>{current.wait} мин</strong></div>
        <div className="metric"><Users size={19} /><span>Аттракционов на гостя</span><strong>{current.attractions}</strong></div>
        <div className="metric"><Coins size={19} /><span>Fast-pass выручка</span><strong>{current.revenue.toLocaleString("ru-RU")} ₽</strong></div>
      </div>
      <div className="simulationCharts">
        <div className="beforeAfter">
          <div style={{ height: `${data.baseline.wait * 2}px` }}><span>82 мин</span></div>
          <div style={{ height: `${data.optimized.wait * 2}px` }}><span>72.3 мин</span></div>
        </div>
        <RevenueChart />
        <div className="upliftBox">
          <strong>Итоговый uplift</strong>
          <p>Сценарный output: -9.7 мин к среднему ожиданию, 145 тыс. ₽ fast-slot revenue в базовом peak-day сценарии. Аттракционов на гостя не растет, потому что VQ не увеличивает физическую capacity.</p>
        </div>
      </div>
    </div>
  );
}
