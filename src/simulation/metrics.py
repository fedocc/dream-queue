from __future__ import annotations

from statistics import mean, pvariance

from park_entities import Attraction


def average_wait(attractions: list[Attraction]) -> float:
    samples = [sample for attraction in attractions for sample in attraction.wait_samples]
    return mean(samples) if samples else 0.0


def max_queue(attractions: list[Attraction]) -> float:
    return max((max(attraction.queue_history, default=attraction.queue) for attraction in attractions), default=0.0)


def queue_variance(attractions: list[Attraction]) -> float:
    queues = [attraction.queue for attraction in attractions]
    return pvariance(queues) if len(queues) > 1 else 0.0


def queue_variance_over_time(attractions: list[Attraction]) -> float:
    steps = max((len(attraction.queue_history) for attraction in attractions), default=0)
    samples = []
    for step in range(steps):
        queues = [
            attraction.queue_history[step]
            for attraction in attractions
            if step < len(attraction.queue_history)
        ]
        if len(queues) > 1:
            samples.append(pvariance(queues))
    return mean(samples) if samples else queue_variance(attractions)


def total_completed(attractions: list[Attraction]) -> int:
    return sum(attraction.completed + attraction.completed_priority for attraction in attractions)


def satisfaction(avg_wait_minutes: float, attractions_per_guest: float) -> float:
    score = 78 - avg_wait_minutes * 0.35 + attractions_per_guest * 4.5
    return round(max(0.0, min(100.0, score)), 1)
