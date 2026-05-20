import { Navigation, Sparkles } from "lucide-react";
import AttractionCard from "../components/AttractionCard";
import ParkMapMock from "../components/ParkMapMock";

const attractions = [
  { name: "Мельница", zone: "Village of Smurfs", wait: 42, slot: "16:20", fastPrice: 490, load: "high" },
  { name: "Кобра", zone: "City of Heroes", wait: 28, slot: "15:45", fastPrice: 590, load: "medium" },
  { name: "Ночное Дерби", zone: "Dream Race", wait: 18, slot: "15:20", fastPrice: 390, load: "low" },
  { name: "Река Динозавров", zone: "Lost World", wait: 36, slot: "16:05", fastPrice: 490, load: "high" },
];

export default function GuestView() {
  return (
    <div className="pageGrid">
      <section>
        <div className="pageHeader">
          <span>Guest app</span>
          <h1>Сценарный маршрут и управляемое окно ожидания</h1>
        </div>
        <div className="routePanel">
          <Sparkles size={20} />
          <div>
            <strong>Рекомендация маршрута (pilot hypothesis)</strong>
            <p>Сначала Ночное Дерби, затем Кобра через free slot 15:45. Мельницу лучше проверить как bottleneck slot на 16:20.</p>
          </div>
        </div>
        <div className="cardList">
          {attractions.map((item) => (
            <AttractionCard key={item.name} {...item} />
          ))}
        </div>
      </section>
      <aside>
        <div className="toolHeader">
          <Navigation size={19} />
          <span>Live park load</span>
        </div>
        <ParkMapMock />
      </aside>
    </div>
  );
}
