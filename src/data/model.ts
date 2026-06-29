export const APP_VERSION = "1.0";

export type GoalType = "metric" | "habit" | "milestone" | "reflection";
export type GoalPriority = "low" | "medium" | "high";
export type GoalStatus = "not_started" | "in_progress" | "paused" | "completed" | "archived";
export type MetricDirection = "increase" | "decrease";
export type HabitTrackingPeriod = "weekly" | "monthly";
export type SnapshotType = "monthly";
export type ProgressUpdateType = GoalType;

export type AppData = {
  appVersion: string;
  settings: Settings;
  years: Year[];
};

export type Settings = {
  selectedYear: number;
  backupRemindersEnabled: boolean;
  lastBackupExportedAt: string | null;
  lastBackupReminderDismissedAt: string | null;
};

export type Year = {
  id: string;
  year: number;
  isLocked: boolean;
  categories: Category[];
  goals: Goal[];
  milestones: Milestone[];
  progressUpdates: ProgressUpdate[];
  snapshots: Snapshot[];
  yearEndReview: YearEndReview | null;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  yearId: string;
  name: string;
  icon: string;
  color: string;
  order: number;
  selfReflectionScore: number;
  createdAt: string;
  updatedAt: string;
};

export type Goal = {
  id: string;
  yearId: string;
  categoryId: string;
  title: string;
  description?: string;
  goalType: GoalType;
  priority: GoalPriority;
  status: GoalStatus;
  hasDeadline: boolean;
  deadlineDate: string | null;
  countsTowardScore: boolean;
  trackingConfig: GoalTrackingConfig;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  archivedAt: string | null;
};

export type GoalTrackingConfig =
  | MetricTrackingConfig
  | HabitTrackingConfig
  | MilestoneTrackingConfig
  | ReflectionTrackingConfig;

export type MetricTrackingConfig = {
  type: "metric";
  unit: string;
  direction: MetricDirection;
  targetValue: number;
  startingValue: number | null;
  currentValue: number | null;
};

export type HabitTrackingConfig = {
  type: "habit";
  targetCount: number;
  trackingPeriod: HabitTrackingPeriod;
};

export type MilestoneTrackingConfig = {
  type: "milestone";
};

export type ReflectionTrackingConfig = {
  type: "reflection";
  startingRating: number;
  targetRating: number;
};

export type Milestone = {
  id: string;
  yearId: string;
  goalId: string;
  title: string;
  targetValue: number | null;
  dueDate: string | null;
  isCompleted: boolean;
  completedAt: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type ProgressUpdate = {
  id: string;
  yearId: string;
  goalId: string;
  updateType: ProgressUpdateType;
  date: string;
  value: number | null;
  rating: number | null;
  count: number | null;
  note: string;
  createdAt: string;
};

export type Snapshot = {
  id: string;
  yearId: string;
  date: string;
  type: SnapshotType;
  overallLifeScore: number;
  categoryScores: SnapshotCategoryScore[];
  createdAt: string;
};

export type SnapshotCategoryScore = {
  categoryId: string;
  goalKpiScore: number | null;
  selfReflectionScore: number;
};

export type YearEndReview = {
  id: string;
  yearId: string;
  completedAt: string | null;
  improvedMost: string;
  feltMostDifficult: string;
  proudOf: string;
  carryForward: string;
  stopPursuing: string;
  createdAt: string;
  updatedAt: string;
};

type DefaultCategorySeed = {
  name: string;
  icon: string;
  color: string;
  selfReflectionScore: number;
};

export const DEFAULT_CATEGORY_SEEDS: DefaultCategorySeed[] = [
  { name: "Health & Energy", icon: "heart-pulse", color: "#2f9e44", selfReflectionScore: 6 },
  { name: "Emotional Wellbeing", icon: "sparkle", color: "#4263eb", selfReflectionScore: 5 },
  {
    name: "Relationships & Connection",
    icon: "users",
    color: "#d6336c",
    selfReflectionScore: 7,
  },
  { name: "Career & Work", icon: "briefcase", color: "#f08c00", selfReflectionScore: 6 },
  { name: "Money & Security", icon: "wallet", color: "#0ca678", selfReflectionScore: 4 },
  { name: "Personal Growth", icon: "book-open", color: "#7048e8", selfReflectionScore: 7 },
  { name: "Home & Environment", icon: "home", color: "#5c940d", selfReflectionScore: 6 },
  { name: "Purpose & Meaning", icon: "compass", color: "#1864ab", selfReflectionScore: 5 },
  { name: "Fun & Recreation", icon: "party-popper", color: "#e67700", selfReflectionScore: 6 },
];

export function createInitialAppData(currentDate = new Date()): AppData {
  const selectedYear = currentDate.getFullYear();

  return {
    appVersion: APP_VERSION,
    settings: {
      selectedYear,
      backupRemindersEnabled: true,
      lastBackupExportedAt: null,
      lastBackupReminderDismissedAt: null,
    },
    years: [createDefaultYear(selectedYear, currentDate)],
  };
}

export function createDefaultYear(year: number, currentDate = new Date()): Year {
  const now = createTimestamp(currentDate);
  const yearId = createYearId(year);

  return {
    id: yearId,
    year,
    isLocked: false,
    categories: DEFAULT_CATEGORY_SEEDS.map((category, index) => ({
      id: createCategoryId(category.name),
      yearId,
      name: category.name,
      icon: category.icon,
      color: category.color,
      order: index + 1,
      selfReflectionScore: category.selfReflectionScore,
      createdAt: now,
      updatedAt: now,
    })),
    goals: [],
    milestones: [],
    progressUpdates: [],
    snapshots: [],
    yearEndReview: null,
    createdAt: now,
    updatedAt: now,
  };
}

export function getSelectedYear(appData: AppData): Year {
  return (
    appData.years.find((year) => year.year === appData.settings.selectedYear) ?? appData.years[0]
  );
}

export function createTimestamp(date = new Date()) {
  return date.toISOString();
}

function createYearId(year: number) {
  return `year_${year}`;
}

function createCategoryId(name: string) {
  return `cat_${name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")}`;
}
