from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Attraction:
    name: str
    popularity: float
    capacity_per_hour: int
    effective_capacity_factor: float = 1.0
    queue: float = 0.0
    priority_queue: float = 0.0
    completed: int = 0
    completed_priority: int = 0
    wait_samples: list[float] = field(default_factory=list)
    queue_history: list[float] = field(default_factory=list)
    priority_history: list[float] = field(default_factory=list)

    @property
    def capacity_per_step(self) -> float:
        return self.capacity_per_hour / 12 * self.effective_capacity_factor

    def add_demand(self, visitors: float) -> None:
        self.queue += visitors

    def add_priority_demand(self, visitors: float) -> None:
        self.priority_queue += visitors

    def process_step(self, priority_capacity_share: float = 0.0) -> None:
        priority_capacity = self.capacity_per_step * priority_capacity_share
        priority_served = min(self.priority_queue, priority_capacity)
        self.priority_queue -= priority_served

        regular_capacity = self.capacity_per_step - priority_served
        served = min(self.queue, regular_capacity)
        self.queue -= served
        self.completed += int(served)
        self.completed_priority += int(priority_served)
        wait_minutes = 5 * self.queue / max(1.0, self.capacity_per_step)
        self.wait_samples.append(wait_minutes)
        self.queue_history.append(self.queue)
        self.priority_history.append(self.priority_queue)


@dataclass
class SimulationResult:
    mode: str
    avg_wait_time: float
    max_queue_length: float
    attractions_completed_per_visitor: float
    visitor_satisfaction_score: float
    paid_slots_sold: int = 0
    revenue_generated: float = 0.0
    queue_variance: float = 0.0
    attraction_loads: dict[str, float] = field(default_factory=dict)
