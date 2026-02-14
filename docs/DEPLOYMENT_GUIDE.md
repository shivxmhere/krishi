# 🚀 Krishi Production Deployment Guide

This manual covers the complete deployment of the Krishi platform from local development to production.

## 📑 Table of Contents
1. [Backend Deployment (Render)](#backend-deployment-render)
2. [Database Setup (Render Postgres)](#database-setup-render-postgres)
3. [Mobile App Build (Expo/EAS)](#mobile-app-build-expoeas)
4. [Web Platform Deployment (Vercel)](#web-platform-deployment-vercel)
5. [Monitoring & Logging](#monitoring--logging)
6. [Troubleshooting & Rollback](#troubleshooting--rollback)

---

## 🏗️ Backend Deployment (Render)

### 1. Account Setup
- Sign up at [Render.com](https://render.com).
- Connect your GitHub repository.

### 2. Create Web Service
- **Service Name**: `krishi-backend`
- **Port**: `8000`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

### 3. Environment Variables
Add these in the Render Dashboard:
- `DATABASE_URL`: `postgresql://user:pass@host/db`
- `SECRET_KEY`: Your JWT secret
- `OPENAI_API_KEY`: For AI Advisor
- `ENVIRONMENT`: `production`

### 4. Verification
Once deployed, visit `https://krishi-backend.onrender.com/health`. You should see `{"status": "healthy"}`.

---

## 📱 Mobile App Build (Expo/EAS)

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login & Initialize
```bash
eas login
eas build:configure
```

### 3. Build Android APK
```bash
eas build --platform android --profile production
```

---

## 🌐 Web Platform Deployment (Vercel)

1. Go to [Vercel](https://vercel.com).
2. "Add New Project" -> Import from GitHub.
3. Set `NEXT_PUBLIC_API_URL` to your Render backend URL.
4. Click **Deploy**.

---

## 🔧 Troubleshooting

### Backend Fails to Start
- **Error**: `ModuleNotFoundError`
- **Solution**: Ensure all dependencies are in `requirements.txt`.

### Mobile Build Fails
- **Error**: `Credentials not found`
- **Solution**: Run `eas credentials` to sync.

---

## 🔄 Rollback
### Backend
Go to the Render "Deploys" tab, find the previous working version, and click **Rollback**.

### Web
In Vercel, go to "Deployments" and promote the previous stable build to production.
