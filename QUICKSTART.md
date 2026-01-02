# 🚀 Quick Start - 5 Minutes to Running

## Prerequisites
- Node.js installed (`node --version`)
- Expo CLI (`npm install -g expo-cli`)
- Android emulator running OR phone with Expo Go app

## Step 1: Install (1 minute)
```bash
cd /home/vish/snap/DayControl
npm install
```

## Step 2: Configure Google (2 minutes)

**Get your Google Client ID:**
1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials (Android)
5. Add SHA-1 of debug key from Google Console
6. Copy the Client ID

**Update the app:**
Open `src/services/AuthService.js` and replace:
```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

## Step 3: Run! (1 minute)

### Option A: On Device with Expo Go
```bash
npm start
# Scan QR code with Expo Go app
```

### Option B: Android Emulator
```bash
npm run android
```

### Option C: Web Browser
```bash
npm run web
```

## Step 4: Test

1. Sign in with Google
2. Create a task (click +)
3. Complete it (tap checkbox)
4. Check notifications
5. Done! ✅

---

## What You Just Got

✅ Daily task management app
✅ Google & Apple authentication
✅ Task completion tracking
✅ Automatic task carryover
✅ Push notifications
✅ Works offline

---

## Documentation

- **Full Setup**: See `SETUP_GUIDE.md`
- **Features**: See `README.md`
- **Visual Guide**: See `VISUAL_GUIDE.md`
- **Code Ref**: See `API_REFERENCE.md`
- **Project Info**: See `PROJECT_SUMMARY.md`

---

## Common Issues

| Issue | Fix |
|-------|-----|
| "Module not found" | Run `npm install` again |
| Google Sign-In fails | Check Client ID is correct |
| Can't connect to device | Same WiFi, firewall check |
| App crashes on startup | Clear cache: `expo cache --clear` |

---

## Next Steps

1. ✅ Get it running
2. Test all features
3. Set up iOS build (Mac only)
4. Deploy when ready

---

**Ready? Start with Step 1!** 🎉

For detailed instructions, see `SETUP_GUIDE.md`
