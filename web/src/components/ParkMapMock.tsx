const zones = [
  ["Деревня смурфиков", "high"],
  ["Город героев", "medium"],
  ["Гонка мечты", "low"],
  ["Затерянный мир", "high"],
  ["Детская зона", "low"],
  ["Центральная аллея", "medium"],
];

export default function ParkMapMock() {
  return (
    <div className="parkMap">
      {zones.map(([name, load]) => (
        <div className={`zone ${load}`} key={name}>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
