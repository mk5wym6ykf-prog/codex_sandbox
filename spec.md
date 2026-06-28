# Life Wheel Goals App - V1 Developer Specification

## 1. Overview

The Life Wheel Goals App is a local-first web app for individuals who want to set yearly goals, break them into achievable steps, and see their current life balance in a visual wheel format.

The app should feel like a simple personal "character stats" dashboard. A user should be able to quickly see strengths, weaker areas, and where to focus next.

V1 should be simple, manual, private, and structured. It should not require an account, a server, cloud sync, or AI coaching.

## 2. Primary User

The primary user is an individual using the app privately.

The user wants to:

- See where they currently are across important life categories.
- Define where they want to be by the end of a selected year.
- Create goals under each category.
- Break large goals into smaller milestones.
- Track both measurable progress and personal self-reflection.
- Save and restore their data locally.

## 3. V1 Product Goals

V1 must allow a user to:

- Open the web app directly into the dashboard.
- View a two-ring life wheel.
- Use default life categories, then customize them.
- Create goals under exactly one category.
- Track four goal types: metric, habit, milestone, and reflection.
- See goal progress reflected in the outer wheel ring.
- See self-reflection reflected in the inner wheel ring.
- Search goals within the selected year.
- Save monthly snapshots.
- Manage multiple planning years.
- Export and import full data as one JSON file.
- Export a human-readable CSV summary.
- Store all data locally on the device.

## 4. Architecture Choices

These are product architecture choices, not a required technical stack.

### 4.1 App Type

V1 should be a normal responsive web app.

It should not be a native mobile app or Progressive Web App in V1.

### 4.2 Page Structure

Use a single-page app style with multiple views.

Beginner-friendly definition: a single-page app loads once in the browser, then swaps visible screens without loading a new website page each time.

Main views:

- Dashboard
- Category detail
- Goal creation/editing
- Settings
- Year-end review
- Import/export

### 4.3 Storage

Use local browser storage for V1.

The app should work without login. Data is stored on the current device/browser only.

The app may require internet access to load if hosted online. Once loaded, the core app logic should not depend on internet access.

### 4.4 No Required Tech Stack

This spec does not require a specific framework, database, or library. The developer may choose the implementation stack.

## 5. Core Concepts

### 5.1 Year

A year is the main planning container.

Each year has:

- Categories
- Goals
- Milestones
- Progress updates
- Snapshots
- Year-end review data

The interface should focus on one selected year at a time.

### 5.2 Category

A category is a life area shown as a slice of the wheel.

Default categories:

1. Health & Energy
2. Emotional Wellbeing
3. Relationships & Connection
4. Career & Work
5. Money & Security
6. Personal Growth
7. Home & Environment
8. Purpose & Meaning
9. Fun & Recreation

Categories are editable. Users can:

- Rename categories
- Add categories
- Delete categories
- Reorder categories
- Choose from a fixed set of colors
- Choose from a fixed set of simple practical icons

Colors and icons must be unique across active categories.

When a new category is created, the app should auto-assign the next unused color and icon. The user can change them later.

### 5.3 Goal

A goal belongs to exactly one category.

Users can create multiple goals in the same category.

The app should gently warn when a category has more than 3 active goals, but it should not block the user.

Goal statuses:

- Not started
- In progress
- Paused
- Completed
- Archived

Archived means the goal is no longer active, but the record is kept.

There is no separate "abandoned" status in V1.

### 5.4 Milestone

A milestone is a smaller step under a goal.

Milestones do not have subtasks in V1.

Incomplete milestones can be edited, deleted, and reordered.

Completed milestones should be preserved. Editing a completed milestone should require confirmation because it changes history.

The app should store milestone completion dates, but should not label milestones as early, on time, or late.

### 5.5 Snapshot

A snapshot stores the current wheel/category state at a point in time.

V1 should save snapshots quietly for future review, but should not include a complex history dashboard.

The app should show a lightweight monthly prompt if no snapshot exists for the current month:

"Save this month's snapshot"

If clicked, the app records the current category scores and wheel state.

## 6. Life Wheel

The dashboard should center around a two-ring wheel.

### 6.1 Outer Ring

The outer ring shows goal/KPI progress.

This is the action-based layer:

"Am I doing what I said I would do?"

### 6.2 Inner Ring

The inner ring shows self-reflection score.

This is the personal feeling layer:

"How do I feel about this area of life?"

### 6.3 Scale

Both rings use a 1-10 scale.

- Center means low or 0 progress.
- Outer edge means 10 or complete.

### 6.4 Categories With No Goals

If a category has no goals:

- Outer ring should show no goal progress or a light "No goals yet" state.
- Inner ring should still show the category self-reflection score.
- The category list should clearly indicate "No goals yet."

## 7. Goal Types

The user manually chooses the goal type after choosing a category.

The app should not use AI to choose goal type in V1.

### 7.1 Metric-Based Goal

Tracks a number going up or down.

Examples:

- Reach $10,000 net worth.
- Reduce debt to $5,000.
- Read 24 books.

Fields:

- Unit label entered by the user, such as $, lbs, books, hours.
- Direction: increasing or decreasing.
- Target value.
- Starting value.
- Current/latest value.

Rules:

- Target value is required.
- Direction should be inferred from the goal wording when possible, but the user must be able to confirm or change it.
- Starting value is optional for increasing goals.
- Starting value is required for decreasing goals.
- Current value can be blank until tracking begins.
- Progress is calculated from the latest value.
- Previous updates should be saved as history.

### 7.2 Habit-Based Goal

Tracks repeated actions.

Examples:

- Work out 12 times per month.
- Call parents 4 times per month.
- Meditate 20 days per month.

Fields:

- Target count.
- Tracking period, monthly by default.
- Optional weekly tracking if the user chooses.
- Count updates.
- Optional day checkoffs if the user wants more detail.

Rules:

- Habit goals default to monthly tracking.
- Users can change the habit to weekly tracking.
- Habit progress is based on consistency across completed periods.
- Future periods should not count against the user.

Example:

- Goal: work out 12 times/month.
- January: 12/12 = 100%.
- February: 6/12 = 50%.
- March has not happened yet, so it is ignored.
- Current yearly habit progress = average of completed periods = 75%.

### 7.3 Milestone-Based Goal

Tracks completion of simple milestones.

Examples:

- Update resume.
- Apply to 20 jobs.
- Complete interview practice.

Rules:

- Progress is the percentage of milestones completed.
- All milestones have equal weight in V1.
- Users can reorder milestones manually.
- No subtasks in V1.

### 7.4 Reflection-Based Goal

Tracks subjective progress using self-ratings.

Examples:

- Feel more peaceful.
- Build confidence.
- Feel more emotionally resilient.

Fields:

- Starting rating from 1-10.
- Target rating from 1-10.
- Check-in ratings from 1-10.
- Optional short note per check-in.

Rules:

- Starting rating and target rating are required.
- Progress is based on the average of completed check-in ratings over time.
- Missed check-ins do not count against the user.
- Notes are optional and should not turn the app into a journaling app.

## 8. Goal Fields

Every goal should have:

- id, internal only
- categoryId
- title
- description, optional
- goalType: metric, habit, milestone, reflection
- priority: low, medium, high
- status: not_started, in_progress, paused, completed, archived
- hasDeadline: true/false
- deadlineDate, required unless no deadline is selected
- createdAt
- updatedAt
- completedAt, if completed
- archivedAt, if archived
- countsTowardScore

Rules:

- No-deadline goals default to low priority.
- User can manually change a no-deadline goal to medium or high priority.
- When progress is logged, a goal can automatically move from Not started to In progress.
- User can also manually change status.
- When a goal reaches 100%, the app should ask before marking it complete.

When a goal reaches 100%, show options:

- Mark completed
- Increase target
- Keep tracking

If the user increases the target, preserve the old target as a completed milestone.

## 9. Priority

Goal priority options:

- Low
- Medium
- High

Priority weights:

- Low = 1
- Medium = 2
- High = 3

Priority affects category goal/KPI score.

## 10. Scoring Rules

Scoring is central to the app and should be implemented consistently.

### 10.1 Goal Progress Score

Each goal should produce a progress percentage from 0% to 100%.

Paused goals still count based on effort so far.

Completed goals count as 100%.

Archived goals can count or be excluded, based on the user's choice when archiving.

Overdue goals do not reduce score. They should only appear as attention-needed.

### 10.2 Metric Goal Progress

For increasing goals:

If starting value exists:

```text
progress = (currentValue - startingValue) / (targetValue - startingValue)
```

If starting value does not exist:

```text
progress = currentValue / targetValue
```

For decreasing goals:

```text
progress = (startingValue - currentValue) / (startingValue - targetValue)
```

Clamp progress between 0 and 1.

Beginner-friendly definition: clamp means values below 0 become 0, and values above 1 become 1.

### 10.3 Habit Goal Progress

For each completed tracking period:

```text
periodProgress = completedCount / targetCount
```

Clamp each period progress between 0 and 1.

Overall habit progress:

```text
habitProgress = average(periodProgress for completed periods)
```

If no periods have been completed yet, progress is 0.

### 10.4 Milestone Goal Progress

```text
progress = completedMilestones / totalMilestones
```

If a milestone goal has no milestones yet, progress is 0.

### 10.5 Reflection Goal Progress

Reflection progress uses average completed check-in ratings.

First calculate:

```text
averageRating = average(completed check-in ratings)
```

Then compare it to the starting and target rating:

```text
progress = (averageRating - startingRating) / (targetRating - startingRating)
```

Clamp progress between 0 and 1.

If targetRating equals startingRating, treat progress as 0 until the user changes the setup.

### 10.6 Category Goal/KPI Score

Category goal/KPI score is calculated from goals in the category.

Use priority weighting:

```text
weightedProgressSum = sum(goalProgress * priorityWeight)
weightSum = sum(priorityWeight)
categoryGoalScore = (weightedProgressSum / weightSum) * 10
```

Rules:

- Include active, paused, completed, and archived goals that count toward score.
- Exclude archived goals if the user selected "do not count toward score."
- If a category has no goals that count toward score, it has no goal/KPI score and should show "No goals yet."

### 10.7 Category Self-Reflection Score

Each category can have a manual self-reflection score from 1-10.

This score is used for the inner wheel ring.

### 10.8 Overall Life Score

Overall life score should be a simple average using all categories.

First calculate:

- Average goal/KPI score across all categories.
- Average self-reflection score across all categories.

If a category has no goal/KPI score, use its self-reflection score as its goal/KPI score fallback for the overall average.

Then:

```text
overallLifeScore = (goalKpiAverage + selfReflectionAverage) / 2
```

The two rings have equal weight.

V1 should show current score only. It should not show score change over time on the dashboard.

## 11. Dashboard

The dashboard should be clean and snapshot-focused.

It should show:

- Selected year
- Search input
- Overall life score
- Two-ring life wheel
- Main focus category
- Optional "also watch" list with up to 2 items
- Category list showing goal/KPI score and self-reflection score
- Empty-state prompt if no goals exist
- Monthly snapshot prompt if applicable
- Backup reminder banner if applicable

### 11.1 Focus Recommendation

Dashboard should show one main focus category.

It may also show up to 2 "also watch" items.

Focus should consider:

- Goal priority
- Time-bound goals
- Upcoming deadlines
- Low category scores

Dashboard can show only the category name.

The category detail view can show one short reason, such as:

"High-priority goal due soon."

### 11.2 Empty State

If the user has no goals:

- Show the default categories.
- Show a simple prompt like "Add your first goal."
- Clicking it opens the normal Add Goal flow.

## 12. Category Detail View

Clicking or tapping a category opens its detail view.

It should show:

- Category name, icon, and color
- Goal/KPI score
- Self-reflection score
- Short focus reason if this is a focus category
- Active goals
- Paused goals
- Completed goals in a collapsed Wins section
- Option to show archived goals
- Quick update controls based on goal type

Completed goals should remain visible as motivation, but not clutter the main active list.

Recommended behavior:

- Active goals first.
- Paused goals after active goals.
- Completed goals in collapsed "Wins" section.
- Archived goals hidden unless the user chooses to show them.

## 13. Goal Creation Flow

The user creates a goal through a simple standard flow:

1. Choose category.
2. Choose goal type manually.
3. Fill in goal details.
4. Add or review milestones, if relevant.
5. Save.

The app may suggest milestones automatically, but the user must review and save them.

Suggested milestones should be editable, deletable, reorderable, and regeneratable if goal details change.

## 14. Milestone Suggestions

The app should support suggested milestones where useful.

Suggested defaults:

- Metric goals: evenly spaced milestones, such as 25%, 50%, 75%, 100%.
- Habit goals: frequency-based milestones or period targets.
- Milestone goals: user-created steps, with optional simple suggestions.
- Reflection goals: check-in milestones rather than hard achievements.

These are suggestions only. The user controls the final milestones.

## 15. Search

Search applies only to the currently selected year.

Search should broadly match:

- Goal titles
- Goal descriptions
- Category names
- Statuses
- Milestone titles
- Progress/update text where applicable

Clicking a search result should open the category detail view with the matching goal highlighted or scrolled into view.

## 16. Years And Rollover

The app supports multiple years from V1.

The user can:

- Select a year.
- Create a new year.
- View past years.
- Unlock past years for editing if needed.

When creating a new year:

- Copy categories from the previous year.
- Copy unfinished goals.
- Reset progress for the new year.
- Treat the new year as a fresh start.

Past years should become read-only by default.

The user can unlock editing with confirmation:

"Editing a past year may change your historical records."

## 17. Year-End Review

V1 should include a simple optional year-end review.

The review should show:

- Beginning/final/target category scores if snapshot data exists.
- Completed goals.
- Incomplete goals.
- Completed milestones.
- Goals eligible to carry into next year.
- Short reflection prompts.

Suggested prompts:

- What improved most this year?
- What felt most difficult?
- What are you proud of?
- What do you want to carry forward?
- What do you want to stop pursuing?

For unfinished goals, the user can choose:

- Carry into next year
- Archive
- Delete permanently, with confirmation

## 18. Settings

Settings should include:

### 18.1 Categories

- Rename
- Add
- Delete
- Reorder
- Choose fixed color
- Choose fixed icon

### 18.2 Years

- Create new year
- Switch selected year
- Unlock past-year editing
- Start year-end review

### 18.3 Data

- Export JSON backup
- Import JSON backup
- Export CSV summary
- Show last backup date
- Privacy message:

"Your data is stored on this device. Export a backup to keep a copy."

### 18.4 Backup Reminders

- Turn backup reminders on/off
- Monthly reminder
- Reminder after major changes

### 18.5 Danger Zone

- Clear all local data
- Require a normal confirmation
- Recommend exporting a backup first
- Warn if no recent backup exists
- Do not block the user from clearing data

## 19. Data Handling

### 19.1 Local Data

All V1 app data is stored locally on the user's device/browser.

There is one local user profile only.

### 19.2 JSON Import/Export

Full backup and restore uses one JSON file.

JSON export should include:

- App version
- Export timestamp
- Settings
- All years
- Categories
- Goals
- Milestones
- Progress updates
- Snapshots
- Year-end reviews

Example shape:

```json
{
  "appVersion": "1.0",
  "exportedAt": "2026-06-26T12:00:00Z",
  "settings": {
    "selectedYear": 2026,
    "lastBackupExportedAt": "2026-06-20T12:00:00Z"
  },
  "years": [
    {
      "id": "year_2026",
      "year": 2026,
      "isLocked": false,
      "categories": [],
      "goals": [],
      "milestones": [],
      "progressUpdates": [],
      "snapshots": []
    }
  ]
}
```

### 19.3 CSV Summary Export

CSV export is for human viewing only.

It does not need to support full restore.

It should be one CSV file with one row per goal where practical.

Suggested columns:

- Year
- Category
- Goal title
- Goal type
- Priority
- Status
- Deadline
- Progress percent
- Counts toward score
- Completed milestones
- Total milestones
- Latest metric value
- Latest reflection rating
- Notes summary, if applicable

### 19.4 Backup Reminders

Show backup reminders:

- Monthly, if the user has not exported in the last 30 days.
- After major changes, if the user has not exported in the last 7 days.

Major changes include:

- Creating, deleting, or renaming a category.
- Creating or deleting a goal.
- Changing goal target, deadline, or tracking type.
- Adding, deleting, or bulk-editing milestones.
- Completing a monthly snapshot.
- Completing a year-end review.
- Importing a JSON backup file.

Backup reminders should be dismissible banners, not forced popups.

Track:

- lastBackupExportedAt
- lastBackupReminderDismissedAt

## 20. Suggested Data Model

This is a product-level data model. A developer may adapt field names as needed.

### 20.1 Year

```json
{
  "id": "year_2026",
  "year": 2026,
  "isLocked": false,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-06-26T12:00:00Z"
}
```

### 20.2 Category

```json
{
  "id": "cat_money_security",
  "yearId": "year_2026",
  "name": "Money & Security",
  "icon": "wallet",
  "color": "green",
  "order": 5,
  "selfReflectionScore": 4,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-06-26T12:00:00Z"
}
```

### 20.3 Goal

```json
{
  "id": "goal_net_worth_10k",
  "yearId": "year_2026",
  "categoryId": "cat_money_security",
  "title": "Reach $10,000 net worth",
  "description": "",
  "goalType": "metric",
  "priority": "high",
  "status": "in_progress",
  "hasDeadline": true,
  "deadlineDate": "2026-12-31",
  "countsTowardScore": true,
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-06-26T12:00:00Z",
  "completedAt": null,
  "archivedAt": null,
  "trackingConfig": {
    "unit": "$",
    "direction": "increase",
    "startingValue": 0,
    "targetValue": 10000
  }
}
```

### 20.4 Milestone

```json
{
  "id": "ms_net_worth_2500",
  "yearId": "year_2026",
  "goalId": "goal_net_worth_10k",
  "title": "$2,500 net worth",
  "targetValue": 2500,
  "dueDate": "2026-03-31",
  "isCompleted": true,
  "completedAt": "2026-03-15T12:00:00Z",
  "order": 1
}
```

### 20.5 Progress Update

```json
{
  "id": "update_001",
  "yearId": "year_2026",
  "goalId": "goal_net_worth_10k",
  "updateType": "metric",
  "date": "2026-06-26",
  "value": 4200,
  "rating": null,
  "count": null,
  "note": ""
}
```

### 20.6 Snapshot

```json
{
  "id": "snapshot_2026_06",
  "yearId": "year_2026",
  "date": "2026-06-30",
  "type": "monthly",
  "overallLifeScore": 5.8,
  "categoryScores": [
    {
      "categoryId": "cat_money_security",
      "goalKpiScore": 4.2,
      "selfReflectionScore": 4
    }
  ]
}
```

### 20.7 Settings

```json
{
  "selectedYear": 2026,
  "backupRemindersEnabled": true,
  "lastBackupExportedAt": null,
  "lastBackupReminderDismissedAt": null
}
```

## 21. Validation Rules

Validation means rules that prevent confusing or broken data.

Hard rules:

- Category name is required.
- Category names must be unique within a year.
- Category colors/icons should be unique.
- Goal title is required.
- Goal must belong to exactly one category.
- Goal type is required.
- Goal priority is required.
- Goal status is required.
- Deadline is required unless "No deadline" is selected.
- No-deadline goals default to low priority.
- Metric goals require a target value.
- Decreasing metric goals require a starting value.
- Habit goals require a target count and tracking period.
- Reflection goals require starting rating and target rating from 1-10.
- Scores and ratings must be between 1 and 10.
- Imported backup files must match the expected app JSON structure.

Warnings:

- More than 3 active goals in one category.
- Deleting a goal should suggest archiving instead.
- Deleting a category with goals/history should be blocked until goals are moved, archived, or deleted.
- Clearing all data should recommend exporting a backup first.
- Major changes should remind the user to export if no recent backup exists.

## 22. Deletion And Archive Behavior

### 22.1 Goal Archive

When archiving a goal:

- Ask if the goal should still count toward this year's score.
- Default should be yes.
- Optional reason may be provided.
- Optional short note may be provided.

Keep this lightweight.

### 22.2 Goal Delete

Deleting a goal is allowed, but the app should bias toward archive.

Confirmation text should communicate:

"This permanently removes the goal and its progress history. Consider archiving instead."

### 22.3 Category Delete

Deleting a category is allowed.

If a category has no goals/history:

- Allow deletion after simple confirmation.

If a category has goals/history:

- Block deletion.
- Tell the user to move, archive, or delete those goals first.

No category archive feature in V1.

### 22.4 Clear All Data

Clear all local data should exist in Settings > Danger Zone.

Before clearing:

- Ask "Are you sure?"
- Recommend exporting a backup first.
- Warn if no recent backup exists.
- Do not require typing a phrase.

## 23. Import Error Handling

When importing JSON:

- Reject invalid file types.
- Reject malformed JSON.
- Reject JSON that does not include required app fields.
- Show a simple error message.
- Do not partially overwrite existing data if import fails.

Recommended import safety:

- Validate first.
- If valid, ask the user to confirm replacing current local data.
- After successful import, update selected year if needed.
- Set a backup reminder because import is a major change.

## 24. Responsive Design

The app must work on desktop and mobile web browsers.

This does not mean native mobile app support.

Desktop:

- Wheel and snapshot summary can sit side by side.
- Category list can appear beside or below the wheel.
- Settings and forms can use wider layouts.

Mobile:

- Year selector and search remain easy to reach.
- Wheel appears first.
- Focus summary appears near the wheel.
- Category list appears underneath.
- Category detail sections stack vertically.
- Buttons and form fields should be comfortable to tap.
- No horizontal scrolling should be required.

## 25. Visual Style

V1 should use light mode only.

The style should be subtly game-like:

- Character stats feeling
- Progress rings
- Category scores
- Wins section
- Clear focus indicator

Avoid heavy game mechanics in V1:

- No XP
- No badges
- No streak rewards
- No achievement system

Language should be factual and calm, not overly motivational.

## 26. Accessibility Basics

The wheel is the main visual, but the category list should show the same key information.

Accessibility requirements:

- Category list must show category name, goal/KPI score, self-reflection score, and attention markers.
- Wheel slices should be clickable/tappable.
- Category list items should also open category detail.
- Buttons and inputs should have clear labels.
- Colors should not be the only way to understand status.
- Text should have readable contrast.
- Core actions should be usable with keyboard navigation.

## 27. Empty And Error States

Keep states simple.

Required states:

- No goals yet: show default categories and "Add your first goal."
- Category has no goals: show self-reflection score and "No goals yet."
- No search results: show a simple no results message.
- Invalid import file: show a simple error and preserve existing data.
- No backup exported yet: show "No backup exported yet" in Settings > Data.
- Past year locked: show that it is read-only with an unlock option.

## 28. Example User Journeys

### 28.1 First Launch And First Goal

1. User opens the app.
2. Dashboard appears with 9 default categories and no goals.
3. User clicks "Add your first goal."
4. User chooses Money & Security.
5. User chooses Metric goal.
6. User creates "Reach $10,000 net worth by Dec 31."
7. App suggests milestones at $2,500, $5,000, $7,500, and $10,000.
8. User saves the goal.
9. Dashboard updates the Money & Security outer ring.

### 28.2 Habit Goal Update

1. User opens Health & Energy.
2. User creates "Work out 12 times per month."
3. At the end of the month, user enters 9 workouts.
4. App calculates that period as 75%.
5. The habit contributes to the Health & Energy category score.

### 28.3 Reflection Goal

1. User creates "Feel more peaceful during stressful moments."
2. Starting rating is 4/10.
3. Target rating is 8/10.
4. User checks in later with 5/10 and optional note.
5. Reflection goal progress updates based on average completed ratings.

### 28.4 Category From Wheel

1. User clicks a wheel slice for Money & Security.
2. Category detail opens.
3. User sees goals, progress, next milestone, and current status.
4. User updates the latest net worth value.
5. Dashboard score updates.

### 28.5 Archive Goal

1. User archives a goal that no longer feels relevant.
2. App asks whether the progress should count toward this year's score.
3. User chooses yes or no.
4. Goal moves out of active list but remains in history.

### 28.6 JSON Backup

1. User goes to Settings > Data.
2. User exports JSON backup.
3. App downloads one JSON file with all app data.
4. lastBackupExportedAt is updated.

### 28.7 New Year

1. User starts a new year.
2. App offers year-end review.
3. User reviews completed and unfinished goals.
4. App copies categories and unfinished goals into the new year.
5. Progress resets.
6. Previous year becomes read-only by default.

## 29. Testing Plan

V1 can keep testing lightweight, but scoring should be checked carefully.

### 29.1 Manual Testing

Test these flows manually:

- First launch shows default categories.
- Add a metric goal.
- Add a habit goal.
- Add a milestone goal.
- Add a reflection goal.
- Update each goal type.
- Complete a milestone.
- Complete a goal and choose Mark completed.
- Reach 100% and choose Increase target.
- Archive a goal and choose whether it counts toward score.
- Delete a goal with confirmation.
- Search by title, description, category, status, and milestone.
- Export JSON.
- Import valid JSON.
- Try importing invalid JSON.
- Export CSV summary.
- Create a new year.
- Unlock a past year.
- Clear all data with warning.

### 29.2 Scoring Checks

Use small sample data to verify:

- Low/medium/high weights are 1/2/3.
- High-priority goals affect category score more than low-priority goals.
- Paused goals still count.
- Completed goals count as 100%.
- Archived goals count only if selected.
- Overdue goals do not reduce score.
- Categories with no goals use self-reflection for overall score fallback.
- Overall score uses equal weight between goal/KPI average and self-reflection average.

### 29.3 Import/Export Checks

Verify:

- JSON export includes all years and settings.
- JSON import restores relationships using stable IDs.
- Failed import does not overwrite current data.
- CSV opens in spreadsheet software.
- CSV is readable by humans, even if it is not used for restore.

### 29.4 Responsive Checks

Verify on desktop and phone-sized browser widths:

- Dashboard does not require horizontal scrolling.
- Wheel is visible and usable.
- Category list is readable.
- Goal forms fit the screen.
- Buttons are tappable.
- Text does not overlap.

### 29.5 Accessibility Checks

Verify:

- Wheel information is also available in the category list.
- Buttons have readable labels.
- Inputs have labels.
- Keyboard navigation reaches main actions.
- Color is not the only indicator of status.

## 30. Out Of Scope For V1

Do not build these in V1:

- User accounts and login
- Cloud sync across devices
- AI coaching or AI-generated recommendations
- Native iOS or Android apps
- PWA install/offline app support
- Email or push notifications
- Social sharing
- Coach, partner, or family collaboration
- Badges, XP, streak systems, or heavy game mechanics
- Advanced analytics and trend dashboards
- Full guided monthly check-in flow
- Complex journaling
- File attachments
- Subtasks under milestones
- Custom formulas
- Multiple local user profiles
- Import/export formats beyond JSON backup and one CSV summary
- Dark mode
- Payments or subscriptions
- Public marketing site
- Deployment automation

## 31. Future Ideas

Possible later improvements:

- AI suggestions for goal breakdowns and coaching prompts.
- Full monthly check-in wizard.
- Trend charts.
- Cloud backup and account sync.
- PWA install support.
- Notifications and reminders.
- Sharing with a coach or partner.
- More advanced review and planning flows.

