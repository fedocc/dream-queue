const zones = [
  ["Village of Smurfs", "high"],
  ["City of Heroes", "medium"],
  ["Dream Race", "low"],
  ["Lost World", "high"],
  ["Kids Land", "low"],
  ["Central Avenue", "medium"],
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

