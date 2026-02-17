# Next.js PLP Implementation

## Overview
Server-side rendered Product Listing Page built with Next.js 14 App Router.

## Features
✅ **Server-Side Rendering (SSR)**: Products fetched server-side from FakeStore API
✅ **SEO Optimization**: Meta tags, JSON-LD schema, semantic HTML structure
✅ **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
✅ **Clean Architecture**: Minimal dependencies, organized code structure
✅ **TypeScript**: Full type safety and IntelliSense support

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **API**: FakeStore API for real product data
- **Styling**: CSS-in-JS with responsive design
- **Deployment**: Ready for Netlify/Vercel

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Project Structure
\`\`\`
app/
├── layout.tsx          # Root layout with SEO metadata
├── page/
│   └── index.tsx     # Main PLP page with SSR
├── globals.css          # Global styles
└── next.config.js       # Next.js configuration
\`\`\`

lib/ (optional)
├── api.ts             # API utility functions
├── types.ts           # TypeScript type definitions
└── utils.ts           # Helper functions

components/ (optional)
├── ProductCard.tsx    # Reusable product card component
├── FilterBar.tsx     # Category filter component
└── SortSelect.tsx    # Sorting functionality component

## Key Features

### SSR Implementation
- \`getServerSideProps\` fetches data server-side
- Dynamic filtering and sorting via URL parameters
- Real-time product data from FakeStore API

### SEO Features
- Dynamic meta tags based on current filters/sort
- JSON-LD structured data for search engines
- Semantic HTML5 structure with proper heading hierarchy
- Open Graph tags for social sharing

### Responsive Design
- Mobile: 1 column grid
- Tablet: 2 column grid  
- Desktop: Auto-fit columns (minimum 280px)
- Collapsible navigation on mobile
- Touch-friendly button sizes

### Performance
- Optimized images with Next.js Image component
- Minimal JavaScript for fast loading
- CSS-in-JS for optimal performance
- Server-side rendering for fast initial paint
