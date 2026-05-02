# KIMEYU-WORK -- Personal Portfolio Site

## NAME

kime-work -- portfolio website for KIMEYU, built with Astro 6.

## SYNOPSIS

```
npm install
npm run dev          # dev server at localhost:4321
npm run build        # static build to ./dist/
npm run preview      # preview production build
```

## DESCRIPTION

A static portfolio site showcasing motion graphics and artwork.
Content is managed via Hygraph (headless CMS) and fetched at build time
through GraphQL. Deployed on Vercel as a static site.

Production URL: https://kimeyu.vercel.app

## REQUIREMENTS

    Node.js >= 24.0.0
    npm (bundled with Node)

## ENVIRONMENT

A `.env` file is required at the project root:

```
HYGRAPH_ENDPOINT=<hygraph-content-api-url>
```

The endpoint is the Hygraph Content API URL (read-only, public).
Without it, the build will fail.

## PROJECT STRUCTURE

```
kime-work/
|-- public/                     Static assets (fonts, lottie, media, patterns)
|-- src/
|   |-- assets/                 Build-time assets (images, lottie, SVG)
|   |-- components/             Shared Astro components
|   |   |-- icons/              SVG icon components
|   |   |-- Header.astro        Site header + navigation
|   |   |-- Footer.astro        Site footer
|   |   |-- SectionHeader.astro Section title with decorative elements
|   |   |-- ModeSwitch.astro    Motions/Artwork tab switcher
|   |   |-- FilterMenu.astro    Category filter dropdown
|   |   |-- Pagination.astro    Paginated navigation
|   |   |-- InfoWindow.astro    Modal/overlay info panel
|   |   |-- KimeSplash.astro    Landing splash visual
|   |   |-- CyberRibbon.astro   Decorative SVG ribbon
|   |   +-- ...
|   |-- data/                   (reserved, currently empty)
|   |-- features/               Feature-scoped components
|   |   |-- artwork/
|   |   |   +-- components/
|   |   |       +-- ArtworkGallery.astro
|   |   +-- motions/
|   |       +-- components/
|   |           |-- MotionGallery.astro
|   |           +-- MotionCard.astro
|   |-- layouts/
|   |   +-- Layout.astro        Root HTML shell (head, transitions, splash)
|   |-- lib/
|   |   |-- hygraph.ts          Hygraph GraphQL client + data types
|   |   +-- socials.ts          Social media links config
|   |-- pages/
|   |   |-- index.astro         Root redirect -> /home
|   |   |-- home.astro          Homepage
|   |   |-- about.astro         About page
|   |   +-- work/
|   |       |-- artwork/
|   |       |   |-- [...page].astro     Artwork gallery (paginated)
|   |       |   +-- [filter]/           Artwork filtered by category
|   |       +-- motions/
|   |           |-- [...page].astro     Motions gallery (paginated)
|   |           +-- [slug].astro        Individual motion detail page
|   +-- styles/
|       |-- global.css          CSS reset, design tokens, utility classes
|       +-- works-hero.css      Hero section styles for work pages
|-- astro.config.mjs            Astro configuration
|-- tsconfig.json               TypeScript config (strict mode)
+-- package.json
```

## ARCHITECTURE

### Rendering

Static Site Generation (SSG). All pages are pre-rendered at build time.
No server runtime required post-build.

### Data Layer

All dynamic content comes from Hygraph via `src/lib/hygraph.ts`.
The client uses a generic `fetchAPI<T>()` wrapper over the native `fetch` API.

Exposed fetchers:

    fetchArtworks()         -- artwork entries with image transforms
    fetchVideos()           -- motion/video entries with embed URLs
    fetchExperiences()      -- professional experience entries
    fetchSiteProfile()      -- social links, avatar, splash video
    fetchAboutPageConfig()  -- about page CMS content

Image URLs are transformed at the CDN level via Hygraph's
`url(transformation: ...)` syntax (resize, format conversion to WebP).

### Routing

    /                       redirect -> /home
    /home                   homepage
    /about                  about page
    /work/motions/          paginated motions gallery
    /work/motions/[slug]    individual motion detail
    /work/artwork/          paginated artwork gallery
    /work/artwork/[filter]  artwork filtered by category

Astro file-based routing. Dynamic segments use `[slug]`, `[filter]`,
and `[...page]` (catch-all for pagination).

### Page Transitions

Uses Astro View Transitions (`ClientRouter`) with a custom TWXD-style
wipe animation (multi-row colored bands, staggered wave in/out).
Implementation is in `Layout.astro` inline script.

### Styling

Vanilla CSS. No framework (no Tailwind, no Sass).
Design tokens defined as CSS custom properties in `global.css`.
Component styles are scoped via Astro's `scopedStyleStrategy: 'class'`.
CSS minification handled by LightningCSS.

Primary font: Murecho (Google Fonts, variable weight 100-900).

### Dependencies

Production:

    astro@^6.1.1            -- framework
    lottie-web@^5.13.0      -- splash screen animation

Dev:

    @types/node@^25.5.0     -- Node type definitions
    lightningcss@^1.32.0    -- CSS minifier for Vite

That's it. No React, no Vue, no state library. Pure Astro components.

## DEPLOYMENT

Vercel, static output. The `.vercel/` directory is gitignored.
Build command: `npm run build`. Output directory: `dist/`.

## FILES

    .env                    Environment variables (not committed)
    astro.config.mjs        Astro framework configuration
    tsconfig.json           TypeScript compiler options
    public/                 Files served as-is (no processing)
    src/                    Source code (compiled at build time)
    dist/                   Build output (gitignored)
    docs/                   Miscellaneous documentation

## SEE ALSO

    Astro Documentation     https://docs.astro.build
    Hygraph Documentation   https://hygraph.com/docs
    LightningCSS            https://lightningcss.dev
    Lottie Web              https://github.com/airbnb/lottie-web

## NOTES

- The `.env` file contains the Hygraph read-only endpoint. It is
  committed in this repo for convenience, but should be rotated
  if the API scope changes.
- `src/data/` is currently empty (reserved for future static data).
- `public/fonts/` is empty; fonts are loaded from Google Fonts CDN.
- The `__deprecated` file at root is a leftover. Safe to remove.
