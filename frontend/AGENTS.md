# Frontend Astro Guidelines

## Purpose

This Astro app is the design-system prototype for client review. The final production target is WordPress, so build components as portable modules that can later become theme partials. Keep the first phase focused on visual foundations, header, footer, and hero before adding cart, checkout, or CMS behavior.

## Project Structure

- `src/pages/`: Astro routes used for review screens.
- `src/layouts/`: shared document shells and page layout wrappers.
- `src/components/`: reusable modules such as header, footer, hero, buttons, cards, and responsive images.
- `src/styles/`: add global CSS tokens and shared utilities here when styling starts.
- `public/assets/`: place copied project images/icons here so components can reference stable `/assets/...` URLs.

The current starter files may be replaced as modules are built. Keep `node_modules/`, `.astro/`, and `dist/` as ignored generated output.

## Commands

Use pnpm from this `frontend/` directory. Node must satisfy `>=22.12.0`.

- `pnpm install`: install dependencies.
- `pnpm dev`: run the local Astro dev server.
- `pnpm astro dev --background`: preferred background dev server command for agents.
- `pnpm astro dev status`, `pnpm astro dev logs`, `pnpm astro dev stop`: manage the background server.
- `pnpm build`: validate the production build.
- `pnpm preview`: preview the built output.

## Coding Style

Use Astro components with semantic HTML, accessible landmarks, and mobile-first CSS. Name components in PascalCase, for example `SiteHeader.astro` and `HomeHero.astro`. Keep route and asset names lowercase and hyphenated. Prefer CSS custom properties for colors, type, spacing, and component states. Use component-scoped styles by default; add shared tokens only when multiple modules need them. Do not add Tailwind, Sass, React, Vue, or other UI frameworks during this phase.

## Design-System Workflow

Use `../docs/design-mocks/Design System.jpg` for colors, Manrope typography, buttons, and form states. Use `../docs/design-mocks/*Home*.jpg` for the first review page. Build modules in order: foundations, button, responsive image, header, footer, then home hero. Keep content aligned with `../docs/design-code/data.json` and existing HTML reference pages.

## Validation

Run `pnpm build` before handing off changes. Manually compare desktop, tablet, and mobile widths against the corresponding mock images. Check hover states, keyboard-visible links/buttons, image loading, and that each module can be understood without Astro-specific business logic.
