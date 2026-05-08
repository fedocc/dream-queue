import { CalendarPlus, Zap } from "lucide-react";

type Props = {
  name: string;
  zone: string;
  wait: number;
  slot: string;
  fastPrice: number;
  load: string;
};

export default function AttractionCard({ name, zone, wait, slot, fastPrice, load }: Props) {
  return (
    <article className="attractionCard">
      <div>
        <span className={`loadBadge ${load}`}>{load}</span>
        <h2>{name}</h2>
        <p>{zone}</p>
      </div>
      <div className="waitBlock">
        <strong>{wait} мин</strong>
        <span>Свободный слот: {slot}</span>
        <span>Fast slot: {fastPrice} ₽</span>
      </div>
      <div className="actions">
        <button><CalendarPlus size={17} />Забронировать</button>
        <button className="primary"><Zap size={17} />Купить fast slot</button>
      </div>
    </article>
  );
}

