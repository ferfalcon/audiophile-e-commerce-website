# Repository Guidelines

## Project Structure & Module Organization

This repo is moving from static reference files toward a modular WordPress delivery workflow. `docs/design-code/` contains the original HTML pages, `data.json`, and production image assets. `docs/design-mocks/` contains the visual specifications for desktop, tablet, mobile, and the design system. `frontend/` is the Astro design-system prototype used for client review before approved modules are ported into WordPress theme partials. Follow `frontend/AGENTS.md` for files inside the Astro app.

## Build, Test, and Development Commands

Run Astro commands from `frontend/` with Node `>=22.12.0`.

- `pnpm install`: installs Astro dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: starts the Astro dev server for local review.
- `pnpm build`: builds the static prototype into ignored `dist/` output.
- `pnpm preview`: previews the latest production build locally.
- `python3 -m http.server 8000 --directory docs/design-code`: serves the original static reference files when needed.

## Coding Style & Naming Conventions

Build module-by-module rather than attempting the full site in one pass. Start with foundations, header, footer, and hero, then continue through product cards, category sections, product detail modules, cart, and checkout. Use semantic HTML, accessible labels, and mobile-first responsive styling. Name Astro components in PascalCase, such as `SiteHeader.astro`, and keep routes and asset folders lowercase and hyphenated. Use CSS custom properties for design tokens; do not introduce Tailwind, Sass, or a component framework during this phase unless the project direction changes.

## Testing Guidelines

No automated test suite is configured yet. Treat `pnpm build` as the minimum validation for Astro changes. For visual work, compare against `docs/design-mocks/` at desktop, tablet, and mobile widths. Confirm images resolve from the copied assets, hover states match the design system, and the module remains portable to a WordPress template.

## Commit & Pull Request Guidelines

The current history uses short, imperative commit messages, for example `Add HTML files for product pages and main site structure`. Keep commits focused by module or documentation change. Pull requests should include a concise summary, affected modules/pages, manual test notes, and screenshots for visual changes. Call out any new dependency, tooling, or WordPress-portability concern.
