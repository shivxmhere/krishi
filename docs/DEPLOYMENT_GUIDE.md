# Krishi Deployment Guide

## Backend Deployment (Render.com)

### Step 1: Create Render Account
1. Go to render.com
2. Sign up with GitHub

### Step 2: Create PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Name: `krishi-db`
3. Plan: Free
4. Click "Create Database"
5. Copy Internal Database URL

### Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect GitHub repository
3. Configuration:
   - Name: `krishi-backend`
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Instance Type: Free

### Step 4: Add Environment Variables
Add these in Render dashboard:
- DATABASE_URL: [paste from database]
- SECRET_KEY: [generate with: openssl rand -hex 32]
- OPENAI_API_KEY: [your OpenAI key]
- All other variables from .env.example

### Step 5: Verify Deployment
Visit: https://krishi-backend.onrender.com/health

Should return:
```json
{
  "status": "ok",
  "app": "Krishi API",
  "version": "1.0.0",
  "database": "connected",
  "ml_model": "REAL"
}
```

## Mobile App Build (EAS)

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
cd mobile
npx eas login
```

### Step 3: Configure Project
```bash
npx eas build:configure
```

### Step 4: Update API URL
Edit `mobile/app.json`:
```json
"extra": {
  "apiUrl": "https://krishi-backend.onrender.com"
}
```

### Step 5: Build APK
```bash
npx eas build --platform android --profile production
```

### Step 6: Download & Install
1. Wait 10-15 minutes for build
2. Download APK from Expo dashboard
3. Transfer to phone
4. Install (enable Unknown Sources if needed)
5. Open Krishi app
6. Test complete flow

## Troubleshooting

### Backend Issues
- Check logs: Render dashboard → Logs
- Verify DATABASE_URL is set
- Check model file exists: /app/ai-models/trained_models/disease_model.h5

### Mobile Issues
- Clear cache: `npx eas build --platform android --clear-cache`
- Check API URL in app.json
- Verify backend /health endpoint works
