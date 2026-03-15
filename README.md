# Limerick — City Guide App

A Next.js 16 web application about Limerick, Ireland. Features a Firebase-backed blog with MDX content, Google Maps integration, and full i18n support.

[![CI](https://github.com/xabierlameiro/limerick/actions/workflows/ci.yml/badge.svg)](https://github.com/xabierlameiro/limerick/actions/workflows/ci.yml)

## Features

- 🗺️ Interactive map with Points of Interest (Google Maps)
- 📝 Blog with MDX content
- 🔥 Firebase backend (Firestore + Auth)
- 🌍 Internationalization (i18n)
- 🇮🇪🇪🇸 Multi-language support

## Stack

| Layer           | Choice                  |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript              |
| Backend         | Firebase (Firestore)    |
| Content         | MDX                     |
| Maps            | Google Maps API         |
| Package manager | npm                     |

## Getting started

```bash
git clone https://github.com/xabierlameiro/limerick.git
cd limerick
npm install
```

Copy `.env.example` to `.env.local` and add your Firebase and Google Maps API credentials:

```bash
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run lint`  | ESLint                   |

## License

[MIT](./LICENSE) — © 2026 Xabier Lameiro
