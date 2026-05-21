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
        <span>Сценарная модель</span>
        <h1>До/после на основе предпосылок</h1>
      </div>
      <div className="segmented">
        <button className={mode === "baseline" ? "selected" : ""} onClick={() => setMode("baseline")}>Без продукта</button>
        <button className={mode === "optimized" ? "selected" : ""} onClick={() => setMode("optimized")}>С продуктом</button>
      </div>
      <div className="metricGrid wide">
        <div className="metric"><Activity size={19} /><span>Среднее ожидание, сценарий</span><strong>{current.wait} мин</strong></div>
        <div className="metric"><Users size={19} /><span>Аттракционов на гостя, сценарий</span><strong>{current.attractions}</strong></div>
        <div className="metric"><Coins size={19} /><span>Fast-pass, модельный расчет</span><strong>{current.revenue.toLocaleString("ru-RU")} ₽</strong></div>
      </div>
      <div className="simulationCharts">
        <div className="beforeAfter">
          <div style={{ height: `${data.baseline.wait * 2}px` }}><span>82 мин</span></div>
          <div style={{ height: `${data.optimized.wait * 2}px` }}><span>72.3 мин</span></div>
        </div>
        <RevenueChart />
        <div className="upliftBox">
          <strong>Модельный расчет, не измеренные показатели парка</strong>
          <p>Сценарный расчет по предпосылкам: -9.7 мин к среднему ожиданию и 145 тыс. ₽ выручки быстрых слотов в базовом сценарии пикового дня. Аттракционов на гостя не становится больше, потому что виртуальная очередь не увеличивает физическую емкость; ожидание, посещения и выручку нужно проверить на базовых данных парка до использования как утверждений.</p>
        </div>
      </div>
    </div>
  );
}
