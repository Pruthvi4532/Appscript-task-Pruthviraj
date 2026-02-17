# Appscrip Task - Pruthviraj

This repository contains:
1) `html-css-only/` → Plain HTML + CSS implementation
2) `next-plp/` → Next.js (SSR) implementation with FakeStore API

## Tech
- Next.js App Router (SSR by default)
- No CSS framework, pure CSS
- Minimal dependencies

## SSR
The PLP is server-rendered: data is fetched in `app/page.tsx` (Server Component), using `fetch(..., { cache: "no-store" })`.

## SEO
- Title + description via Next.js metadata
- Semantic H1/H2 structure
- JSON-LD schema (CollectionPage + ItemList)
- SEO-friendly image alt text

## Run locally
cd next-plp
npm install
npm run dev
