import { useState } from "react";
import { Activity, Coins, Users } from "lucide-react";
import RevenueChart from "../components/RevenueChart";

const data = {
  baseline: { wait: 38, attractions: 4.8, satisfaction: 67, revenue: 0 },
  optimized: { wait: 25, attractions: 6.1, satisfaction: 83, revenue: 1400000 },
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
        <div className="metric"><Activity size={19} /><span>Среднее ожидание scenario</span><strong>{current.wait} мин</strong></div>
        <div className="metric"><Users size={19} /><span>Аттракционов на гостя scenario</span><strong>{current.attractions}</strong></div>
        <div className="metric"><Coins size={19} /><span>Fast-pass model output</span><strong>{current.revenue.toLocaleString("ru-RU")} ₽</strong></div>
      </div>
      <div className="simulationCharts">
        <div className="beforeAfter">
          <div style={{ height: `${data.baseline.wait * 5}px` }}><span>38 мин</span></div>
          <div style={{ height: `${data.optimized.wait * 5}px` }}><span>25 мин</span></div>
        </div>
        <RevenueChart />
        <div className="upliftBox">
          <strong>Model output, not measured park performance</strong>
          <p>Scenario comparison under assumptions: wait, visits and fast-slot revenue must be validated against baseline park data before use as claims.</p>
        </div>
      </div>
    </div>
  );
}
