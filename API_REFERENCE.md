# DayControl API & Code Reference

## 🔐 Authentication API

### AuthService.js

```javascript
// Google Sign-In
signInWithGoogle()
  → Returns: { id, email, name, provider }
  → Throws: Error on failure
  → Saves user to: AsyncStorage + Database

// Apple Sign-In
signInWithApple()
  → Returns: { id, email, name, provider }
  → Throws: Error on failure
  → iOS/Web only

// Sign Out
signOut()
  → Clears: User data from AsyncStorage
  → Returns: boolean success

// Get Stored User
getStoredUser()
  → Returns: User object or null
  → Retrieves from: AsyncStorage
```

---

## 📝 Database API

### db.js (SQLite Operations)

#### Initialization
```javascript
initializeDatabase()
  → Creates: 3 tables (users, tasks, completed_tasks)
  → Returns: Database instance
  → Call once on app startup
```

#### User Operations
```javascript
saveUser(user: { email, name, provider })
  → Creates new user record
  → Returns: userId (UUID)

getUserByEmail(email: string)
  → Retrieves user by email
  → Returns: User object or null
```

#### Task Operations
```javascript
addTask(userId, task: { title, description, dueDate, priority, isRecurring })
  → Creates new task
  → Returns: taskId (UUID)

getTasksForDate(userId, date: "YYYY-MM-DD")
  → Returns: Array of tasks for specific date
  → Returns: [] if no tasks

completeTask(taskId)
  → Marks task as complete
  → Sets: completedAt timestamp
  → Returns: boolean success

updateTask(taskId, updates: object)
  → Updates task fields
  → Fields: any (title, description, priority, etc.)
  → Returns: boolean success

deleteTask(taskId)
  → Removes task from database
  → Returns: boolean success

getCompletedTasksForDate(userId, date)
  → Returns: Array of completed tasks
  → Sorted: by completedAt descending

getIncompleteTasks(userId)
  → Returns: All incomplete tasks
  → Sorted: by dueDate ascending

carryForwardIncompleteTasks(userId, fromDate, toDate)
  → Copies incomplete tasks to new date
  → Marks: isCarriedOver = true
  → Returns: boolean success
```

---

## 🎯 Task Context API

### useTask() Hook

```javascript
// State
state: {
  tasks: Task[],           // Today's incomplete tasks
  completedTasks: Task[],  // Today's completed tasks
  futureTasks: Task[],     // Future planned tasks
  loading: boolean,
  error: string | null
}

// Methods
addTask(taskData): Promise<taskId>
  → Creates new task
  → Triggers: notification scheduling
  → Updates: UI immediately

loadTasks(date: "YYYY-MM-DD"): Promise<void>
  → Fetches tasks for specific date
  → Loads: incomplete and completed tasks
  → Updates: state automatically

completeTask(taskId): Promise<void>
  → Marks task complete
  → Sends: motivation notification
  → Updates: task state

updateTask(taskId, updates): Promise<void>
  → Modifies task fields
  → Updates: database and state

deleteTask(taskId): Promise<void>
  → Removes task
  → Updates: UI immediately

carryForwardTasks(): Promise<void>
  → Auto-carries incomplete tasks
  → Runs: typically daily
```

---

## 🔔 Notification API

### NotificationService.js

```javascript
setupNotifications()
  → Requests: Permission from user
  → Schedules: 9 AM daily reminder
  → Registers: Background task
  → Returns: void

sendTaskNotification(title: string, body: string)
  → Sends: Immediate notification
  → Shows: In foreground
  → Params:
    - title: Notification heading
    - body: Notification message

scheduleTaskReminder(taskId, dueDate, taskTitle)
  → Schedules: Notification for task date
  → Time: 9 AM on due date
  → Returns: void

cancelNotification(notificationId)
  → Dismisses: Scheduled notification
  → Returns: void
```

---

## 🧪 Component API

### TaskCard Component

```javascript
Props: {
  task: {
    id: string,
    title: string,
    description?: string,
    priority: 0|1|2,  // 0=Low, 1=Medium, 2=High
    completed: 0|1,
    isCarriedOver?: boolean
  },
  isCompleted?: boolean,  // Visual indicator
  onComplete?: () => void,  // Checkbox handler
  onDelete?: () => void    // Delete handler
}

Rendering:
  - Shows: Checkbox, Title, Description, Priority Badge
  - If completed: Shows ✓, gray text, strikethrough
  - Shows: Delete button if onDelete provided
  - Shows: Carried Over badge if applicable
```

### AddTaskButton Component

```javascript
Props: {
  onPress: () => void  // Called when button tapped
}

Styling:
  - Position: FAB (Floating Action Button)
  - Bottom-right corner
  - Icon: "+"
  - Color: Primary red (#FF6B6B)
```

---

## 🗂️ Screen Props & Navigation

### Navigation Stack

```javascript
// Root Stack (Conditional)
Auth → AuthScreen          // When not logged in
Home → HomeScreen          // When logged in

// Tab Navigation (Inside Home)
Today → TodayTasksScreen
Completed → CompletedTasksScreen
Future → FutureTasksScreen
Profile → ProfileScreen

// Modals (Inside Today)
AddTaskModal → Appears on FAB tap
```

---

## 🎨 Colors & Styling

### Available Colors

```javascript
import { Colors } from '../styles/Colors'

Colors.primary           // #FF6B6B - Main brand color
Colors.secondary         // #4ECDC4 - Accent
Colors.background        // #F8F9FA - Page background
Colors.surface           // #FFFFFF - Card background
Colors.text              // #2D3436 - Body text
Colors.textSecondary     // #636E72 - Disabled/secondary
Colors.border            // #E1E8ED - Dividers
Colors.success           // #4CAF50 - Green
Colors.warning           // #FF9800 - Orange
Colors.error             // #FF5252 - Red
Colors.google            // #1F2937 - Google button
Colors.apple             // #000000 - Apple button
```

### Using Colors

```javascript
// In StyleSheet
const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    color: Colors.text
  }
});

// In Component
<View style={{ backgroundColor: Colors.surface }} />
```

---

## 🔄 State Management Flow

### Auth Context

```
User Logs In
    ↓
AuthService → signInWithGoogle/Apple
    ↓
User data to AsyncStorage
    ↓
AuthContext.signIn(user)
    ↓
authReducer → SIGN_IN action
    ↓
state.user = user object
    ↓
App navigates to HomeScreen
```

### Task Context

```
User creates task
    ↓
TaskContext.addTask(taskData)
    ↓
addTask() → SQLite
    ↓
taskReducer → ADD_TASK action
    ↓
state.tasks updated
    ↓
UI re-renders with new task
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  authProvider TEXT,  -- 'google' or 'apple'
  createdAt TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  userId TEXT FOREIGN KEY,
  title TEXT NOT NULL,
  description TEXT,
  dueDate DATE NOT NULL,  -- Format: YYYY-MM-DD
  completed BOOLEAN,      -- 0 or 1
  priority INTEGER,       -- 0, 1, or 2
  isRecurring BOOLEAN,    -- 0 or 1
  recurringDays TEXT,     -- JSON array string
  isCarriedOver BOOLEAN,  -- 0 or 1
  completedAt TIMESTAMP,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
```

### Completed Tasks Table
```sql
CREATE TABLE completed_tasks (
  id TEXT PRIMARY KEY,
  originalTaskId TEXT,
  userId TEXT FOREIGN KEY,
  title TEXT,
  completedDate DATE,
  completedAt TIMESTAMP
);
```

---

## 🛠️ Common Usage Examples

### Create a Task

```javascript
const { addTask } = useContext(TaskContext);

await addTask({
  title: 'Buy groceries',
  description: 'Milk, eggs, bread',
  dueDate: '2025-12-31',
  priority: 1,  // Medium
  isRecurring: false
});
```

### Complete a Task

```javascript
const { completeTask } = useContext(TaskContext);

await completeTask(taskId);
// Triggers notification & UI update
```

### Get Today's Tasks

```javascript
const { loadTasks } = useContext(TaskContext);

const today = new Date().toISOString().split('T')[0];
await loadTasks(today);
// state.tasks and state.completedTasks updated
```

### Sign Out

```javascript
const { signOut } = useContext(AuthContext);

await signOut();
// User returned to AuthScreen
```

---

## 🐛 Error Handling

### Common Errors

```javascript
// Database not initialized
if (!db) return null;

// Missing user ID
if (!authState.user) return;

// Task limit exceeded
if (taskContext.state.tasks.length >= 5) {
  Alert.alert('Limit Reached', 'Max 5 tasks per day');
}

// Permission denied
if (status !== 'granted') {
  console.log('Permission denied');
}
```

---

## 📱 Platform-Specific Code

### Platform Detection

```javascript
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // Android-specific code
}

if (Platform.OS === 'ios') {
  // iOS-specific code
}

if (Platform.OS === 'web') {
  // Web-specific code
}
```

### Apple Sign-In (iOS/Web Only)

```javascript
if (Platform.OS === 'ios') {
  <TouchableOpacity onPress={handleAppleSignIn}>
    <Text>Sign in with Apple</Text>
  </TouchableOpacity>
}
```

---

## 🔗 Useful Links

- **Expo Docs**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **SQLite Docs**: https://www.sqlite.org/docs.html
- **React Navigation**: https://reactnavigation.org
- **Notifications**: https://docs.expo.dev/versions/latest/sdk/notifications/

---

## 📞 Quick Reference

| Task | Code | File |
|------|------|------|
| Add task | `addTask()` | useTask hook |
| Complete task | `completeTask()` | useTask hook |
| Delete task | `deleteTask()` | useTask hook |
| Get tasks | `loadTasks()` | useTask hook |
| Sign in | `signInWithGoogle()` | AuthService |
| Sign out | `signOut()` | AuthService |
| Send notification | `sendTaskNotification()` | NotificationService |
| Query DB | `getTasksForDate()` | db.js |

---

*This API reference covers all major functions and data structures in the DayControl app.*
