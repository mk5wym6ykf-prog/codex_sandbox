import { useEffect, useState } from "react";
import { getSelectedYear, type Category } from "./data/model";
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
            categories={categories}
            onAddGoal={() => setActiveView("goal-form")}
            onOpenCategory={openCategory}
            selectedYear={selectedYear.year}
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
  categories,
  onAddGoal,
  onOpenCategory,
  selectedYear,
}: {
  categories: Category[];
  onAddGoal: () => void;
  onOpenCategory: (categoryId: string) => void;
  selectedYear: number;
}) {
  return (
    <section className="view-grid" aria-labelledby="dashboard-title">
      <div className="hero-panel">
        <div className="section-heading">
          <p className="eyebrow">Dashboard</p>
          <h2 id="dashboard-title">Current life wheel</h2>
          <p className="muted-copy">
            Showing {selectedYear} with {categories.length} default categories.
          </p>
        </div>
        <div className="score-layout">
          <div className="wheel-preview" aria-label="Two-ring life wheel preview">
            <div className="wheel-ring outer-ring">
              <div className="wheel-ring inner-ring">
                <span>5.8</span>
              </div>
            </div>
          </div>
          <div className="score-summary">
            <p className="score-label">Overall life score</p>
            <strong>5.8 / 10</strong>
            <p>Main focus: Money & Security</p>
            <p>Also watch: Emotional Wellbeing, Purpose & Meaning</p>
          </div>
        </div>
        <label className="search-label" htmlFor="goal-search">
          Search selected year
        </label>
        <input id="goal-search" type="search" placeholder="Search goals, categories, or statuses" />
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
        <div className="category-list">
          {categories.map((category) => (
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
                <small>No goals yet</small>
              </span>
              <span className="category-score">
                Reflection <strong>{category.selfReflectionScore}/10</strong>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
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
