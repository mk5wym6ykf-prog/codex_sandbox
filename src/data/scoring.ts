import type { Category, Goal, GoalPriority, Milestone, ProgressUpdate, Year } from "./model";

export type CategoryScore = {
  categoryId: string;
  goalKpiScore: number | null;
  selfReflectionScore: number;
};

export type YearScoreSummary = {
  categoryScores: CategoryScore[];
  overallLifeScore: number;
};

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function getPriorityWeight(priority: GoalPriority) {
  const priorityWeights: Record<GoalPriority, number> = {
    low: 1,
    medium: 2,
    high: 3,
  };

  return priorityWeights[priority];
}

export function calculateMetricGoalProgress(goal: Goal, progressUpdates: ProgressUpdate[]) {
  if (goal.trackingConfig.type !== "metric") {
    return 0;
  }

  const latestValue = getLatestNumberUpdate(goal, progressUpdates, "value");

  if (latestValue === null) {
    return goal.trackingConfig.currentValue === null ? 0 : metricProgress(goal, goal.trackingConfig.currentValue);
  }

  return metricProgress(goal, latestValue);
}

export function calculateHabitGoalProgress(
  goal: Goal,
  progressUpdates: ProgressUpdate[],
  currentDate = new Date(),
) {
  if (goal.trackingConfig.type !== "habit") {
    return 0;
  }

  const completedPeriods = progressUpdates.filter((update) => {
    return (
      update.goalId === goal.id &&
      update.updateType === "habit" &&
      update.count !== null &&
      new Date(update.date) <= currentDate
    );
  });

  if (completedPeriods.length === 0) {
    return 0;
  }

  const { targetCount } = goal.trackingConfig;
  const progressSum = completedPeriods.reduce((sum, update) => {
    return sum + clamp((update.count ?? 0) / targetCount);
  }, 0);

  return progressSum / completedPeriods.length;
}

export function calculateMilestoneGoalProgress(goal: Goal, milestones: Milestone[]) {
  if (goal.trackingConfig.type !== "milestone") {
    return 0;
  }

  const goalMilestones = milestones.filter((milestone) => milestone.goalId === goal.id);

  if (goalMilestones.length === 0) {
    return 0;
  }

  const completedCount = goalMilestones.filter((milestone) => milestone.isCompleted).length;

  return completedCount / goalMilestones.length;
}

export function calculateReflectionGoalProgress(goal: Goal, progressUpdates: ProgressUpdate[]) {
  if (goal.trackingConfig.type !== "reflection") {
    return 0;
  }

  const ratings = progressUpdates
    .filter((update) => update.goalId === goal.id && update.updateType === "reflection")
    .map((update) => update.rating)
    .filter((rating): rating is number => rating !== null);

  if (ratings.length === 0) {
    return 0;
  }

  const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  const ratingRange = goal.trackingConfig.targetRating - goal.trackingConfig.startingRating;

  if (ratingRange === 0) {
    return 0;
  }

  return clamp((averageRating - goal.trackingConfig.startingRating) / ratingRange);
}

export function calculateGoalProgress(goal: Goal, year: Year, currentDate = new Date()) {
  if (goal.status === "completed") {
    return 1;
  }

  switch (goal.goalType) {
    case "metric":
      return calculateMetricGoalProgress(goal, year.progressUpdates);
    case "habit":
      return calculateHabitGoalProgress(goal, year.progressUpdates, currentDate);
    case "milestone":
      return calculateMilestoneGoalProgress(goal, year.milestones);
    case "reflection":
      return calculateReflectionGoalProgress(goal, year.progressUpdates);
  }
}

export function calculateCategoryGoalKpiScore(
  category: Category,
  year: Year,
  currentDate = new Date(),
) {
  const scoringGoals = year.goals.filter((goal) => {
    const isInCategory = goal.categoryId === category.id;
    const shouldCount = goal.status !== "archived" || goal.countsTowardScore;

    return isInCategory && shouldCount;
  });

  if (scoringGoals.length === 0) {
    return null;
  }

  const weightedProgressSum = scoringGoals.reduce((sum, goal) => {
    return sum + calculateGoalProgress(goal, year, currentDate) * getPriorityWeight(goal.priority);
  }, 0);
  const weightSum = scoringGoals.reduce((sum, goal) => sum + getPriorityWeight(goal.priority), 0);

  return (weightedProgressSum / weightSum) * 10;
}

export function calculateCategorySelfReflectionScore(category: Category) {
  return clamp(category.selfReflectionScore, 1, 10);
}

export function calculateYearScores(year: Year, currentDate = new Date()): YearScoreSummary {
  const categoryScores = year.categories.map((category) => {
    return {
      categoryId: category.id,
      goalKpiScore: calculateCategoryGoalKpiScore(category, year, currentDate),
      selfReflectionScore: calculateCategorySelfReflectionScore(category),
    };
  });

  const goalKpiAverage =
    categoryScores.reduce((sum, score) => {
      return sum + (score.goalKpiScore ?? score.selfReflectionScore);
    }, 0) / categoryScores.length;
  const selfReflectionAverage =
    categoryScores.reduce((sum, score) => sum + score.selfReflectionScore, 0) /
    categoryScores.length;

  return {
    categoryScores,
    overallLifeScore: (goalKpiAverage + selfReflectionAverage) / 2,
  };
}

export function runScoringManualCheck() {
  const year: Year = {
    id: "year_test",
    year: 2026,
    isLocked: false,
    categories: [
      {
        id: "cat_test",
        yearId: "year_test",
        name: "Test Category",
        icon: "test",
        color: "#000000",
        order: 1,
        selfReflectionScore: 6,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ],
    goals: [
      {
        id: "goal_metric",
        yearId: "year_test",
        categoryId: "cat_test",
        title: "Reach 100",
        goalType: "metric",
        priority: "high",
        status: "in_progress",
        hasDeadline: false,
        deadlineDate: null,
        countsTowardScore: true,
        trackingConfig: {
          type: "metric",
          unit: "points",
          direction: "increase",
          startingValue: 0,
          targetValue: 100,
          currentValue: 50,
        },
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        completedAt: null,
        archivedAt: null,
      },
    ],
    milestones: [],
    progressUpdates: [],
    snapshots: [],
    yearEndReview: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };

  const metricProgressResult = calculateGoalProgress(year.goals[0], year);
  const categoryScoreResult = calculateCategoryGoalKpiScore(year.categories[0], year);
  const yearScoreResult = calculateYearScores(year);

  return {
    metricProgressPasses: metricProgressResult === 0.5,
    categoryScorePasses: categoryScoreResult === 5,
    overallScorePasses: yearScoreResult.overallLifeScore === 5.5,
  };
}

function metricProgress(goal: Goal, currentValue: number) {
  if (goal.trackingConfig.type !== "metric") {
    return 0;
  }

  const { direction, startingValue, targetValue } = goal.trackingConfig;

  if (direction === "increase") {
    if (startingValue === null) {
      return targetValue === 0 ? 0 : clamp(currentValue / targetValue);
    }

    return targetValue === startingValue
      ? 0
      : clamp((currentValue - startingValue) / (targetValue - startingValue));
  }

  if (startingValue === null || startingValue === targetValue) {
    return 0;
  }

  return clamp((startingValue - currentValue) / (startingValue - targetValue));
}

function getLatestNumberUpdate(
  goal: Goal,
  progressUpdates: ProgressUpdate[],
  field: "value" | "rating" | "count",
) {
  const latestUpdate = progressUpdates
    .filter(
      (update) => update.goalId === goal.id && update.updateType === goal.goalType && update[field] !== null,
    )
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())[0];

  return latestUpdate?.[field] ?? null;
}
