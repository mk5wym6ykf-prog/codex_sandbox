# Life Wheel Goals App Todo Checklist

Use this checklist alongside `spec.md` and `prompt_plan.md`.

The goal is to build V1 in small, safe steps. Each section should leave the app in a working state before moving on.

## 0. Project Safety

- [x] Read `AGENTS.md`.
- [x] Read `spec.md`.
- [x] Read `prompt_plan.md`.
- [x] Check Git status before making changes.
- [x] Note any existing uncommitted or untracked files.
- [x] Avoid committing unless explicitly requested.
- [x] Avoid pushing unless explicitly requested.
- [x] Avoid deleting files unless explicitly approved.
- [x] Avoid installing packages unless explicitly approved.
- [x] Keep each change small and reversible.
- [x] Run available checks after each meaningful step.

## 0.5 Git Checkpoints

- [x] Commit initial app foundation: `9931dbb`.
- [x] Commit npm lockfile: `7cf1d50`.
- [x] Commit core app data model: `3232da6`.
- [x] Push recent commits to `origin/main`.
- [ ] Decide whether to commit `todo.md` updates.
- [ ] Add `.gitignore` for local generated files like `node_modules/`, `.pnpm-store/`, `.DS_Store`, and `dist/`.

## 1. Project Foundation

- [x] Choose the app stack: Vite + React + TypeScript.
- [x] Confirm whether a frontend app already exists.
- [x] Note that no frontend app files exist yet.
- [x] If no app exists, create a Vite + React + TypeScript app.
- [x] Confirm the app runs locally. Vite dev server started at `http://127.0.0.1:5173/`; sandboxed `curl` could not connect.
- [x] Add a simple app shell.
- [x] Add a light-mode visual style.
- [x] Add responsive page structure.
- [x] Add a simple in-app view state.
- [x] Add Dashboard view placeholder.
- [x] Add Category Detail view placeholder.
- [x] Add Goal Form view placeholder.
- [x] Add Settings view placeholder.
- [x] Add Year-End Review view placeholder.
- [x] Add Import/Export view placeholder.
- [x] Add basic navigation between views.
- [x] Make Dashboard the first screen.
- [x] Confirm there is no login screen.
- [x] Confirm there is no backend code.
- [x] Confirm there is no cloud sync.
- [x] Confirm there is no AI coaching feature.
- [x] Run build or type-check. `npm run build` passed.

## 2. Data Model

- [x] Create shared app data types.
- [x] Add `AppData` type.
- [x] Add `Settings` type.
- [x] Add `Year` type.
- [x] Add `Category` type.
- [x] Add `Goal` type.
- [x] Add `Milestone` type.
- [x] Add `ProgressUpdate` type.
- [x] Add `Snapshot` type.
- [x] Add `YearEndReview` type if useful.
- [x] Add goal status options.
- [x] Add goal priority options.
- [x] Add goal type options.
- [x] Add habit tracking period options.
- [x] Add metric direction options.
- [x] Add stable ID helper.
- [ ] Add timestamp helper.
- [x] Add app version constant.
- [x] Add default color palette.
- [x] Add default icon set.
- [x] Add default categories from the spec.
- [x] Ensure default category names are unique.
- [x] Ensure default colors are unique.
- [x] Ensure default icons are unique.
- [x] Add helper to create a new year.
- [x] Add helper to create first-launch app data.
- [x] Wire Dashboard to display selected year.
- [x] Wire Dashboard to display categories from data.
- [x] Run build or type-check. `npm run build` passed.

## 3. Local Storage

- [ ] Create storage utility module.
- [ ] Add local storage key constant.
- [ ] Load saved data on app startup.
- [ ] Seed default data when no saved data exists.
- [ ] Save data after user-facing changes.
- [ ] Validate basic saved data shape before using it.
- [ ] Fall back safely if saved data is broken.
- [ ] Avoid crashing on malformed local storage data.
- [ ] Preserve `appVersion`.
- [ ] Preserve `settings`.
- [ ] Preserve all years.
- [ ] Add a beginner-friendly error fallback if data cannot load.
- [ ] Manually test first launch.
- [ ] Manually test refresh keeps data.
- [ ] Run build or type-check.

## 4. Scoring Engine

- [ ] Create scoring utility module.
- [ ] Add clamp helper.
- [ ] Add priority weight helper.
- [ ] Calculate metric goal progress for increasing goals with starting value.
- [ ] Calculate metric goal progress for increasing goals without starting value.
- [ ] Calculate metric goal progress for decreasing goals.
- [ ] Clamp metric progress between 0 and 1.
- [ ] Calculate habit period progress.
- [ ] Ignore future habit periods.
- [ ] Average completed habit periods only.
- [ ] Return 0 when a habit has no completed periods.
- [ ] Calculate milestone goal progress.
- [ ] Return 0 when a milestone goal has no milestones.
- [ ] Calculate reflection goal progress.
- [ ] Return 0 when reflection target equals starting rating.
- [ ] Calculate completed goals as 100%.
- [ ] Count paused goals based on effort so far.
- [ ] Include archived goals only when `countsTowardScore` is true.
- [ ] Ensure overdue goals do not reduce score.
- [ ] Calculate category goal/KPI score using priority weights.
- [ ] Return no goal/KPI score when a category has no scoring goals.
- [ ] Use self-reflection fallback for overall score.
- [ ] Calculate overall life score with equal ring weighting.
- [ ] Add sample data checks or tests.
- [ ] Wire Dashboard score display to scoring utilities.
- [ ] Run build or type-check.

## 5. Dashboard

- [ ] Show selected year.
- [ ] Add year selector placeholder or control.
- [ ] Add search input.
- [ ] Show overall life score.
- [ ] Show two-ring wheel placeholder if wheel is not built yet.
- [ ] Show main focus category.
- [ ] Show up to two also-watch categories.
- [ ] Show category list.
- [ ] Show each category name.
- [ ] Show each category icon.
- [ ] Show each category color.
- [ ] Show each category goal/KPI score.
- [ ] Show each category self-reflection score.
- [ ] Show no-goals state for categories without goals.
- [ ] Show empty state when no goals exist.
- [ ] Add "Add your first goal" button.
- [ ] Add monthly snapshot prompt if needed.
- [ ] Add backup reminder banner placeholder if needed.
- [ ] Make category list items clickable.
- [ ] Open Category Detail when a category is clicked.
- [ ] Open Goal Form when "Add your first goal" is clicked.
- [ ] Confirm mobile layout stacks cleanly.
- [ ] Run build or type-check.

## 6. Two-Ring Life Wheel

- [ ] Create wheel component.
- [ ] Use SVG for the wheel.
- [ ] Render one slice per category.
- [ ] Render outer ring for goal/KPI score.
- [ ] Render inner ring for self-reflection score.
- [ ] Show light no-goals state in outer ring when needed.
- [ ] Use fixed category colors.
- [ ] Make slices clickable.
- [ ] Make slices keyboard accessible if practical.
- [ ] Add accessible labels for wheel slices.
- [ ] Ensure category list duplicates key wheel information.
- [ ] Avoid using color as the only indicator.
- [ ] Confirm wheel works with 9 default categories.
- [ ] Confirm wheel works after categories are reordered.
- [ ] Confirm wheel works on mobile width.
- [ ] Confirm wheel does not cause horizontal scrolling.
- [ ] Run build or type-check.

## 7. Category Detail

- [ ] Show category name.
- [ ] Show category icon.
- [ ] Show category color.
- [ ] Show goal/KPI score.
- [ ] Show self-reflection score.
- [ ] Allow editing self-reflection score if this step includes it.
- [ ] Show short focus reason when applicable.
- [ ] List active goals first.
- [ ] List paused goals after active goals.
- [ ] Put completed goals in collapsed Wins section.
- [ ] Hide archived goals by default.
- [ ] Add toggle to show archived goals.
- [ ] Show no-goals state.
- [ ] Add button to create a goal in this category.
- [ ] Add simple back navigation to Dashboard.
- [ ] Add placeholders for quick update controls if not built yet.
- [ ] Confirm read-only behavior can be shown for locked past years later.
- [ ] Run build or type-check.

## 8. Metric Goal Creation

- [ ] Build Goal Form flow.
- [ ] Step 1: choose category.
- [ ] Step 2: choose goal type.
- [ ] Step 3: fill goal details.
- [ ] Step 4: save.
- [ ] Fully support metric goal creation.
- [ ] Require goal title.
- [ ] Add optional description.
- [ ] Add priority selection.
- [ ] Add status selection.
- [ ] Add deadline toggle.
- [ ] Require deadline date unless no deadline is selected.
- [ ] Default no-deadline goals to low priority.
- [ ] Allow no-deadline priority to be changed.
- [ ] Add unit label field.
- [ ] Add direction field.
- [ ] Add target value field.
- [ ] Require target value.
- [ ] Add starting value field.
- [ ] Require starting value for decreasing metric goals.
- [ ] Allow blank starting value for increasing metric goals.
- [ ] Add current value field.
- [ ] Save metric tracking config.
- [ ] Save progress update if current value is provided.
- [ ] Move not-started goal to in-progress when progress is logged.
- [ ] Return to Category Detail after save.
- [ ] Show new goal in Category Detail.
- [ ] Update dashboard scoring after save.
- [ ] Run build or type-check.

## 9. All Goal Types

- [ ] Add habit goal form fields.
- [ ] Require habit target count.
- [ ] Default habit period to monthly.
- [ ] Allow weekly habit tracking.
- [ ] Add habit count updates structure.
- [ ] Add optional day checkoff structure if included.
- [ ] Add milestone goal form fields.
- [ ] Allow user-created milestones.
- [ ] Save milestone order.
- [ ] Add reflection goal form fields.
- [ ] Require starting rating from 1 to 10.
- [ ] Require target rating from 1 to 10.
- [ ] Add reflection check-in structure.
- [ ] Add optional note support.
- [ ] Validate all goal types before save.
- [ ] Show correct goal summary for each type.
- [ ] Ensure each goal type contributes to scoring.
- [ ] Ensure each goal belongs to exactly one category.
- [ ] Warn when category has more than 3 active goals.
- [ ] Do not block user from adding more than 3 active goals.
- [ ] Run build or type-check.

## 10. Progress Updates

- [ ] Add metric quick update control.
- [ ] Save metric value update history.
- [ ] Add habit quick update control.
- [ ] Save habit count by completed period.
- [ ] Add milestone completion control.
- [ ] Save milestone `completedAt`.
- [ ] Add reflection check-in control.
- [ ] Save reflection rating.
- [ ] Save optional reflection note.
- [ ] Recalculate goal progress after update.
- [ ] Recalculate category score after update.
- [ ] Recalculate overall score after update.
- [ ] Move not-started goal to in-progress when progress is logged.
- [ ] Detect when a goal reaches 100%.
- [ ] Ask before marking 100% goal complete.
- [ ] Offer "Mark completed".
- [ ] Offer "Increase target".
- [ ] Offer "Keep tracking".
- [ ] Set `completedAt` when goal is completed.
- [ ] For metric target increase, preserve old target as completed milestone.
- [ ] Run build or type-check.

## 11. Milestone Management

- [ ] Show milestones under relevant goals.
- [ ] Add milestone.
- [ ] Edit incomplete milestone.
- [ ] Delete incomplete milestone.
- [ ] Reorder incomplete milestones.
- [ ] Complete milestone.
- [ ] Preserve completed milestone history.
- [ ] Require confirmation before editing completed milestone.
- [ ] Save milestone completion date.
- [ ] Prevent subtasks under milestones.
- [ ] Suggest metric milestones at 25%.
- [ ] Suggest metric milestones at 50%.
- [ ] Suggest metric milestones at 75%.
- [ ] Suggest metric milestones at 100%.
- [ ] Suggest simple habit milestones.
- [ ] Suggest simple reflection check-in milestones.
- [ ] Let user edit suggested milestones.
- [ ] Let user delete suggested milestones.
- [ ] Save suggestions only when user saves them.
- [ ] Regenerate suggestions if goal details change and user asks.
- [ ] Run build or type-check.

## 12. Search

- [ ] Search only within selected year.
- [ ] Search goal titles.
- [ ] Search goal descriptions.
- [ ] Search category names.
- [ ] Search goal statuses.
- [ ] Search milestone titles.
- [ ] Search progress update notes.
- [ ] Search reflection notes.
- [ ] Show results on Dashboard.
- [ ] Show no-results state.
- [ ] Open Category Detail from a result.
- [ ] Highlight matching goal when practical.
- [ ] Scroll to matching goal when practical.
- [ ] Clear result highlight after navigation or after a short time.
- [ ] Confirm search works with empty query.
- [ ] Confirm search works on mobile.
- [ ] Run build or type-check.

## 13. Category Settings

- [ ] Add Settings navigation.
- [ ] Add Categories settings section.
- [ ] Rename category.
- [ ] Validate category name is required.
- [ ] Validate category names are unique within a year.
- [ ] Add category.
- [ ] Auto-assign next unused color.
- [ ] Auto-assign next unused icon.
- [ ] Delete category with no goals/history after confirmation.
- [ ] Block deletion when category has goals/history.
- [ ] Explain that goals must be moved, archived, or deleted first.
- [ ] Reorder categories.
- [ ] Choose fixed color.
- [ ] Choose fixed icon.
- [ ] Warn or prevent duplicate colors/icons.
- [ ] Update wheel after category edits.
- [ ] Update category list after category edits.
- [ ] Mark category changes as major changes for backup reminders.
- [ ] Run build or type-check.

## 14. Years And Rollover

- [ ] Add Years settings section.
- [ ] Select year.
- [ ] Create new year.
- [ ] View past years.
- [ ] Lock past years by default.
- [ ] Show read-only notice for locked years.
- [ ] Unlock past-year editing with confirmation.
- [ ] Confirm message: "Editing a past year may change your historical records."
- [ ] Copy categories from previous year when creating a new year.
- [ ] Copy unfinished goals into new year.
- [ ] Reset progress for copied goals.
- [ ] Create new IDs for copied records.
- [ ] Keep old year data unchanged.
- [ ] Lock previous year by default.
- [ ] Treat new year as fresh start.
- [ ] Preserve completed/archived goals in previous year.
- [ ] Run build or type-check.

## 15. Snapshots

- [ ] Detect whether current month has a snapshot.
- [ ] Show lightweight monthly snapshot prompt if needed.
- [ ] Text: "Save this month's snapshot".
- [ ] Save current category scores.
- [ ] Save current wheel state.
- [ ] Save overall life score.
- [ ] Store snapshot date.
- [ ] Store snapshot type as monthly.
- [ ] Do not build complex history dashboard.
- [ ] Mark snapshot completion as major change for backup reminder.
- [ ] Confirm snapshot appears in data export later.
- [ ] Run build or type-check.

## 16. Import And Export

- [ ] Add Import/Export view or Settings section.
- [ ] Show privacy message: "Your data is stored on this device. Export a backup to keep a copy."
- [ ] Export full JSON backup.
- [ ] Include app version in JSON.
- [ ] Include export timestamp in JSON.
- [ ] Include settings in JSON.
- [ ] Include all years in JSON.
- [ ] Include categories in JSON.
- [ ] Include goals in JSON.
- [ ] Include milestones in JSON.
- [ ] Include progress updates in JSON.
- [ ] Include snapshots in JSON.
- [ ] Include year-end reviews in JSON.
- [ ] Update `lastBackupExportedAt` after export.
- [ ] Show last backup date.
- [ ] Show "No backup exported yet" when applicable.
- [ ] Import JSON backup.
- [ ] Reject invalid file types.
- [ ] Reject malformed JSON.
- [ ] Reject JSON missing required fields.
- [ ] Validate before replacing existing data.
- [ ] Ask user to confirm replacement after valid import.
- [ ] Do not partially overwrite data on failed import.
- [ ] Update selected year after import if needed.
- [ ] Mark import as major change for backup reminder.
- [ ] Export human-readable CSV summary.
- [ ] Include one row per goal where practical.
- [ ] Include year column.
- [ ] Include category column.
- [ ] Include goal title column.
- [ ] Include goal type column.
- [ ] Include priority column.
- [ ] Include status column.
- [ ] Include deadline column.
- [ ] Include progress percent column.
- [ ] Include counts-toward-score column.
- [ ] Include completed milestones column.
- [ ] Include total milestones column.
- [ ] Include latest metric value column.
- [ ] Include latest reflection rating column.
- [ ] Include notes summary column if practical.
- [ ] Run build or type-check.

## 17. Backup Reminders

- [ ] Add backup reminders enabled setting.
- [ ] Add monthly backup reminder rule.
- [ ] Show reminder if no export in last 30 days.
- [ ] Add major-change backup reminder rule.
- [ ] Show reminder after major change if no export in last 7 days.
- [ ] Track `lastBackupExportedAt`.
- [ ] Track `lastBackupReminderDismissedAt`.
- [ ] Let user dismiss reminder banner.
- [ ] Do not use forced popups.
- [ ] Turn reminders on/off in Settings.
- [ ] Major change: creating category.
- [ ] Major change: deleting category.
- [ ] Major change: renaming category.
- [ ] Major change: creating goal.
- [ ] Major change: deleting goal.
- [ ] Major change: changing goal target.
- [ ] Major change: changing deadline.
- [ ] Major change: changing tracking type.
- [ ] Major change: adding milestones.
- [ ] Major change: deleting milestones.
- [ ] Major change: bulk-editing milestones.
- [ ] Major change: completing monthly snapshot.
- [ ] Major change: completing year-end review.
- [ ] Major change: importing JSON backup.
- [ ] Run build or type-check.

## 18. Archive, Delete, And Danger Zone

- [ ] Add goal archive action.
- [ ] Ask whether archived goal should count toward score.
- [ ] Default archive scoring choice to yes.
- [ ] Allow optional archive reason if simple.
- [ ] Allow optional archive note if simple.
- [ ] Set `archivedAt`.
- [ ] Move archived goal out of active list.
- [ ] Add goal delete action.
- [ ] Confirm permanent deletion.
- [ ] Confirmation text should suggest archiving instead.
- [ ] Delete goal progress history if user confirms deletion.
- [ ] Delete related milestones if user confirms deletion.
- [ ] Add Danger Zone in Settings.
- [ ] Add clear all local data action.
- [ ] Confirm before clearing data.
- [ ] Recommend exporting a backup first.
- [ ] Warn if no recent backup exists.
- [ ] Do not require typing a phrase.
- [ ] Do not block user from clearing data.
- [ ] Reset to fresh default data after clearing.
- [ ] Run build or type-check.

## 19. Year-End Review

- [ ] Add Year-End Review view.
- [ ] Show beginning category scores if snapshot data exists.
- [ ] Show final category scores if snapshot data exists.
- [ ] Show target category scores if available.
- [ ] Show completed goals.
- [ ] Show incomplete goals.
- [ ] Show completed milestones.
- [ ] Show goals eligible to carry into next year.
- [ ] Add prompt: "What improved most this year?"
- [ ] Add prompt: "What felt most difficult?"
- [ ] Add prompt: "What are you proud of?"
- [ ] Add prompt: "What do you want to carry forward?"
- [ ] Add prompt: "What do you want to stop pursuing?"
- [ ] Let user carry unfinished goal into next year.
- [ ] Let user archive unfinished goal.
- [ ] Let user delete unfinished goal with confirmation.
- [ ] Save year-end review data.
- [ ] Mark completed review as major change for backup reminder.
- [ ] Wire review into Settings > Years.
- [ ] Wire review into new-year creation flow.
- [ ] Run build or type-check.

## 20. Responsive Design

- [ ] Dashboard works on desktop width.
- [ ] Dashboard works on mobile width.
- [ ] Category Detail works on desktop width.
- [ ] Category Detail works on mobile width.
- [ ] Goal Form works on desktop width.
- [ ] Goal Form works on mobile width.
- [ ] Settings works on desktop width.
- [ ] Settings works on mobile width.
- [ ] Year selector is easy to reach on mobile.
- [ ] Search is easy to reach on mobile.
- [ ] Wheel appears first on mobile dashboard.
- [ ] Focus summary appears near wheel.
- [ ] Category list appears underneath on mobile.
- [ ] Sections stack vertically on mobile.
- [ ] Buttons are comfortable to tap.
- [ ] Form fields are comfortable to tap.
- [ ] No horizontal scrolling is required.
- [ ] Text does not overlap.
- [ ] Long goal names do not break layout.
- [ ] Run build or type-check.

## 20.5 Visual Style

- [ ] Use light mode only.
- [ ] Create a subtle character-stats feeling.
- [ ] Use progress rings where they help clarify scores.
- [ ] Show category scores clearly.
- [ ] Use a clear focus indicator.
- [ ] Keep language factual and calm.
- [ ] Avoid overly motivational copy.
- [ ] Do not add XP.
- [ ] Do not add badges.
- [ ] Do not add streak rewards.
- [ ] Do not add an achievement system.
- [ ] Do not add heavy game mechanics.
- [ ] Run build or type-check.

## 21. Accessibility Basics

- [ ] Category list repeats wheel information.
- [ ] Category list shows category name.
- [ ] Category list shows goal/KPI score.
- [ ] Category list shows self-reflection score.
- [ ] Category list shows attention markers.
- [ ] Wheel slices are clickable or tappable.
- [ ] Category list items also open Category Detail.
- [ ] Buttons have clear labels.
- [ ] Inputs have visible labels.
- [ ] Text contrast is readable.
- [ ] Status is not communicated by color alone.
- [ ] Keyboard navigation reaches main actions.
- [ ] Focus states are visible.
- [ ] Forms show understandable validation messages.
- [ ] Import errors are understandable.
- [ ] Empty states are understandable.
- [ ] Run build or type-check.

## 22. Empty And Error States

- [ ] First launch shows default categories.
- [ ] No goals yet state appears.
- [ ] "Add your first goal" opens normal Add Goal flow.
- [ ] Category with no goals shows "No goals yet."
- [ ] No search results state appears.
- [ ] Invalid import file shows simple error.
- [ ] Failed import preserves existing data.
- [ ] No backup exported state appears.
- [ ] Past locked year shows read-only message.
- [ ] Locked past year has unlock option.
- [ ] Validation errors show near relevant form fields.
- [ ] App does not crash on missing optional fields.
- [ ] Run build or type-check.

## 23. Manual Testing Checklist

- [ ] First launch shows default categories.
- [ ] Add a metric goal.
- [ ] Add a habit goal.
- [ ] Add a milestone goal.
- [ ] Add a reflection goal.
- [ ] Update a metric goal.
- [ ] Update a habit goal.
- [ ] Complete a milestone.
- [ ] Add a reflection check-in.
- [ ] Complete a goal and choose Mark completed.
- [ ] Reach 100% and choose Increase target.
- [ ] Reach 100% and choose Keep tracking.
- [ ] Archive a goal and count it toward score.
- [ ] Archive a goal and exclude it from score.
- [ ] Delete a goal with confirmation.
- [ ] Search by title.
- [ ] Search by description.
- [ ] Search by category.
- [ ] Search by status.
- [ ] Search by milestone.
- [ ] Export JSON.
- [ ] Import valid JSON.
- [ ] Try importing invalid JSON.
- [ ] Export CSV summary.
- [ ] Create a new year.
- [ ] Unlock a past year.
- [ ] Save monthly snapshot.
- [ ] Complete year-end review.
- [ ] Clear all data with warning.

## 24. Scoring Testing Checklist

- [ ] Low priority weight is 1.
- [ ] Medium priority weight is 2.
- [ ] High priority weight is 3.
- [ ] High-priority goals affect category score more than low-priority goals.
- [ ] Paused goals still count.
- [ ] Completed goals count as 100%.
- [ ] Archived goals count when selected.
- [ ] Archived goals do not count when excluded.
- [ ] Overdue goals do not reduce score.
- [ ] Increasing metric goal progress is correct with starting value.
- [ ] Increasing metric goal progress is correct without starting value.
- [ ] Decreasing metric goal progress is correct.
- [ ] Metric progress clamps below 0.
- [ ] Metric progress clamps above 100%.
- [ ] Habit progress averages completed periods.
- [ ] Future habit periods do not count.
- [ ] Milestone progress uses completed divided by total.
- [ ] Reflection progress uses average check-in rating.
- [ ] Reflection target equal to starting rating returns 0.
- [ ] Category with no goals uses self-reflection fallback for overall score.
- [ ] Overall score equally weights goal/KPI average and self-reflection average.

## 25. Import And Export Testing Checklist

- [ ] JSON export includes app version.
- [ ] JSON export includes export timestamp.
- [ ] JSON export includes settings.
- [ ] JSON export includes all years.
- [ ] JSON export includes categories.
- [ ] JSON export includes goals.
- [ ] JSON export includes milestones.
- [ ] JSON export includes progress updates.
- [ ] JSON export includes snapshots.
- [ ] JSON export includes year-end reviews.
- [ ] JSON import restores relationships by stable IDs.
- [ ] Failed import does not overwrite current data.
- [ ] CSV opens in spreadsheet software.
- [ ] CSV is understandable to a human.
- [ ] CSV is not used for restore.
- [ ] Last backup date updates after JSON export.

## 26. Final V1 Review

- [ ] Dashboard is connected.
- [ ] Category Detail is connected.
- [ ] Goal Form is connected.
- [ ] Settings is connected.
- [ ] Import/Export is connected.
- [ ] Year-End Review is connected.
- [ ] No major orphaned components remain.
- [ ] No major orphaned utilities remain.
- [ ] No unused placeholder views remain unless clearly marked.
- [ ] No backend requirement exists.
- [ ] No account requirement exists.
- [ ] No cloud sync exists.
- [ ] No AI coaching exists.
- [ ] No dark mode exists.
- [ ] No badges, XP, streaks, or heavy game mechanics exist.
- [ ] All core V1 requirements from `spec.md` are represented.
- [ ] Final build or type-check passes.
- [ ] Manual testing checklist has been reviewed.
- [ ] Known gaps are documented clearly.

## 27. Learning Notes To Capture

- [ ] What changed in this step?
- [ ] Why did it change?
- [ ] How can it be tested?
- [ ] What concept did this step demonstrate?
- [ ] What is the next small thing to learn?

Useful concepts to learn as they appear:

- Component: a reusable piece of the screen.
- State: data the app remembers while it is running.
- Type: a rule describing the shape of data.
- Local storage: browser storage saved on the same device.
- Validation: checks that prevent confusing or broken data.
- Utility function: reusable logic that is not tied to the screen.
- Refactor: changing code structure without changing what users see.
- Build: a check that prepares the app for running in a browser.
- Test: a repeatable check that helps catch mistakes.
- Commit: a Git checkpoint that records a known version of files.

## 28. V1 Out Of Scope Guardrails

- [ ] Do not add user accounts or login.
- [ ] Do not add cloud sync across devices.
- [ ] Do not add AI coaching or AI-generated recommendations.
- [ ] Do not add native iOS or Android app code.
- [ ] Do not add PWA install or offline-app setup.
- [ ] Do not add email or push notifications.
- [ ] Do not add social sharing.
- [ ] Do not add coach, partner, or family collaboration.
- [ ] Do not add advanced analytics or trend dashboards.
- [ ] Do not add a full guided monthly check-in flow.
- [ ] Do not add complex journaling.
- [ ] Do not add file attachments.
- [ ] Do not add subtasks under milestones.
- [ ] Do not add custom formulas.
- [ ] Do not add multiple local user profiles.
- [ ] Do not add import/export formats beyond JSON backup and one CSV summary.
- [ ] Do not add payments or subscriptions.
- [ ] Do not add a public marketing site.
- [ ] Do not add deployment automation.
