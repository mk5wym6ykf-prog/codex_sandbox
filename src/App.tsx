import { useEffect, useState } from "react";
import { getSelectedYear, type Category, type Year } from "./data/model";
import { calculateYearScores, type CategoryScore } from "./data/scoring";
import { loadAppData, saveAppData } from "./data/storage";
import "./App.css";

type View =
  | "dashboard"
  | "category-detail"
  | "goal-form"
  | "settings"
  | "year-end-review"
  | "import-export";

const viewLabels: Record<View, string> = {
  dashboard: "Dashboard",
  "category-detail": "Category Detail",
  "goal-form": "Goal Form",
  settings: "Settings",
  "year-end-review": "Year-End Review",
  "import-export": "Import/Export",
};

function App() {
  const [storageLoad] = useState(() => loadAppData());
  const [appData] = useState(storageLoad.appData);
  const selectedYear = getSelectedYear(appData);
  const categories = [...selectedYear.categories].sort(
    (first, second) => first.order - second.order,
  );
  const yearScores = calculateYearScores(selectedYear);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);

  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  function openCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);
    setActiveView("category-detail");
  }

  useEffect(() => {
    saveAppData(appData);
  }, [appData]);

  return (
    <div className="app">
      {storageLoad.status === "recovered" && (
        <div className="storage-warning" role="status">
          Saved data could not be loaded, so the app started with fresh default data.
        </div>
      )}
      <header className="app-header">
        <div>
          <p className="eyebrow">{selectedYear.year} planning year</p>
          <h1>Life Wheel Goals</h1>
        </div>
        <nav className="view-nav" aria-label="Main views">
          {(Object.keys(viewLabels) as View[]).map((view) => (
            <button
              className={activeView === view ? "nav-button active" : "nav-button"}
              key={view}
              onClick={() => setActiveView(view)}
              type="button"
            >
              {viewLabels[view]}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activeView === "dashboard" && (
          <Dashboard
            backupRemindersEnabled={appData.settings.backupRemindersEnabled}
            categories={categories}
            hasAnyGoals={selectedYear.goals.length > 0}
            hasCurrentMonthSnapshot={hasCurrentMonthSnapshot(selectedYear)}
            onAddGoal={() => setActiveView("goal-form")}
            onOpenImportExport={() => setActiveView("import-export")}
            onOpenCategory={openCategory}
            selectedYear={selectedYear.year}
            yearScores={yearScores}
          />
        )}
        {activeView === "category-detail" && (
          <CategoryDetail
            category={selectedCategory}
            onBack={() => setActiveView("dashboard")}
            onCreateGoal={() => setActiveView("goal-form")}
          />
        )}
        {activeView === "goal-form" && (
          <GoalForm
            categories={categories}
            selectedCategory={selectedCategory}
            onCancel={() => setActiveView("dashboard")}
            onSave={() => setActiveView("category-detail")}
          />
        )}
        {activeView === "settings" && <Settings />}
        {activeView === "year-end-review" && <YearEndReview />}
        {activeView === "import-export" && <ImportExport />}
      </main>
    </div>
  );
}

function Dashboard({
  backupRemindersEnabled,
  categories,
  hasAnyGoals,
  hasCurrentMonthSnapshot,
  onAddGoal,
  onOpenImportExport,
  onOpenCategory,
  selectedYear,
  yearScores,
}: {
  backupRemindersEnabled: boolean;
  categories: Category[];
  hasAnyGoals: boolean;
  hasCurrentMonthSnapshot: boolean;
  onAddGoal: () => void;
  onOpenImportExport: () => void;
  onOpenCategory: (categoryId: string) => void;
  selectedYear: number;
  yearScores: {
    categoryScores: CategoryScore[];
    overallLifeScore: number;
  };
}) {
  const categoryScoreById = new Map(
    yearScores.categoryScores.map((score) => [score.categoryId, score]),
  );
  const wheelScores = categories.map((category) => {
    const categoryScore = categoryScoreById.get(category.id);

    return {
      category,
      score: categoryScore?.goalKpiScore ?? categoryScore?.selfReflectionScore ?? category.selfReflectionScore,
    };
  });
  const focusCategory = getFocusCategory(categories, yearScores.categoryScores);
  const alsoWatchCategories = getAlsoWatchCategories(categories, yearScores.categoryScores);

  return (
    <section className="view-grid" aria-labelledby="dashboard-title">
      <div className="hero-panel">
        <div className="section-heading">
          <p className="eyebrow">Dashboard</p>
          <div className="dashboard-title-row">
            <h2 id="dashboard-title">Current life wheel</h2>
            <label className="year-control">
              Planning year
              <select aria-label="Selected planning year" disabled value={selectedYear}>
                <option value={selectedYear}>{selectedYear}</option>
              </select>
            </label>
          </div>
          <p className="muted-copy">
            Showing {selectedYear} with {categories.length} default categories.
          </p>
        </div>
        <div className="score-layout">
          <LifeWheelPreview overallScore={yearScores.overallLifeScore} scores={wheelScores} />
          <div className="score-summary">
            <p className="score-label">Overall life score</p>
            <strong>{formatScore(yearScores.overallLifeScore)} / 10</strong>
            <p>Main focus: {focusCategory?.name ?? "No focus yet"}</p>
            <div>
              <p className="score-label">Also watch</p>
              {alsoWatchCategories.length > 0 ? (
                <ul className="watch-list">
                  {alsoWatchCategories.map((category) => (
                    <li key={category.id}>{category.name}</li>
                  ))}
                </ul>
              ) : (
                <p>None yet</p>
              )}
            </div>
          </div>
        </div>
        <label className="search-label" htmlFor="goal-search">
          Search selected year
        </label>
        <input id="goal-search" type="search" placeholder="Search goals, categories, or statuses" />
        {backupRemindersEnabled && (
          <div className="backup-reminder">
            <div>
              <strong>Backup reminder</strong>
              <p>Backups will help keep a copy of your local data when export tools are connected.</p>
            </div>
            <button className="secondary-button" onClick={onOpenImportExport} type="button">
              Review backup options
            </button>
          </div>
        )}
        {!hasCurrentMonthSnapshot && (
          <div className="snapshot-prompt">
            <div>
              <strong>Save this month&apos;s snapshot</strong>
              <p>Snapshot saving will be connected in a later step.</p>
            </div>
            <button className="secondary-button" type="button">
              Save snapshot
            </button>
          </div>
        )}
      </div>

      <div className="content-panel">
        <div className="section-heading row-heading">
          <div>
            <p className="eyebrow">Categories</p>
            <h2>Life areas</h2>
          </div>
          <button className="primary-button" onClick={onAddGoal} type="button">
            Add your first goal
          </button>
        </div>
        {!hasAnyGoals && (
          <div className="empty-state dashboard-empty">
            <h3>No goals yet</h3>
            <p>Start with one goal in one category. You can add more later.</p>
            <button className="primary-button" onClick={onAddGoal} type="button">
              Add your first goal
            </button>
          </div>
        )}
        <div className="category-list">
          {categories.map((category) => (
            <CategoryRow
              category={category}
              categoryScore={categoryScoreById.get(category.id)}
              key={category.id}
              onOpenCategory={onOpenCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LifeWheelPreview({
  overallScore,
  scores,
}: {
  overallScore: number;
  scores: {
    category: Category;
    score: number;
  }[];
}) {
  const center = 150;
  const chartRadius = 72;
  const labelRadius = 117;
  const gradeRadius = 99;
  const segmentRadius = 132;
  const segmentLength = 18;
  const points = scores.map(({ score }, index) => {
    const angle = getWheelAngle(index, scores.length);
    const radius = (Math.max(0, Math.min(score, 10)) / 10) * chartRadius;

    return getWheelPoint(center, center, radius, angle);
  });

  return (
    <div className="wheel-preview" aria-label={`Life wheel score ${formatScore(overallScore)} out of 10`}>
      <svg className="life-wheel" viewBox="0 0 300 300" role="img">
        <title>Life wheel category scores</title>
        <circle className="wheel-outer-track" cx={center} cy={center} r={segmentRadius} />
        <circle className="wheel-chart-boundary" cx={center} cy={center} r={chartRadius} />
        {[0.25, 0.5, 0.75].map((scale) => (
          <circle
            className="wheel-grid-ring"
            cx={center}
            cy={center}
            key={scale}
            r={chartRadius * scale}
          />
        ))}
        {scores.map(({ category, score }, index) => {
          const angle = getWheelAngle(index, scores.length);
          const spokeEnd = getWheelPoint(center, center, chartRadius, angle);
          const labelPoint = getWheelPoint(center, center, labelRadius, angle);
          const gradePoint = getWheelPoint(center, center, gradeRadius, angle);
          const segmentStart = getWheelPoint(center, center, segmentRadius - segmentLength, angle);
          const segmentEnd = getWheelPoint(center, center, segmentRadius, angle);

          return (
            <g key={category.id}>
              <line
                className="wheel-segment"
                stroke={category.color}
                x1={segmentStart.x}
                x2={segmentEnd.x}
                y1={segmentStart.y}
                y2={segmentEnd.y}
              />
              <line className="wheel-spoke" x1={center} x2={spokeEnd.x} y1={center} y2={spokeEnd.y} />
              <text
                className="wheel-label"
                textAnchor="middle"
                transform={`rotate(${angle + 90} ${labelPoint.x} ${labelPoint.y})`}
                x={labelPoint.x}
                y={labelPoint.y}
              >
                {getWheelLabel(category.name)}
              </text>
              <text className="wheel-grade" textAnchor="middle" x={gradePoint.x} y={gradePoint.y}>
                {getScoreGrade(score)}
              </text>
            </g>
          );
        })}
        <polygon className="wheel-score-polygon" points={points.map((point) => `${point.x},${point.y}`).join(" ")} />
        {points.map((point, index) => (
          <circle className="wheel-score-point" cx={point.x} cy={point.y} key={scores[index].category.id} r="3" />
        ))}
        <line className="wheel-center-line" x1={center} x2={center} y1={center - chartRadius} y2={center + chartRadius} />
        <text className="wheel-center-score" textAnchor="middle" x={center} y={center + 6}>
          {formatScore(overallScore)}
        </text>
      </svg>
    </div>
  );
}

function CategoryRow({
  category,
  categoryScore,
  onOpenCategory,
}: {
  category: Category;
  categoryScore?: CategoryScore;
  onOpenCategory: (categoryId: string) => void;
}) {
  const goalScoreLabel =
    categoryScore?.goalKpiScore === null || categoryScore === undefined
      ? "No goals yet"
      : `${formatScore(categoryScore.goalKpiScore)}/10`;

  return (
    <button
      className="category-row"
      key={category.id}
      onClick={() => onOpenCategory(category.id)}
      type="button"
    >
      <span className="color-dot" style={{ backgroundColor: category.color }} />
      <span>
        <strong>
          <span aria-hidden="true" className="category-icon">
            {category.icon}
          </span>
          {category.name}
        </strong>
        <small>Goal/KPI {goalScoreLabel}</small>
      </span>
      <span className="category-score">
        Reflection{" "}
        <strong>{formatScore(categoryScore?.selfReflectionScore ?? category.selfReflectionScore)}/10</strong>
      </span>
    </button>
  );
}

function formatScore(score: number) {
  return score.toFixed(1);
}

function getWheelAngle(index: number, total: number) {
  return (360 / total) * index - 90;
}

function getWheelPoint(centerX: number, centerY: number, radius: number, angleDegrees: number) {
  const angleRadians = (angleDegrees * Math.PI) / 180;

  return {
    x: centerX + radius * Math.cos(angleRadians),
    y: centerY + radius * Math.sin(angleRadians),
  };
}

function getWheelLabel(name: string) {
  return name
    .split(" ")
    .filter((word) => word !== "&")
    .slice(0, 2)
    .map((word) => word.slice(0, 4).toUpperCase())
    .join(" ");
}

function getScoreGrade(score: number) {
  if (score >= 8.5) {
    return "A";
  }

  if (score >= 7) {
    return "B";
  }

  if (score >= 5.5) {
    return "C";
  }

  if (score >= 4) {
    return "D";
  }

  return "E";
}

function getFocusCategory(categories: Category[], categoryScores: CategoryScore[]) {
  return sortCategoriesByScore(categories, categoryScores)[0];
}

function getAlsoWatchCategories(categories: Category[], categoryScores: CategoryScore[]) {
  return sortCategoriesByScore(categories, categoryScores).slice(1, 3);
}

function sortCategoriesByScore(categories: Category[], categoryScores: CategoryScore[]) {
  const categoryScoreById = new Map(
    categoryScores.map((score) => [score.categoryId, score.goalKpiScore ?? score.selfReflectionScore]),
  );

  return [...categories].sort((first, second) => {
    return (categoryScoreById.get(first.id) ?? 10) - (categoryScoreById.get(second.id) ?? 10);
  });
}

function hasCurrentMonthSnapshot(year: Year, currentDate = new Date()) {
  const currentMonthKey = currentDate.toISOString().slice(0, 7);

  return year.snapshots.some((snapshot) => {
    return snapshot.type === "monthly" && snapshot.date.slice(0, 7) === currentMonthKey;
  });
}

function CategoryDetail({
  category,
  onBack,
  onCreateGoal,
}: {
  category: Category;
  onBack: () => void;
  onCreateGoal: () => void;
}) {
  return (
    <section className="single-view" aria-labelledby="category-title">
      <button className="text-button" onClick={onBack} type="button">
        Back to Dashboard
      </button>
      <div className="content-panel">
        <div className="section-heading">
          <p className="eyebrow">Category Detail</p>
          <h2 id="category-title">
            <span aria-hidden="true" className="category-icon large">
              {category.icon}
            </span>
            {category.name}
          </h2>
        </div>
        <div className="stats-grid">
          <Stat label="Goal/KPI score" value="No goals yet" />
          <Stat label="Self-reflection" value={`${category.selfReflectionScore}/10`} />
          <Stat label="Focus reason" value="Low category score" />
        </div>
        <div className="empty-state">
          <h3>No goals yet</h3>
          <p>This category is ready for its first goal.</p>
          <button className="primary-button" onClick={onCreateGoal} type="button">
            Create goal
          </button>
        </div>
      </div>
    </section>
  );
}

function GoalForm({
  categories,
  selectedCategory,
  onCancel,
  onSave,
}: {
  categories: Category[];
  selectedCategory: Category;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <section className="single-view" aria-labelledby="goal-form-title">
      <div className="content-panel">
        <div className="section-heading">
          <p className="eyebrow">Goal Form</p>
          <h2 id="goal-form-title">Create a goal</h2>
        </div>
        <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
          <label>
            Category
            <select defaultValue={selectedCategory.id}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Goal type
            <select defaultValue="metric">
              <option value="metric">Metric</option>
              <option value="habit">Habit</option>
              <option value="milestone">Milestone</option>
              <option value="reflection">Reflection</option>
            </select>
          </label>
          <label className="full-span">
            Goal title
            <input type="text" placeholder="Reach $10,000 net worth" />
          </label>
          <div className="form-actions full-span">
            <button className="secondary-button" onClick={onCancel} type="button">
              Cancel
            </button>
            <button className="primary-button" onClick={onSave} type="button">
              Save draft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Settings() {
  return (
    <section className="single-view" aria-labelledby="settings-title">
      <div className="content-panel">
        <div className="section-heading">
          <p className="eyebrow">Settings</p>
          <h2 id="settings-title">Planning controls</h2>
        </div>
        <div className="settings-list">
          <Stat label="Categories" value="Rename, add, delete, reorder" />
          <Stat label="Years" value="Create, switch, unlock past years" />
          <Stat label="Backup reminders" value="On" />
          <Stat label="Danger Zone" value="Clear local data with confirmation" />
        </div>
      </div>
    </section>
  );
}

function YearEndReview() {
  return (
    <section className="single-view" aria-labelledby="review-title">
      <div className="content-panel">
        <div className="section-heading">
          <p className="eyebrow">Year-End Review</p>
          <h2 id="review-title">Review the year</h2>
        </div>
        <div className="prompt-list">
          <p>What improved most this year?</p>
          <p>What felt most difficult?</p>
          <p>What are you proud of?</p>
          <p>What do you want to carry forward?</p>
          <p>What do you want to stop pursuing?</p>
        </div>
      </div>
    </section>
  );
}

function ImportExport() {
  return (
    <section className="single-view" aria-labelledby="import-export-title">
      <div className="content-panel">
        <div className="section-heading">
          <p className="eyebrow">Import/Export</p>
          <h2 id="import-export-title">Local data</h2>
        </div>
        <p>Your data is stored on this device. Export a backup to keep a copy.</p>
        <div className="form-actions">
          <button className="secondary-button" type="button">
            Export JSON
          </button>
          <button className="secondary-button" type="button">
            Import JSON
          </button>
          <button className="secondary-button" type="button">
            Export CSV
          </button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
