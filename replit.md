# Breathing & Wellness Tracker

## Overview

A Progressive Web Application (PWA) built with React and Vite for tracking breathing exercises and wellness activities. The application uses Chart.js for data visualization and is configured as a standalone mobile-first PWA with offline capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework: React 18.2.0 with Vite**
- **Problem**: Need for fast development environment with hot module reloading and optimized production builds
- **Solution**: Vite bundler with React plugin for rapid development and efficient production builds
- **Benefits**: Lightning-fast HMR, optimized build output, native ESM support, TypeScript ready

**Build Configuration**
- Development server configured to run on host `0.0.0.0` port `5000` for Replit compatibility
- TypeScript support enabled with strict mode and modern ESNext target
- JSX transform uses React's automatic runtime (`react-jsx`)

### Progressive Web App (PWA) Architecture

**Service Worker Implementation**
- Basic service worker registered for offline capabilities
- Install, activate, and fetch event handlers implemented
- Configured for standalone display mode with custom theme colors

**PWA Manifest**
- App configured as standalone mobile application
- Custom branding with icons (192x192 and 512x512)
- Theme color: #1e90ff (dodger blue)
- Background color: #f0f8ff (alice blue)

### Data Visualization

**Chart.js Integration**
- **Problem**: Need to visualize wellness and breathing exercise data
- **Solution**: Chart.js 4.5.0 with React wrapper (react-chartjs-2 5.3.0)
- **Benefits**: Responsive charts, extensive chart types, good React integration

### Development Environment

**TypeScript Configuration**
- Strict type checking enabled for code quality
- ESNext module system with Node module resolution
- DOM libraries included for browser API support
- Isolated modules for better build performance

**Module System**
- ES Modules (type: "module" in package.json)
- Modern JavaScript features enabled
- Synthetic default imports allowed for better library compatibility

## External Dependencies

### Core Libraries
- **React 18.2.0**: UI framework (dev dependency for Replit environment)
- **React DOM 18.2.0**: DOM rendering library
- **Vite 7.1.7**: Build tool and dev server

### Visualization
- **Chart.js 4.5.0**: Charting library for data visualization
- **react-chartjs-2 5.3.0**: React wrapper for Chart.js

### Development Tools
- **TypeScript 5.2.2**: Type checking and enhanced IDE support
- **@vitejs/plugin-react 4.2.0**: Vite plugin for React fast refresh
- **@types/react & @types/react-dom**: TypeScript definitions for React

### Browser APIs
- **Service Worker API**: For PWA offline functionality and caching
- **Web App Manifest**: For installable PWA experience

### Hosting Platform
- Configured for Replit deployment with specific host/port settings
- No backend services currently configured
- No database implementation present