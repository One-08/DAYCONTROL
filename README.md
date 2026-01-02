# DayControl - Daily Task Management App

A cross-platform task management application built with React Native and Expo, designed to help users manage daily tasks efficiently with intelligent carryover, notifications, and multi-platform support (Android, iOS, and Web).

## 🎯 Features

### Core Functionality
- **Daily Task Management**: Create up to 5 tasks per day
- **Priority Levels**: Set Low, Medium, or High priority for each task
- **Task Completion**: Check off completed tasks with visual feedback
- **Task Carryover**: Incomplete tasks automatically carry forward to the next day
- **Future Planning**: Plan and manage tasks for future dates
- **Completed Tasks Archive**: View and track completed tasks by date

### Authentication
- **Google Sign-In**: Seamless authentication via Google Account
- **Apple Sign-In**: Support for Apple ID authentication (iOS and Web)
- **Secure Storage**: User data securely stored locally

### Notifications
- **Smart Reminders**: Get notified about pending tasks
- **Priority Notifications**: Receive alerts for high-priority incomplete tasks
- **Daily Brief**: Morning notification to review daily tasks
- **Completion Alerts**: Encouragement notifications as you complete tasks

### Multi-Platform
- ✅ **Android**: Fully supported
- 📱 **iOS**: Build ready (future deployment)
- 🌐 **Web**: Export ready (future deployment)

## 📋 Project Structure

```
DayControl/
├── App.js                          # Root component with navigation setup
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── babel.config.js                 # Babel configuration
├── src/
│   ├── screens/                    # Screen components
│   │   ├── AuthScreen.js           # Login screen
│   │   ├── HomeScreen.js           # Main navigation hub
│   │   ├── TodayTasksScreen.js    # Today's tasks management
│   │   ├── CompletedTasksScreen.js # Completed tasks view
│   │   ├── FutureTasksScreen.js   # Future tasks planning
│   │   └── ProfileScreen.js        # User profile & settings
│   ├── components/                 # Reusable components
│   │   ├── TaskCard.js             # Individual task display
│   │   └── AddTaskButton.js        # FAB for adding tasks
│   ├── contexts/                   # React Context for state
│   │   ├── AuthContext.js          # Authentication state
│   │   └── TaskContext.js          # Task management state
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.js              # Authentication logic
│   │   └── useTask.js              # Task management logic
│   ├── services/                   # Business logic services
│   │   ├── AuthService.js          # Google/Apple auth
│   │   └── NotificationService.js  # Push notifications
│   ├── database/                   # Data persistence
│   │   └── db.js                   # SQLite database operations
│   └── styles/                     # Theme and styling
│       └── Colors.js               # Color palette & design tokens
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For Android: Android Studio (optional, but recommended)
- For iOS: Xcode (Mac only)
- Expo Go app on your device (for testing)

### Installation

1. **Clone the repository**
   ```bash
   cd /home/vish/snap/DayControl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Authentication** (IMPORTANT)
   
   **Google Sign-In Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials (Web application, Android, iOS)
   - Replace `YOUR_GOOGLE_CLIENT_ID` in `src/services/AuthService.js` with your actual Client ID
   - Update `package.json` if needed with your Google Client IDs
   
   **Apple Sign-In Setup:**
   - Go to [Apple Developer Console](https://developer.apple.com/)
   - Create a new App ID with Sign in with Apple capability
   - Update the bundle identifier in `app.json`
   - Update the Apple Team ID in `package.json` (expo configuration)

4. **Start the development server**
   ```bash
   npm start
   ```

### Running on Android

**Option 1: Using Expo Go App**
```bash
npm run android
```
Then scan the QR code with Expo Go app on your Android device

**Option 2: Android Emulator**
```bash
npm run android
```
Make sure Android emulator is running

**Option 3: EAS Build (for production)**
```bash
npm install -g eas-cli
eas login
eas build --platform android
```

### Running on iOS (Mac only)

**Option 1: Using Expo Go App**
```bash
npm run ios
```

**Option 2: iOS Simulator**
```bash
npm run ios
```

**Option 3: EAS Build (for production)**
```bash
eas build --platform ios
```

### Running on Web

```bash
npm run web
```
This will open your default browser at `http://localhost:19006`

## 📱 Key Features Explained

### Daily Task Management
- Users can create up to 5 tasks per day
- Each task has:
  - Title (required)
  - Description (optional)
  - Priority level (Low/Medium/High)
  - Due date (defaults to today)

### Task Carryover System
- Every morning, the app checks for incomplete tasks from yesterday
- Incomplete tasks are automatically moved to today's list
- Users can see which tasks were carried over (marked with ↻ icon)
- This ensures important tasks don't get forgotten

### Notifications
- **9 AM Daily**: "Good Morning! Check your tasks for today"
- **On Task Completion**: Motivational message with remaining task count
- **On All Tasks Done**: Celebration message when all tasks completed
- **Smart Reminders**: Continuous reminders for incomplete tasks

### Data Persistence
- All data stored locally using SQLite database
- Automatic backup of completed tasks
- No data loss on app restart
- Encrypted user credentials

## 🔐 Security Features

- User authentication via secure OAuth 2.0 (Google/Apple)
- Local SQLite database with proper schema
- No sensitive data stored in plain text
- Secure AsyncStorage for user preferences
- Regular database backups

## 🎨 Design & UX

### Color Scheme
- Primary: #FF6B6B (Coral Red)
- Secondary: #4ECDC4 (Teal)
- Success: #4CAF50 (Green)
- Warning: #FF9800 (Orange)
- Error: #FF5252 (Red)

### Navigation Structure
- **Bottom Tab Navigation**: 4 main sections
  - Today's Tasks
  - Completed Tasks
  - Future Plans
  - Profile

## 🔄 Daily Reset Logic

Every morning, the app:
1. Fetches incomplete tasks from yesterday
2. Creates new instances for today
3. Marks them as "carried over"
4. Keeps original completed status
5. Suggests same recurring tasks if enabled

## 📊 Task States

```
Task Lifecycle:
├── Created → Pending
├── Pending → Completed (marked done)
├── Pending → Carried Over (not done, next day)
├── Completed → Archived (end of day)
└── Archived → Viewable in history
```

## 🛠 Development

### Adding New Features

1. **New Database Schema**:
   - Update `src/database/db.js`
   - Add migration logic if needed

2. **New Screens**:
   - Create in `src/screens/`
   - Update navigation in `App.js` or `HomeScreen.js`

3. **New Components**:
   - Create in `src/components/`
   - Import and use in screens

4. **New Services**:
   - Create in `src/services/`
   - Export and use via hooks

### Testing

Manual testing steps:
1. Create 3-5 tasks for today
2. Complete some tasks
3. Check notifications appear
4. Restart app and verify data persistence
5. Check task carryover next day

## 🚀 Future Enhancements

- [ ] Recurring task templates
- [ ] Task categories/tags
- [ ] Sync with cloud backend (Firebase)
- [ ] Team collaboration features
- [ ] Dark mode theme
- [ ] Analytics dashboard
- [ ] Export tasks to calendar
- [ ] Voice commands for task creation
- [ ] Widget support
- [ ] Offline-first sync with backend

## 📦 Dependencies

### Core
- `expo`: Cross-platform development
- `react-native`: Mobile framework
- `react-navigation`: Navigation

### Authentication
- `expo-auth-session`: OAuth handling
- `expo-google-app-auth`: Google Sign-In
- `expo-apple-authentication`: Apple Sign-In

### Database & Storage
- `expo-sqlite`: Local database
- `@react-native-async-storage/async-storage`: Key-value storage

### Notifications
- `expo-notifications`: Push notifications
- `expo-task-manager`: Background tasks

### Utilities
- `uuid`: Unique ID generation
- `react-native-safe-area-context`: Safe area handling

## 🐛 Troubleshooting

### Google Sign-In Not Working
- Verify Client ID is correct
- Check redirect URI is configured
- Ensure Google+ API is enabled
- Clear app cache: `expo cache --clear`

### Apple Sign-In Issues
- Verify Apple Team ID in `app.json`
- Check bundle identifier matches
- Ensure certificate is provisioned
- Run on physical device (simulator may have issues)

### Notifications Not Appearing
- Check notification permissions are granted
- Verify app is in foreground
- Check device notification settings
- Test with `expo push notifications`

### Database Errors
- Clear app data and cache
- Delete `DayControl.db` file
- Reinstall app
- Check SQLite queries in console

## 📝 License

MIT License - feel free to modify and distribute

## 👨‍💻 Support

For issues or feature requests, please open an issue in the repository.

## 🎉 Getting Help

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [SQLite Documentation](https://www.sqlite.org/docs.html)

---

**Happy tasking! 🎯**

*Manage your day, one task at a time.*
