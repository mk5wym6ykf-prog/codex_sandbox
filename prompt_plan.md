# Life Wheel Goals App Prompt Plan

This plan is based on `spec.md`. It is designed for incremental implementation by a code-generation LLM, with each prompt building on the previous one and wiring new work into the app as it goes.

## Assumption

Use a beginner-friendly modern web stack:

- Vite
- React
- TypeScript
- Local browser storage
- Plain CSS
- SVG for the life wheel

V1 should not include a backend, login, cloud sync, AI coaching, native mobile app, PWA setup, or deployment automation.

## Build Blueprint

1. Create the app foundation: project setup, views, shared layout, and simple styling.
2. Define the data model: years, categories, goals, milestones, progress updates, snapshots, and settings.
3. Add local storage: load data on startup, save after changes, and seed default categories.
4. Build scoring logic: goal progress, category scores, and overall life score.
5. Build the dashboard: selected year, search, overall score, wheel, category list, and focus category.
6. Build category detail: grouped goals, quick updates, self-reflection score, and wins section.
7. Build goal creation/editing: category, type, core fields, type-specific fields, and milestone suggestions.
8. Add milestone management: add, edit, reorder, complete, and preserve completed history.
9. Add search across the selected year.
10. Add settings for categories, years, backup reminders, and danger zone.
11. Add import/export: JSON backup/restore, CSV summary, and validation before replacement.
12. Add year-end review and rollover: lock past years, carry unfinished goals, and reset progress.
13. Polish: responsive layout, accessibility basics, empty/error states, and manual testing.

## First Chunk Breakdown

1. App skeleton and navigation.
2. Data types and default seed data.
3. Local storage persistence.
4. Scoring utilities with sample checks or tests.
5. Dashboard without editing features.
6. SVG wheel wired to category data.
7. Category detail read view.
8. Goal create flow for one simple type.
9. Expand goal flow to all four goal types.
10. Add progress update controls.
11. Add milestones and suggestions.
12. Add search.
13. Add settings for categories.
14. Add years and rollover.
15. Add import/export.
16. Add archive/delete/clear confirmations.
17. Add year-end review.
18. Final QA and polish.

## Refined Implementation Steps

These steps are small enough to implement safely, but each one still moves the project forward.

## Prompt 1: Project Foundation

```text
Read spec.md and AGENTS.md first. Build the initial app foundation for the Life Wheel Goals App using Vite, React, and TypeScript if no app already exists.

Create a single-page app with these views wired through simple local state, not a router dependency unless one already exists:
- Dashboard
- Category Detail
- Goal Form
- Settings
- Year-End Review
- Import/Export

Add a clean light-mode layout and responsive CSS. The app should open directly to Dashboard. Do not add backend code, login, cloud sync, AI features, or deployment config.

Before editing, check git status and explain the files you will change. Keep the change small and reversible. After editing, run the available build or type-check command.
```

## Prompt 2: Data Model And Defaults

```text
Add the core TypeScript data model for the Life Wheel Goals App.

Include types for:
- AppData
- Settings
- Year
- Category
- Goal
- Milestone
- ProgressUpdate
- Snapshot
- YearEndReview if useful now

Add default categories from spec.md with unique colors and icons. Add helper functions to create a fresh default year for the current calendar year.

Wire the Dashboard to display the selected year and default categories from this model. No editing UI yet. Keep all code integrated with the existing app.
```

## Prompt 3: Local Storage Persistence

```text
Add local browser storage for the app data.

Requirements:
- On first launch, seed default app data.
- On later launches, load saved data.
- Save data after user-facing changes.
- Include an appVersion field.
- If saved data is missing or invalid, fall back safely to default data without crashing.

Add a small storage utility module and wire it into the app state. Do not implement import/export yet.
```

## Prompt 4: Scoring Engine

```text
Implement the scoring rules from spec.md as pure utility functions.

Include:
- Metric goal progress
- Habit goal progress
- Milestone goal progress
- Reflection goal progress
- Priority weighting
- Category goal/KPI score
- Category self-reflection score
- Overall life score with fallback behavior

Add focused tests if the project has a test setup. If not, add a small manual sample-data check function or documented verification path without adding a new dependency unless approved.

Wire the Dashboard to show the calculated overall life score and category scores.
```

## Prompt 5: Dashboard And Accessible Category List

```text
Build the Dashboard view.

It should show:
- Selected year
- Search input placeholder, even if search is not fully implemented yet
- Overall life score
- Main focus category
- Optional also-watch list
- Category list with category name, icon, goal/KPI score, self-reflection score, and no-goals state
- Empty state button: Add your first goal
- Monthly snapshot prompt placeholder if no current-month snapshot exists

Clicking a category should open Category Detail. Clicking Add your first goal should open Goal Form.
```

## Prompt 6: Two-Ring Life Wheel

```text
Add the two-ring life wheel to the Dashboard using accessible SVG.

Requirements:
- One slice per active category
- Outer ring represents goal/KPI score
- Inner ring represents self-reflection score
- Categories with no goals show a light no-goals outer state
- Wheel slices are clickable/tappable and open Category Detail
- The category list must still contain the same information for accessibility

Keep colors from the fixed category palette. Do not use color as the only status indicator.
```

## Prompt 7: Category Detail View

```text
Build the Category Detail view.

It should show:
- Category name, icon, and color
- Goal/KPI score
- Self-reflection score
- Short focus reason if applicable
- Active goals first
- Paused goals second
- Completed goals in a collapsed Wins section
- Archived goals hidden unless the user chooses to show them
- Clear no-goals state

Add simple navigation back to Dashboard. Do not build full quick-update controls yet; add integrated placeholders only where the controls will go.
```

## Prompt 8: Goal Creation For Metric Goals

```text
Implement the first real Goal Form path for metric goals.

Flow:
1. Choose category
2. Choose goal type
3. Fill goal details
4. Save

For this step, fully support metric goals only:
- title required
- optional description
- priority
- status
- deadline or no deadline
- unit
- direction increase/decrease
- target value
- starting value rules from spec.md
- current value optional

After saving, return to the relevant Category Detail and show the new goal. If progress is logged, allow status to move from not_started to in_progress.
```

## Prompt 9: Add Habit, Milestone, And Reflection Goals

```text
Expand the Goal Form to support all four goal types:
- metric
- habit
- milestone
- reflection

Add validation rules from spec.md:
- habit requires target count and tracking period
- reflection requires starting and target ratings from 1-10
- milestone goals can start with user-created milestones
- no-deadline goals default to low priority but can be changed

Make sure every saved goal appears correctly in Category Detail and contributes to scoring.
```

## Prompt 10: Progress Updates And Quick Controls

```text
Add quick update controls in Category Detail for each goal type.

Requirements:
- Metric: log latest value and save progress history
- Habit: log count for a completed weekly/monthly period
- Milestone: mark milestones complete
- Reflection: add check-in rating and optional note

When a goal reaches 100%, ask the user to choose:
- Mark completed
- Increase target
- Keep tracking

If Increase target is chosen for a metric goal, preserve the old target as a completed milestone.
```

## Prompt 11: Milestone Management And Suggestions

```text
Add milestone management.

Requirements:
- Add, edit, delete, and reorder incomplete milestones
- Preserve completed milestones
- Editing a completed milestone requires confirmation
- Store completedAt when completed
- Metric goals suggest 25%, 50%, 75%, and 100% milestones
- Habit and reflection goals get simple useful suggestions
- Suggestions are editable, deletable, and only saved when the user saves them

No subtasks in V1.
```

## Prompt 12: Search

```text
Implement search for the selected year only.

Search should match:
- Goal titles
- Goal descriptions
- Category names
- Statuses
- Milestone titles
- Progress/update notes where applicable

Show search results on Dashboard. Clicking a result should open the matching Category Detail and highlight or scroll to the matching goal when practical. Add a no-results state.
```

## Prompt 13: Category Settings

```text
Build Settings > Categories.

Support:
- Rename category
- Add category
- Delete category
- Reorder categories
- Choose from fixed colors
- Choose from fixed icons

Rules:
- Category names required and unique within a year
- Colors and icons should be unique across active categories
- New categories auto-assign next unused color and icon
- Deleting a category with goals/history is blocked until goals are moved, archived, or deleted
```

## Prompt 14: Years And Rollover

```text
Build Settings > Years.

Support:
- Select year
- Create new year
- View past years
- Past years are read-only by default
- Unlock past-year editing with confirmation

When creating a new year:
- Copy categories from the previous year
- Copy unfinished goals
- Reset progress for the new year
- Lock the previous year by default

Keep all copied records linked to the new year with new stable IDs.
```

## Prompt 15: Import, Export, CSV, And Backup Reminders

```text
Build Settings > Data and Import/Export.

Support:
- Export full JSON backup
- Import full JSON backup
- Validate import before replacing current data
- Reject invalid file type, malformed JSON, or missing required fields
- Export one human-readable CSV summary
- Show last backup date or "No backup exported yet"

Add backup reminder banners:
- Monthly if no export in 30 days
- After major changes if no export in 7 days
- Dismissible, not blocking
```

## Prompt 16: Archive, Delete, And Danger Zone

```text
Implement archive/delete behavior.

Goal archive:
- Ask whether the goal should still count toward this year's score
- Default yes
- Optional reason/note if simple to add

Goal delete:
- Confirm permanent deletion
- Suggest archiving instead

Danger Zone:
- Clear all local data
- Confirm first
- Recommend exporting a backup
- Warn if no recent backup exists
- Do not require typing a phrase
```

## Prompt 17: Year-End Review

```text
Build the Year-End Review view.

Show:
- Beginning/final/target category scores if snapshot data exists
- Completed goals
- Incomplete goals
- Completed milestones
- Goals eligible to carry into next year
- Reflection prompts from spec.md

For unfinished goals, allow:
- Carry into next year
- Archive
- Delete permanently with confirmation

Wire this into Settings > Years and new-year creation.
```

## Prompt 18: Final Integration And QA

```text
Do a final V1 integration pass.

Check:
- No orphaned views, utilities, or unused major UI paths
- Dashboard, Category Detail, Goal Form, Settings, Import/Export, and Year-End Review are connected
- Responsive layout works on desktop and mobile widths
- No horizontal scrolling on mobile
- Buttons and inputs have clear labels
- Keyboard navigation reaches main actions
- Colors are not the only status indicator
- Empty and error states from spec.md are present

Run the available build/type-check/tests. Then provide a beginner-friendly summary of what changed, how to test it manually, and any remaining V1 gaps.
```

## Smallest Safe Starting Point

Start with Prompt 1 only. It creates the container the rest of the app can safely attach to.

The key concept is "foundation first": before building features, make sure the app has a stable place for screens, state, and styling to live.
