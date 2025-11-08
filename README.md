# LockedIn - React Authentication App

A modern React application with Firebase authentication, featuring user registration, login, and protected routes.

## 🚀 Features

- **Firebase Authentication** - Secure user registration and login
- **Protected Routes** - Private routes that require authentication
- **User Context** - Global authentication state management
- **Modern UI** - Responsive design with gradient styling
- **Form Validation** - Client-side validation for user inputs
- **Error Handling** - User-friendly error messages

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account and project

## 🔧 Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Once created, click on "Web" icon to add a web app

2. **Enable Authentication**
   - In Firebase Console, go to "Authentication"
   - Click "Get Started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" authentication

3. **Get Firebase Configuration**
   - In Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the Firebase configuration object

4. **Configure the App**
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

## 💻 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd LockedIn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (see Firebase Setup above)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should automatically open

## 📁 Project Structure

```
LockedIn/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── PrivateRoute.js      # Protected route wrapper
│   ├── contexts/
│   │   └── AuthContext.js       # Authentication context
│   ├── firebase/
│   │   └── config.js            # Firebase configuration
│   ├── pages/
│   │   ├── Home.js              # Home page (protected)
│   │   ├── Home.css
│   │   ├── LoginRegistration.js # Login/Register page
│   │   └── LoginRegistration.css
│   ├── App.js                   # Main app component
│   ├── App.css
│   ├── index.js                 # Entry point
│   └── index.css
├── package.json
└── README.md
```

## 🎯 How It Works

### Authentication Flow

1. **Registration**
   - User fills in username, email, password, and confirms password
   - Firebase creates a new user account
   - User is automatically logged in and redirected to home page

2. **Login**
   - User enters email and password
   - Firebase authenticates the credentials
   - On success, user is redirected to home page

3. **Protected Routes**
   - Home page is protected by `PrivateRoute` component
   - Unauthenticated users are redirected to login page
   - Authenticated users can access protected pages

4. **Logout**
   - User clicks logout button on home page
   - Firebase signs out the user
   - User is redirected to login page

### Key Components

- **AuthContext** - Manages authentication state globally
- **PrivateRoute** - Protects routes requiring authentication
- **LoginRegistration** - Handles user login and registration
- **Home** - Protected home page for authenticated users

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## 🔐 Security Notes

- Never commit your Firebase config with real credentials to public repositories
- Use environment variables for sensitive data in production
- Keep your Firebase API keys secure
- Enable appropriate Firebase security rules

## 🐛 Troubleshooting

**"Firebase not configured" error**
- Make sure you've replaced the placeholder values in `src/firebase/config.js`

**Authentication errors**
- Verify Email/Password authentication is enabled in Firebase Console
- Check that your Firebase project is active

**Module not found errors**
- Run `npm install` to ensure all dependencies are installed

## 📝 License

This project was created for Hackathon 2025.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!