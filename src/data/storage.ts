import { createInitialAppData, type AppData } from "./model";

const STORAGE_KEY = "life-wheel-goals-app-data";

type StorageLoadResult = {
  appData: AppData;
  status: "loaded" | "seeded" | "recovered";
};

export function loadAppData(): StorageLoadResult {
  const fallbackData = createInitialAppData();

  if (!canUseLocalStorage()) {
    return { appData: fallbackData, status: "seeded" };
  }

  try {
    const savedData = window.localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return { appData: fallbackData, status: "seeded" };
    }

    const parsedData: unknown = JSON.parse(savedData);

    if (!isAppData(parsedData)) {
      return { appData: fallbackData, status: "recovered" };
    }

    return { appData: parsedData, status: "loaded" };
  } catch {
    return { appData: fallbackData, status: "recovered" };
  }
}

export function saveAppData(appData: AppData) {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch {
    // Saving can fail if browser storage is full or blocked. The app should keep running.
  }
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isAppData(value: unknown): value is AppData {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.appVersion === "string" &&
    isSettings(value.settings) &&
    Array.isArray(value.years) &&
    value.years.length > 0 &&
    value.years.every(isYear)
  );
}

function isSettings(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.selectedYear === "number" &&
    typeof value.backupRemindersEnabled === "boolean" &&
    isNullableString(value.lastBackupExportedAt) &&
    isNullableString(value.lastBackupReminderDismissedAt)
  );
}

function isYear(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.year === "number" &&
    typeof value.isLocked === "boolean" &&
    Array.isArray(value.categories) &&
    value.categories.length > 0 &&
    value.categories.every(isCategory) &&
    Array.isArray(value.goals) &&
    Array.isArray(value.milestones) &&
    Array.isArray(value.progressUpdates) &&
    Array.isArray(value.snapshots)
  );
}

function isCategory(value: unknown) {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.yearId === "string" &&
    typeof value.name === "string" &&
    typeof value.icon === "string" &&
    typeof value.color === "string" &&
    typeof value.order === "number" &&
    typeof value.selfReflectionScore === "number"
  );
}

function isNullableString(value: unknown) {
  return value === null || typeof value === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
