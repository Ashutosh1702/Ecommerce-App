# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your project pushed to GitHub

## Step-by-Step Deployment

### 1. Prepare Your Project
The project is now configured for Vercel deployment with:
- ✅ `vercel.json` configuration file
- ✅ Updated `vite.config.js` with proper build settings

### 2. Push to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 3. Deploy on Vercel

#### Option A: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. **IMPORTANT**: Set the root directory to `Fronted` (not the project root)
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd Fronted

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? (enter name)
# - In which directory is your code located? ./
```

### 4. Environment Variables (if needed)
If your app uses environment variables:
1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add your variables (e.g., API URLs)

## Common Issues & Solutions

### Issue 1: "Build failed"
- **Cause**: Asset import errors or missing dependencies
- **Solution**: Check the build logs and fix import paths

### Issue 2: "404 on page refresh"
- **Solution**: Already handled by `vercel.json` routing configuration

### Issue 3: "Assets not loading"
- **Solution**: Updated `vite.config.js` with proper base path

### Issue 4: "API calls failing"
- **Cause**: Backend not deployed
- **Solution**: 
  - Deploy backend separately (Heroku, Railway, etc.)
  - Update API URLs in your React app
  - Or use a hosted database service

## Backend Deployment Options

Since your backend uses JSON Server, consider these options:

### Option 1: Railway
```bash
# In Backend directory
echo "web: npm start" > Procfile
# Push to GitHub and deploy on Railway
```

### Option 2: Heroku
```bash
# In Backend directory
echo "web: npm start" > Procfile
# Deploy to Heroku
```

### Option 3: Vercel Serverless Functions
Convert your JSON Server to Vercel serverless functions for a complete Vercel deployment.

## Post-Deployment Checklist
- [ ] Frontend deployed successfully
- [ ] All pages load correctly
- [ ] Images and assets display properly
- [ ] Routing works (no 404s on refresh)
- [ ] Backend API accessible (if deployed separately)
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)

## Troubleshooting Commands

```bash
# Test build locally
cd Fronted
npm run build
npm run preview

# Check for build errors
npm run build 2>&1 | tee build.log
```

## Notes
- The `Fronted` directory contains your React app
- Make sure to deploy only the frontend directory, not the entire project
- Backend needs separate deployment if you want full functionality
