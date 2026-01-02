# 📱 DayControl v1.0.0 - APK Generation Guide

## Quick Start: Generate APK in 5 Steps

### Step 1: Install EAS CLI (One-time Setup)
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo Account
```bash
eas login
```
- If you don't have an Expo account, create one at https://expo.dev
- Follow the prompts to login

### Step 3: Configure Project (One-time)
```bash
cd /home/vish/snap/DayControl
eas build:configure
```
- Select platform: **Android**
- Choose managed workflow: **Yes**
- This creates `eas.json` configuration file

### Step 4: Build APK
```bash
eas build --platform android --type apk
```

**What this does:**
- Builds the app for Android
- Generates an APK file
- Uploads it to Expo's servers
- Provides a download link

**Typical build time:** 5-10 minutes

### Step 5: Download & Install
- EAS will provide a download link in the terminal
- Download the APK file
- Transfer to Android phone or use emulator
- Install: `adb install app-release.apk` (if using emulator)

---

## 🎯 Complete Step-by-Step Commands

```bash
# 1. Navigate to project
cd /home/vish/snap/DayControl

# 2. Install EAS CLI (if not already installed)
npm install -g eas-cli

# 3. Login to Expo
eas login

# 4. Configure for Android (first time only)
eas build:configure

# 5. Build APK
eas build --platform android --type apk

# 6. Wait for build to complete
# You'll see: "Build request sent to EAS"
# Monitor progress at: https://expo.dev/builds

# 7. Download APK when ready
# Click the download link from terminal output
```

---

## ⚡ Alternative: Build Local APK (Without EAS)

If you want to build locally without using Expo's cloud:

```bash
# 1. Install Android SDK and tools
# This requires Android Studio or command-line tools

# 2. Use Expo's local building
cd /home/vish/snap/DayControl
npm install -g eas-cli
eas build --platform android --type apk --local

# This builds on your computer instead of Expo's servers
# Requires: Java, Android SDK, Gradle
```

**Note:** Local building requires more setup. Cloud build (EAS) is easier.

---

## 📊 Build Types Explained

### APK (Easier)
```bash
eas build --platform android --type apk
```
- Single file format
- Works on all Android devices
- Easier to distribute
- Smaller file size
- **Recommended for testing**

### AAB (App Bundle - Recommended for Play Store)
```bash
eas build --platform android --type app-bundle
```
- Google Play Store's preferred format
- Optimized file size per device
- Better distribution
- **Required for Play Store submission**
- Converts to APK during installation

**For your initial deployment: Use APK**
**For Play Store submission: Use AAB**

---

## 🔍 What Happens During Build

1. **Code Compilation** - Your JavaScript code is compiled
2. **Asset Bundling** - HTML, CSS, JS files bundled
3. **APK Assembly** - Android APK file created
4. **Cloud Upload** - Sent to Expo's build servers
5. **Signing** - Cryptographically signed for security
6. **Download Ready** - Link provided for download

---

## ✅ Prerequisites Checklist

Before building, ensure:

- [x] EAS CLI installed: `npm install -g eas-cli`
- [x] Expo account created: https://expo.dev
- [x] Logged in locally: `eas login`
- [x] Project configured: `eas build:configure`
- [x] package.json exists in `/home/vish/snap/DayControl`
- [x] app.json configured with correct version
- [x] web/ folder has index.html
- [x] web-server.js exists (for web version)

---

## 🚀 Step-by-Step: First Time Build

### 1. Create Expo Account (if needed)
```
Go to: https://expo.dev
Click: Sign Up
Fill in: Email, password, username
Verify email
```

### 2. Install Tools
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Verify installation
eas --version
```

### 3. Login
```bash
# Login to your Expo account
eas login

# When prompted:
# - Enter email
# - Enter password
# - Success!
```

### 4. Configure Project
```bash
# Navigate to project
cd /home/vish/snap/DayControl

# Run configuration
eas build:configure

# Answer prompts:
# - Platform: android
# - Managed workflow: yes
# - Gradle version: latest (or press Enter)
```

### 5. Build APK
```bash
# Start building
eas build --platform android --type apk

# Output example:
# ✔ Configured project to use EAS
# ✔ Validating project
# ✔ Creating build request
# 
# Build request submitted
# Build ID: abcd1234
# Monitor progress: https://expo.dev/builds/abcd1234
#
# Download: [link to APK]
```

### 6. Download APK
```bash
# Click or copy the download link
# Your APK will be ready in 5-15 minutes
# File name: daycontrol-v1.0.0.apk (or similar)
```

### 7. Install on Phone/Emulator
```bash
# Transfer APK to phone
# Click to install
# Or use adb:
adb install daycontrol-v1.0.0.apk
```

---

## 🔐 Signing & Security

### Automatic Signing (EAS)
- EAS handles all signing automatically
- Uses Google Play signing key
- Secure and production-ready
- No manual steps needed

### Manual Signing (Advanced)
```bash
# If you need to sign manually:
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore keystore.jks \
  app-release.apk \
  alias_name

zipalign -v 4 app-release.apk app-release-aligned.apk
```

**For Play Store: EAS signing is recommended**

---

## 📋 Build Configuration (eas.json)

After `eas build:configure`, you'll have:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

Build commands:
```bash
# Production build (AAB for Play Store)
eas build --platform android --profile production

# Preview build (APK for testing)
eas build --platform android --profile preview
```

---

## 🧪 Testing the APK

### Test on Android Emulator
```bash
# If you have Android Studio installed:
adb install daycontrol-v1.0.0.apk

# Or drag & drop APK into emulator
```

### Test on Real Android Phone
```bash
# 1. Enable Developer Mode:
#    Settings > About phone > Build number (tap 7 times)
# 
# 2. Enable USB Debugging:
#    Settings > Developer options > USB Debugging
#
# 3. Connect phone to computer via USB
#
# 4. Install:
adb install daycontrol-v1.0.0.apk

# 5. Launch app on phone
# Click DayControl icon
```

### Manual Testing Checklist
- [ ] App opens successfully
- [ ] Guest login works
- [ ] Can add tasks
- [ ] Priority dropdown works
- [ ] Can complete tasks
- [ ] Can delete tasks
- [ ] Deleted tab shows deleted tasks
- [ ] Data persists (refresh app)
- [ ] All three tabs work
- [ ] No crashes or errors

---

## 🐛 Troubleshooting

### Issue: "EAS CLI not found"
```bash
# Solution: Install globally
npm install -g eas-cli

# Verify:
eas --version
```

### Issue: "Not logged in"
```bash
# Solution: Login
eas login

# Or logout and login again:
eas logout
eas login
```

### Issue: "Project not configured"
```bash
# Solution: Run configuration
eas build:configure

# Select:
# - Platform: android
# - Managed: yes
```

### Issue: "Build failed"
```bash
# Check logs:
# 1. Go to: https://expo.dev/builds
# 2. Find your build
# 3. Click to see error details
# 4. Common issues:
#    - Wrong Node version
#    - Missing dependencies
#    - Invalid app.json
```

### Issue: "app.json syntax error"
```bash
# Validate JSON:
cd /home/vish/snap/DayControl
cat app.json | python -m json.tool

# Fix any errors and rebuild
```

---

## 📊 Build Size & Performance

Expected metrics:
- **APK Size:** 50-100 MB (varies by optimization)
- **Build Time:** 5-15 minutes
- **Download Time:** Depends on internet speed
- **Installation Time:** 30-60 seconds on phone

---

## 🎯 Next Steps After APK Generation

### For Testing
1. Download APK
2. Install on Android phone/emulator
3. Test all features
4. Report any bugs

### For Play Store Submission
1. Generate AAB: `eas build --platform android --type app-bundle`
2. Wait for build completion
3. Download AAB file
4. Upload to Google Play Console
5. Set app metadata (description, screenshots, etc.)
6. Submit for review

### For Distribution
1. Share APK link with testers
2. Collect feedback
3. Fix any issues
4. Build final production AAB
5. Submit to Play Store

---

## 📱 Download & Install on Your Phone

### For Android Phone
```
1. Download APK from EAS link
2. Transfer to phone (email, cloud, USB)
3. Open file manager on phone
4. Tap APK file
5. Tap "Install"
6. Wait for installation
7. Open app from home screen
```

### For Android Emulator
```bash
# If using Android Studio emulator:
adb install daycontrol-v1.0.0.apk

# Or in Android Studio:
# Run > Select running device > APK file
```

---

## ✨ Pro Tips

1. **Use APK for testing, AAB for Play Store**
   - APK: Faster builds, easier testing
   - AAB: Official format, smaller sizes

2. **Monitor builds at https://expo.dev/builds**
   - See real-time build progress
   - Download previous builds
   - Review build logs

3. **Enable GitHub integration (optional)**
   - Auto-build on commits
   - Webhook notifications
   - Simpler workflow

4. **Keep eas.json in git**
   - Version control your build config
   - Consistency across team

5. **Create app icons early**
   - Required for Play Store
   - Use: https://ronniesun.github.io/icon-builder/

---

## 🎊 Summary

**To generate APK in 3 steps:**

```bash
# 1. Install EAS
npm install -g eas-cli

# 2. Login
eas login

# 3. Build APK
cd /home/vish/snap/DayControl
eas build --platform android --type apk
```

**Then:**
- Wait 5-15 minutes
- Download APK from link
- Install on phone
- Test your app!

---

**Questions?** Check:
- EAS Docs: https://docs.expo.dev/build/
- Expo Discord: https://discord.gg/expo
- Stack Overflow: Tag with [react-native]

**Next Step:** Follow DEPLOYMENT_GUIDE.md for Play Store submission
