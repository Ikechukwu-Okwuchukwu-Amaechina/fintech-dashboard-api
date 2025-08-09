# Simple Fintech Dashboard Frontend

This is a basic HTML/CSS/JavaScript frontend for the fintech dashboard.

## Files

- `index.html` - Home page (redirects to login or dashboard)
- `login.html` - Login page
- `dashboard.html` - Main dashboard page
- `signup.html` - Sign up page
- `test.html` - Test page to check if backend is working
- `js/main.js` - Simple JavaScript functions

## How to Test Locally

1. Make sure your backend server is running on http://localhost:5000
2. Open any HTML file in your browser
3. Try logging in with a test account

## Deploy to Vercel (Easy Way)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Connect your GitHub repo
5. Select the `client` folder
6. Click "Deploy"

## Important Settings for Vercel

After deployment, you need to tell your frontend where your backend is:

1. Go to your Vercel project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add: `BACKEND_API_URL` = `your-backend-url` (like https://your-app.railway.app)
5. Click "Redeploy"

## Update Backend CORS

In your backend `app.js` file, add your frontend URL to the allowed origins:

```javascript
const allowedOrigins = [
  'https://your-frontend.vercel.app',  // Add your Vercel URL here
  'http://localhost:3000',
  'http://localhost:5000'
];
```

## How It Works

1. User opens the website
2. If not logged in, goes to login page
3. User enters username and password
4. Frontend sends request to backend `/api/auth/login`
5. Backend sends back a token
6. Frontend saves token in browser storage
7. User can now access dashboard and make transactions

## No Advanced Code

- Uses simple XMLHttpRequest (not fetch)
- Uses simple functions (not async/await)
- Uses basic event handling
- Uses plain JavaScript (no frameworks)
