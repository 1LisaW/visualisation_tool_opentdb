# React + TypeScript + Vite

# Visualisation Tool (visual_tool)

A small React + TypeScript application built with Vite that visualises data (this repository was scaffolded for displaying trivia/visualisations — the project name suggests it uses OpenTDB as sample data). The app includes charts, filter controls, and a simple UI component set.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Development notes](#development-notes)
- [License & contributions](#license--contributions)

## Features

- Interactive charts (see `src/Components/Charts`)
- Filtering and tag controls
- Reusable UI components: Button, Header, Logo, Accordion
- TypeScript types and simple API layer under `src/api`

## Tech stack

- React 19 + TypeScript
- Vite for development and build
- Recharts for charts
- ESLint for linting

## Getting started

Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

Install dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview the built app locally:

```powershell
npm run preview
```

Deploy (this project includes a `deploy` script that uses `gh-pages`):

```powershell
npm run deploy
```

Notes: `predeploy` runs the build step before publishing.

## Available scripts

The scripts defined in `package.json` are:

- `dev` — start Vite dev server
- `build` — run TypeScript build and Vite build (produces `dist`)
- `preview` — locally preview production build
- `lint` — run ESLint
- `deploy` — deploy `dist` to GitHub Pages via `gh-pages` (runs `predeploy` first)

## Project structure (important files)

- `index.html` — app entry
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — root app component
- `src/Components` — UI components (Button, Charts, Header, Logo, VisualTool and subcomponents)
- `src/api` — API types/clients (see `api/types.ts`)
- `src/assets/constants.ts` — constants used by the app
