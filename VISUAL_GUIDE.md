# DayControl App - Visual Guide & Feature Walkthrough

## 📱 App Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│         DayControl - Daily Task Manager              │
└─────────────────────────────────────────────────────┘
                        ↓
        ┌───────────────────────────────┐
        │      LOGIN SCREEN             │
        │  - Google Sign-In             │
        │  - Apple Sign-In              │
        └───────────────┬───────────────┘
                        ↓
        ┌───────────────────────────────┐
        │    MAIN NAVIGATION (Tabs)     │
        │  📋 📋 Today                   │
        │  ✅ ✅ Completed               │
        │  🎯 🎯 Future                  │
        │  👤 👤 Profile                 │
        └───────────┬───────────────┬───┘
                    │               │
        ┌───────────▼─────┐  ┌──────▼─────────┐
        │  TODAY SCREEN   │  │  OTHER SCREENS │
        │  - Add task (+) │  │ - Completed    │
        │  - List tasks   │  │ - Future       │
        │  - Check off    │  │ - Profile      │
        │  - Delete       │  │                │
        └─────────────────┘  └────────────────┘
```

## 🎨 Screen Layouts

### 1️⃣ Authentication Screen
```
┌─────────────────────────────┐
│                             │
│       DayControl            │
│  Manage your tasks,         │
│  one day at a time          │
│                             │
│  ┌─────────────────────┐    │
│  │  Google Sign-In     │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  Apple Sign-In      │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

### 2️⃣ Today's Tasks Screen
```
┌─────────────────────────────┐
│  📋 Today's Tasks           │
│  Wednesday, Dec 31          │
│  2 pending • 1 completed    │
├─────────────────────────────┤
│ PENDING TASKS               │
│ ┌───────────────────────┐   │
│ │ □ Buy groceries       │   │
│ │   🔴 High Priority    │✕  │
│ └───────────────────────┘   │
│ ┌───────────────────────┐   │
│ │ □ Finish report       │   │
│ │   🟡 Medium Priority  │✕  │
│ └───────────────────────┘   │
│                             │
│ COMPLETED TODAY             │
│ ┌───────────────────────┐   │
│ │ ✓ Morning jog         │   │
│ │   🟢 Low Priority     │✕  │
│ └───────────────────────┘   │
│                             │
│              ┌────────┐     │
│              │   +    │     │  ← Add Task
│              └────────┘     │
└─────────────────────────────┘
```

### 3️⃣ Add Task Modal
```
┌─────────────────────────────┐
│ Cancel        Add Task    Add│
├─────────────────────────────┤
│ Task title:                 │
│ ┌───────────────────────┐   │
│ │ Buy Christmas gift    │   │
│ └───────────────────────┘   │
│                             │
│ Description (optional):     │
│ ┌───────────────────────┐   │
│ │ For sister's gift...  │   │
│ └───────────────────────┘   │
│                             │
│ Priority:                   │
│ ┌─────┐ ┌─────┐ ┌─────┐    │
│ │ Low │ │Med  │ │High │    │
│ └─────┘ └─────┘ └─────┘    │
│                             │
│ 2/5 tasks added today       │
└─────────────────────────────┘
```

### 4️⃣ Task Card - Detailed View
```
Task Card Structure:
┌─────────────────────────────┐
│ □  Task Title               │✕
│    📝 Optional description  │
│    🔴 High Priority         │
│                             │
│ ↻ Carried Over  (if any)    │
└─────────────────────────────┘

When Completed:
┌─────────────────────────────┐
│ ✓  Task Title (struck)      │✕
│    (grayed out & struck)    │
└─────────────────────────────┘
```

### 5️⃣ Completed Tasks Screen
```
┌─────────────────────────────┐
│  ✅ Completed Tasks         │
│  3 tasks completed          │
├─────────────────────────────┤
│ ✓ Morning jog               │
│   Completed at 7:30 AM      │
│                             │
│ ✓ Buy groceries             │
│   Completed at 10:15 AM     │
│                             │
│ ✓ Finish report             │
│   Completed at 2:45 PM      │
│                             │
└─────────────────────────────┘
```

### 6️⃣ Future Tasks Screen
```
┌─────────────────────────────┐
│  🎯 Planned Tasks           │
│  Plan ahead for future      │
├─────────────────────────────┤
│                             │
│  No future tasks planned    │
│                             │
│  Tasks you don't complete   │
│  today can be carried       │
│  forward to future days     │
│                             │
└─────────────────────────────┘
```

### 7️⃣ Profile Screen
```
┌─────────────────────────────┐
│        👤 Profile           │
├─────────────────────────────┤
│         ┌─────┐             │
│         │ V   │             │
│         └─────┘             │
│       Vishwa Kumar          │
│    vishwa@example.com       │
├─────────────────────────────┤
│ App Information             │
│ Version: 1.0.0              │
│ Platform: Multi-platform    │
├─────────────────────────────┤
│ Features                    │
│ ✓ Daily task management     │
│ ✓ Task carryover            │
│ ✓ Notifications             │
│ ✓ Completion tracking       │
│ ✓ Future planning           │
│                             │
│  ┌──────────────────────┐   │
│  │    Sign Out         │   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

## 🔄 Task Lifecycle

```
DAY 1 - CREATION
    User creates task
         ↓
    [Pending Task] 🔔 Notification sent
         ↓
    User completes or doesn't


DAY 1 - END OF DAY
    Incomplete tasks stored
         ↓
    Database marks for carryover


DAY 2 - MORNING (Auto)
    System checks yesterday's incomplete tasks
         ↓
    Creates copies with "Carried Over" badge
         ↓
    User sees them in Today's list
         ↓
    User can complete or reschedule


COMPLETION PATH
    Task Completed ✓
         ↓
    Moved to "Completed Today"
         ↓
    🔔 Notification: "Keep going! X tasks remaining"
         ↓
    Shown in Completed screen
         ↓
    Archived for history
```

## 🔔 Notification Timeline

```
┌──────────────┬──────────────┬──────────────┐
│   9:00 AM    │   On Action  │  When Done   │
├──────────────┼──────────────┼──────────────┤
│ Good Morning!│ Task Done ✓  │ All Done! 🎉 │
│              │              │              │
│ Check your   │ Keep Going!  │ Great work!  │
│ tasks for    │              │ All tasks    │
│ today        │ X tasks      │ completed    │
│              │ remaining    │              │
└──────────────┴──────────────┴──────────────┘
```

## 📊 Data Flow

```
Authentication:
User → [Google/Apple OAuth] → AuthService → Database → App State

Task Creation:
User Input → TaskContext → Database (SQLite) → UI Update

Task Completion:
Checkbox → TaskContext → Database → Notification → UI Update

Daily Reset (Automatic):
Midnight Trigger → Check Incomplete Tasks → Create Copies → Schedule Notifications
```

## 🎯 Key User Interactions

### Creating a Task
1. User taps "+" button
2. Modal slides up
3. Enter title (required)
4. Enter description (optional)
5. Select priority (Low/Medium/High)
6. Tap "Add" button
7. Task appears in list
8. Max 5 tasks enforced

### Completing a Task
1. User sees pending task
2. Taps checkbox
3. Checkbox marks with ✓
4. Task moves to "Completed Today"
5. Notification shows remaining count
6. If all done: Celebration message

### Carrying Over Tasks
1. Task not completed by midnight
2. Next morning, auto-appears with "↻ Carried Over"
3. User can complete or reschedule
4. Old task marked as incomplete
5. New task for today

## 🎨 Color System

```
Primary Actions:      #FF6B6B (Coral Red)    - Buttons, Headers
Secondary:            #4ECDC4 (Teal)         - Accents
Success:              #4CAF50 (Green)        - Completed, Low Priority
Warning:              #FF9800 (Orange)       - Medium Priority
Error:                #FF5252 (Red)          - High Priority, Delete
Background:           #F8F9FA (Light Gray)   - Page background
Surface:              #FFFFFF (White)        - Cards, Modals
Text:                 #2D3436 (Dark Gray)    - Body text
Text Secondary:       #636E72 (Medium Gray)  - Secondary text
Border:               #E1E8ED (Very Light)   - Dividers, Borders
```

## 📱 Tab Navigation Icons

```
📋 Today    - Current day tasks
✅ Completed - Finished tasks
🎯 Future   - Planned tasks
👤 Profile  - User settings
```

## ⚙️ Settings & Preferences

Current user settings:
- ✓ Notifications enabled (default)
- ✓ Daily 9 AM reminder
- ✓ Max 5 tasks per day
- ✓ Auto-carryover enabled

Future settings options:
- Dark mode toggle
- Custom notification times
- Task categories
- Due date reminders
- Cloud sync

---

## 🚀 User Journey Map

```
New User:
Install → Login → Create First Task → Complete Task → See Stats → Add More → Done!

Returning User:
Open App → View Today's Tasks → Complete Tasks → Check Notifications → Plan Future

Power User:
Daily routine → Quick task creation → Track completion → Plan ahead → Analytics
```

## 💾 Data Storage

```
Device Storage:
┌─────────────────────────┐
│   Local Device          │
├─────────────────────────┤
│ SQLite Database:        │
│  - Users table          │
│  - Tasks table          │
│  - Completed tasks      │
│                         │
│ AsyncStorage:           │
│  - User preferences     │
│  - Recent data          │
│                         │
│ Cache:                  │
│  - App data             │
│  - Notification state   │
└─────────────────────────┘

No Cloud Sync (Future Feature)
```

---

*This visual guide helps understand the app structure and user experience at a glance.*
