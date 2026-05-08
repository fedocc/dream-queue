const points = [22, 28, 36, 44, 55, 48, 39];

export default function QueueTimeline() {
  return (
    <div className="timelinePanel">
      <h2>Прогноз очереди на 60 минут</h2>
      <div className="timelineBars">
        {points.map((point, index) => (
          <div key={index} style={{ height: `${point * 2.4}px` }}><span>{point}</span></div>
        ))}
      </div>
    </div>
  );
}

