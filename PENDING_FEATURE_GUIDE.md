# ⏳ Pending Tasks Feature Guide

## 🎯 Overview

**Pending Tasks** is a new feature that lets you save tasks for later without cluttering your "Today" list. Move incomplete or non-urgent tasks to the Pending tab to keep your focus sharp.

---

## 📋 How It Works

### **Four Task Tabs (Left to Right)**

1. **🎯 Today** - Your current daily focus (max 5 tasks)
2. **⏳ Pending** - Tasks saved for later (unlimited)
3. **✅ Completed** - Finished tasks (30-day view)
4. **🗑️ Deleted** - Deleted tasks (30-day history)

---

## ⚡ Key Features

### **Move to Pending**
Each task in the "Today" tab has two action buttons:
- **⏳ Pending Button** - Move task to the Pending tab (save for later)
- **🗑️ Delete Button** - Delete task permanently

**How to use:**
1. Click the **⏳** button on any task
2. Task moves to the "Pending" tab
3. Your "Today" tab now has space for more tasks
4. Move task back anytime when ready

### **Move Back to Today**
In the "Pending" tab:
1. Click the **📌** button on any pending task
2. Task moves back to "Today" tab
3. If "Today" is full (5 tasks), you'll see an alert

### **Task Carryover from Yesterday**
- Incomplete tasks automatically carry forward to the next day
- They show a **📅 FROM YESTERDAY** label
- Move them to Pending if not ready yet

### **Clear Pending**
- Delete all pending tasks at once
- Button appears only when pending tasks exist
- Shows confirmation dialog before clearing

---

## 💡 Use Cases

### **Scenario 1: Too Many Tasks Today**
```
Today (5/5 - FULL):
1. ✓ Finish report (High priority)
2. ✓ Client meeting (High priority)  
3. ✓ Code review (Medium priority)
4. ✓ Fix bug (Medium priority)
5. ✓ Update docs (Low priority)

New task comes in: "Redesign dashboard"
→ Move one to Pending, add new task to Today
```

### **Scenario 2: Not Ready Yet**
```
Today Tab:
- ✓ Call dentist (Medium priority)

You realize: Not ready to call today, too busy
→ Click ⏳ button
→ Task moves to Pending
→ You focus on other priorities
→ Click 📌 to move back when ready
```

### **Scenario 3: Long-term Project**
```
Today: Daily sprint tasks
Pending: 
- Design new feature (start next month)
- Refactor codebase (start next quarter)
→ Keeps pending work visible without distracting from today
```

---

## 🎮 Interaction Guide

### **Today Tab**
```
Task Item Layout:
[≡ drag] [☑ checkbox] [🔴 priority] "Task text" [📅 FROM YESTERDAY] [⏳ Pending] [🗑️ Delete]
                                                          ↑                    ↑         ↑
                                                      (if carryover)      (new!)  (existing)
```

**Actions:**
- **☑ Checkbox** - Mark complete (moves to "Completed" tab)
- **⏳ Pending** - Move to Pending tab (NEW!)
- **🗑️ Delete** - Delete permanently
- **≡ Drag** - Reorder with drag-and-drop

### **Pending Tab**
```
Task Item Layout:
[≡ drag] [📌 move to today] [🔴 priority] "Task text" [🗑️ Delete]
                    ↑
                 (new!)

Buttons:
[🗑️ Clear Pending] - Delete all at once
```

**Actions:**
- **📌 Pin** - Move back to Today (NEW!)
- **🗑️ Delete** - Delete permanently
- **≡ Drag** - Reorder

---

## 📊 Data Persistence

All pending tasks are automatically saved to localStorage:
- **File:** `daycontrol_pending_tasks`
- **Location:** Browser storage (offline-first)
- **Survives:** Page refreshes, app restarts
- **Synced:** Across all browser tabs

---

## 🎯 Best Practices

### **Daily Workflow**
1. **Morning:** Review "Today" tab (max 5 tasks)
2. **During Day:** Complete tasks, move blocked ones to Pending
3. **Evening:** Check Pending for tomorrow
4. **Next Day:** Move important Pending tasks back to Today

### **Keeping Pending Clean**
- **Weekly Review:** Check Pending tasks every Friday
- **Clear Old:** Remove tasks that no longer matter
- **Prioritize:** What belongs in Today vs. Pending?

### **With Task Carryover**
- **Incomplete Today tasks** → Auto-carry to tomorrow
- **Not ready yet?** → Move to Pending instead
- **Result:** Fresh Today tab, organized Pending queue

---

## 📈 Workflow Example

### **Monday (Today Tab)**
```
🎯 Today's Focus (5/5 FULL):
1. ✓ Finish quarterly report (High 🔴)
2. ✓ Team standup (High 🔴)
3. ✓ Code review (Medium 🟡)
4. ✓ Fix login bug (Medium 🟡)
5. ✓ Update README (Low 📌)

New task: "Design new dashboard" (High)
→ Problem: Already at 5 tasks!
→ Solution: Move "Update README" to Pending
→ Now: Space for "Design dashboard"
```

### **Monday Evening (Pending Tab)**
```
⏳ Pending Tasks:
1. Update README (Low 📌)           [📌 Move to Today] [🗑️ Delete]
2. Refactor auth module (High 🔴)  [📌 Move to Today] [🗑️ Delete]
3. Write unit tests (Medium 🟡)    [📌 Move to Today] [🗑️ Delete]

Status: 3 pending, ready for next week
```

### **Tuesday (Today Tab)**
```
🎯 Today's Focus (3/5):
1. ✓ Morning standup (High 🔴)
2. 📅 Finish report (High 🔴) [FROM YESTERDAY]
3. ✓ New feature demo (Medium 🟡)

Incomplete from yesterday auto-carried forward!
Move it to Pending if still blocked, or finish today.
```

---

## 🔄 Task Status Flow

```
┌─────────────────────────────────────────┐
│         NEW TASK CREATED                │
└──────────────────┬──────────────────────┘
                   │
                   ▼
        ┌──────────────────┐
        │   TODAY TAB      │ (Max 5)
        │  (Active focus)  │
        └──────┬───────┬──┘
               │       │
        ┌──────▼───┐   └─────────────────┐
        │ COMPLETE │                     │
        │   ✅     │              ┌──────▼──────┐
        └─────┬────┘              │ INCOMPLETE │
              │                   │ (Stay or?)  │
              │              ┌────┴─┬──────────┘
        ┌─────▼────────┐    │      │
        │ COMPLETED    │    │      ▼
        │ TAB (view)   │    │  ┌──────────────┐
        └──────────────┘    │  │ NEXT DAY:    │
                            │  │ Auto-Carry ➜ │
                            │  │ OR ➜ Pending │
                            │  └──────────────┘
                            │
                ┌───────────┘
                │
        ┌───────▼──────────┐
        │   PENDING TAB    │ (Unlimited)
        │  (Save for later)│
        │   ➜ Move back ➜  │ (Anytime)
        └─────────────────┘
```

---

## ⚙️ Technical Details

### **Data Structure**

**Pending Task Object:**
```javascript
{
    id: 1234567890,                    // Unique ID
    text: "Design dashboard",           // Task description
    priority: "high",                  // high|medium|low
    completed: false,                  // Always false in Pending
    created: "2025-01-02T...",         // Created timestamp
    movedToPendingAt: "2025-01-02T..." // When moved to Pending
}
```

### **localStorage Keys**
- `daycontrol_tasks` - Today's tasks
- `daycontrol_pending_tasks` - Pending tasks (NEW!)
- `daycontrol_completed_tasks` - Completed tasks (auto-managed)
- `daycontrol_deleted_tasks` - Deleted tasks (30-day retention)

### **Limits**
- **Today Tab:** Max 5 active tasks (hard limit)
- **Pending Tab:** Unlimited tasks (soft suggestions: 20-30)
- **Completed Tab:** All completed tasks (view only)
- **Deleted Tab:** 30-day auto-cleanup

---

## 🆕 What's Different from Before

| Feature | Before | After |
|---------|--------|-------|
| Save non-urgent tasks | ❌ Had to delete | ✅ Move to Pending |
| Task limit on Today | 5 tasks max | 5 tasks max (same) |
| Organize work | ❌ Limited | ✅ Today vs. Pending |
| Move tasks around | ❌ Drag within Today | ✅ Drag + Move to Pending |
| Clear actions | ❌ Delete only | ✅ Clear Pending option |
| Tabs available | 🎯🗑️✅ (3 tabs) | 🎯⏳✅🗑️ (4 tabs) |

---

## 🎯 Quick Reference

| Action | Button | Where | Result |
|--------|--------|-------|--------|
| Move to Pending | ⏳ | Today Tab | Task → Pending |
| Move to Today | 📌 | Pending Tab | Task → Today (if space) |
| Complete | ☑️ | Today Tab | Task → Completed |
| Delete | 🗑️ | Any Tab | Permanently deleted |
| Clear Pending | 🗑️ Clear | Pending Tab | All → Deleted |
| View Completed | Click ✅ | Tabs | Shows all finished |
| View History | Click 🗑️ | Tabs | Shows 30-day deletion history |

---

## 🚀 Pro Tips

1. **Friday Review:** Clear out Pending tasks that no longer matter
2. **Weekly Planning:** Move important Pending tasks back to Today
3. **5-Task Rule:** Keep "Today" focused with only critical items
4. **Organize Pending:** Use priority levels (High 🔴 first)
5. **Avoid Accumulation:** Don't let Pending grow beyond 20-30 tasks

---

## 📞 Support

**Questions?**
- Check "Today's Focus" helps you track daily priorities
- "Pending" keeps important work without daily overwhelm
- Move freely between tabs (no permanent decisions)
- Clear Pending anytime to reset

**App Features:**
- ✅ Guest login (no authentication needed)
- ✅ Offline first (works without internet)
- ✅ Auto-save (all changes saved instantly)
- ✅ Daily carryover (incomplete tasks → next day)
- ✅ 30-day deletion history (undo recovery)

---

## 🎉 Summary

**Pending Tasks lets you:**
- ✅ Save non-urgent work for later
- ✅ Keep "Today" focused (max 5)
- ✅ Organize by time (Today vs. Pending)
- ✅ Move freely between tabs
- ✅ Clear Pending anytime
- ✅ Never lose important tasks

**Perfect for:** Managing overflow, long-term projects, blocking tasks, and staying focused!

---

**Version:** 1.0 Pending Feature  
**Added:** Daily task carryover + Pending tab + Move actions  
**Status:** ✅ Production Ready
