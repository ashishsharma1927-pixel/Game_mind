# Gamer Mind

A modern 3D web application built with React, Three.js, and GSAP. Designed to offer a highly immersive and cinematic experience with a fully responsive mobile-first UI.

## Features
- 🎮 **Immersive 3D Environments**: Explore diverse 3D scenes (Hero, Forest, Projects, Developer Room) with smooth camera transitions.
- 🚀 **High-Performance Animations**: Powered by GSAP and ScrollTrigger for a cinematic storytelling experience.
- 📱 **Fully Responsive UI**: A mobile-ready overlay interface seamlessly integrated with the 3D canvas.
- ⚡ **Modern Stack**: Built with Vite, React 19, Three.js, and Zustand for state management.

## Technologies Used
- **[React](https://reactjs.org/)** (v19)
- **[Three.js](https://threejs.org/)** & **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** for 3D rendering
- **[React Three Drei](https://github.com/pmndrs/drei)** for useful 3D helpers
- **[GSAP](https://gsap.com/)** for high-performance animations
- **[Zustand](https://github.com/pmndrs/zustand)** for lightweight state management
- **[Vite](https://vitejs.dev/)** as the build tool

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository (or download the code).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the development server with:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To create a production build:
```bash
npm run build
```
You can then preview the build with:
```bash
npm run preview
```

## Linting
This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter) for fast linting:
```bash
npm run lint
```
