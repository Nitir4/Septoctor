# Firebase Setup Instructions for Septoctor

## Step 1: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the **gear icon** ⚙️ next to "Project Overview"
4. Select **Project settings**
5. Scroll down to "Your apps" section
6. If you haven't added a web app:.

   - Click the **</>** (web) icon
   - Register your app with a nickname (e.g., "Septoctor Web")
   - Click "Register app"
7. Copy your Firebase configuration values

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** from the left sidebar
2. Click on **Get Started** (if first time)
3. Go to **Sign-in method** tab
4. Enable the following providers:
   - **Email/Password**: Click on it, toggle "Enable", and save
   - **Google**: Click on it, toggle "Enable", select a support email, and save

## Step 3: Configure Firebase in Your App

1. Open the `.env.local` file in your Septoctor project
2. Replace the placeholder values with your actual Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-actual-app-id
```

## Step 4: Create Test Users (Optional)

1. In Firebase Console, go to **Authentication** > **Users** tab
2. Click **Add user**
3. Enter email and password
4. Click **Add user**

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings** tab
2. Under **Authorized domains**, make sure these are added:
   - `localhost` (for local development)
   - Your production domain (when you deploy)

## Step 6: Restart Development Server

After configuring `.env.local`:

```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## Testing the Login

1. **Email/Password Login**:
   - Enter the email and password you created in Firebase
   - Select a position
   - Click "Login"

2. **Google Sign-in**:
   - Click "Sign in with Gmail"
   - Select your Google account
   - The position will default to "doctor" if not selected

## Features Implemented

✅ Email/Password authentication
✅ Google OAuth sign-in
✅ Error handling with user-friendly messages
✅ Loading states during authentication
✅ Toast notifications for success/error
✅ Position selection for role-based access

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- All Firebase config uses `NEXT_PUBLIC_` prefix as they're client-side
- Consider adding Firebase Security Rules in production

## Troubleshooting

**Popup blocked error**: Enable popups in your browser for localhost
**Invalid credentials**: Make sure user exists in Firebase Authentication
**Configuration error**: Double-check all values in `.env.local`
