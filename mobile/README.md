# Krishi Mobile App

Premium agricultural intelligence app built with React Native (Expo).

## Features
- **AI Camera**: Real-time disease detection with detection overlay.
- **Offline First**: Works without internet using local ML (TFLite) and sync queue.
- **Crop Management**: Track crop health, expenses, and yield.
- **Advisory**: AI-powered chat for agricultural queries.
- **Dashboard**: Real-time weather and market prices.

## Tech Stack
- **Framework**: React Native (Expo SDK 52)
- **Language**: TypeScript
- **State**: Zustand + Persist
- **Networking**: Axios + TanStack Query
- **UI**: Reanimated 3, Lottie, SVG, Linear Gradient
- **Navigation**: React Navigation v7

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run on Android**:
   ```bash
   npm run android
   ```

3. **Run on iOS**:
   ```bash
   npm run ios
   ```

## Key Components
- `src/components/camera/AICamera.tsx`: Advanced camera implementation.
- `src/components/detection/ScanAnimation.tsx`: Lottie + Reanimated scanning effect.
- `src/store`: Global state management.
- `src/services/ml`: Offline machine learning service.

## Project Structure
- `src/api`: API integration.
- `src/components`: Reusable UI components.
- `src/screens`: App screens.
- `src/hooks`: Custom React hooks.
- `src/theme`: Design system.
