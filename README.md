# Lucas Lopez Portfolio

Premium interactive portfolio built with Next.js, TypeScript, Tailwind CSS and Framer Motion.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel-ready static optimization

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Next.js settings.
4. Deploy.

Vercel should detect:

- Framework: `Next.js`
- Build command: `npm run build`
- Output: handled automatically by Next.js

## Content

The portfolio content lives in `lib/portfolio-content.ts`.

The hero image used by the site is `public/hero.png`.

Raw CV files and local source images are ignored by Git to avoid publishing personal documents.
