# Gamer Mind

A modern 3D web application built with React, Three.js, and GSAP.

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
