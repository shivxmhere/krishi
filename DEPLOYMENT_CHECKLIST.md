# 🏁 Krishi Production Deployment Checklist

## 1. Backend (Render)
- [ ] Connected GitHub Repo
- [ ] Environment Variables configured
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Health Check Passing (`/health`)
- [ ] Database Migrations applied (`alembic upgrade head`)

## 2. Mobile (Expo/EAS)
- [ ] `eas.json` configured for production
- [ ] Production APK built and verified
- [ ] `API_URL` pointing to Render Production
- [ ] On-device ML models bundled correctly

## 3. Web (Vercel)
- [ ] Frontend connected to Vercel
- [ ] `NEXT_PUBLIC_API_URL` configured
- [ ] Build successful
- [ ] Domain SSL active

## 4. Final Verification
- [ ] Can login in Mobile App
- [ ] Disease detection works in Production
- [ ] AI Chat responds in Production
- [ ] Admin Dashboard displays live data
- [ ] Sentry is receiving error reports
