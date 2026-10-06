# Rendering Strategy

| Route | Strategy | Why |
|-------|----------|-----|
| `/` | Static (SSG) | Marketing content that is identical for every visitor and rarely changes. |
| `/menu` | Static + ISR (`revalidate = 300`) | Dishes and prices change a few times a day, so a 5-minute window keeps data fresh without rendering per request. |
| `/menu/[slug]` | Static (SSG via `generateStaticParams`, `dynamicParams = false`) | One page per dish built ahead of time; the set of dishes is known at build time. |
| `/checkout` | Dynamic (`force-dynamic`) | Reads the user's `cookies()` (cart), which only exists at request time and is private per user. |

## Layouts
- **Root layout** (`app/layout.js`): owns `<html>`/`<body>`, global CSS, header and footer.
- **Menu layout** (`app/menu/layout.js`): sidebar that persists across `/menu` and `/menu/[slug]` navigations (state is preserved; see the filter box and visit counter).

## Streaming
- `/menu` wraps `<DishList />` in `<Suspense>` so the sidebar renders instantly while the slow dish query streams in behind a skeleton.