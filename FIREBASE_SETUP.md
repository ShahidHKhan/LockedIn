# Firebase Setup Guide

## Quick Setup Steps

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name (e.g., "LockedIn")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Add Web App
1. In project overview, click the **Web** icon `</>`
2. Register app with a nickname (e.g., "LockedIn Web App")
3. Don't select "Firebase Hosting" for now
4. Click "Register app"
5. **Copy the firebaseConfig object** - you'll need this!

### 3. Enable Email/Password Authentication
1. In the left sidebar, click **Authentication**
2. Click "Get started"
3. Click on the **Sign-in method** tab
4. Click on "Email/Password"
5. Enable the **first toggle** (Email/Password)
6. Click "Save"

### 4. Configure Your App

Open `src/firebase/config.js` and replace the config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // From Firebase Console
  authDomain: "project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```

### 5. Test Your App

```bash
npm start
```

Try registering a new user:
1. Go to http://localhost:3000
2. Click "Register"
3. Fill in username, email, and password
4. Click "Register"
5. You should be redirected to the home page!

### 6. View Users in Firebase Console

1. Go back to Firebase Console
2. Click **Authentication** > **Users** tab
3. You should see your newly registered user!

## Common Issues

### "Firebase: Error (auth/invalid-api-key)"
- Check that you copied the API key correctly
- Make sure there are no extra spaces or quotes

### "Firebase: Error (auth/operation-not-allowed)"
- Email/Password authentication is not enabled
- Go to Authentication > Sign-in method and enable it

### "Firebase: Error (auth/weak-password)"
- Password must be at least 6 characters

## Security Note

⚠️ **Never commit real Firebase credentials to public repositories!**

For production apps, use environment variables:
1. Create a `.env` file (already in .gitignore)
2. Add your config as environment variables
3. Reference them using `process.env.REACT_APP_FIREBASE_API_KEY`, etc.
