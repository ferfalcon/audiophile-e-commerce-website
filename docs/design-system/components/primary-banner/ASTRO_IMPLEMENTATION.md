# ASTRO_IMPLEMENTATION.md — Primary Banner

## Purpose and source of truth

This document defines the concrete Astro implementation plan for the Primary Banner. It does not implement the component.

The implementation must be checked against, in order:

1. `DESIGN.md` for visual intent and reference measurements.
2. `SPEC.md` for content, behavior, accessibility, and acceptance requirements.
3. `PLAN.md` for delivery sequence and scope guardrails.
4. The current Astro conventions in `frontend/`, especially `CategoryBanner.astro`, `tokens.css`, `global.css`, and the isolated design-system route pattern.

The ZX9 artwork and copy are a reference instance. They must live in data passed by a parent, not inside `PrimaryBanner.astro`.

## Confirmed repository context

- Astro `7.x` with strict TypeScript is already configured.
- Manrope is loaded globally as a local variable font.
- Global tokens already include the primary orange, black, font family/weights, card radius, container dimensions, and focus-ring values.
- `.site-container` already provides the `1110px` maximum width and the mobile/tablet gutters.
- Existing component CSS is scoped, mobile-first, uses logical properties, BEM-style class names, local custom properties, and named container queries.
- No shared button or responsive-image primitive exists yet. Neither should be introduced solely for this component.
- The source assets are present locally:

| Source asset | Intrinsic size | Intended use |
| --- | ---: | --- |
| `docs/design-code/assets/home/mobile/image-speaker-zx9.png` | `320 × 388` | Mobile fallback/source |
| `docs/design-code/assets/home/tablet/image-speaker-zx9.png` | `366 × 444` | Tablet source |
| `docs/design-code/assets/home/desktop/image-speaker-zx9.png` | `756 × 918` | Desktop source |
| `docs/design-code/assets/home/desktop/pattern-circles.svg` | `944 × 944` | Decorative rings |

The three PNGs have effectively the same aspect ratio and composition. They are resolution variants, not different art-directed crops. That makes a responsive `<img srcset>` preferable to three viewport-gated `<source>` elements.

## Proposed component API

### Shared data types

Define the reusable content types in `frontend/src/data/primary-banner.ts`, following the existing category-banner convention:

```ts
export interface PrimaryBannerImageAsset {
	src: string;
	width: number;
	height: number;
}

export interface PrimaryBannerProductImage extends PrimaryBannerImageAsset {
	sources?: {
		tablet?: PrimaryBannerImageAsset;
		desktop?: PrimaryBannerImageAsset;
	};
}

export interface PrimaryBannerContent {
	productName: string;
	supportingCopy: string;
	ctaLabel: string;
	ctaHref: string;
	productImage: PrimaryBannerProductImage;
	productImageAlt: string;
	ctaAriaLabel?: string;
}
```

`productImage` is always a complete fallback image. `sources` is optional so the component can accept one prepared cutout or the verified mobile/tablet/desktop set without creating separate component variants.

### Astro props interface

`frontend/src/components/PrimaryBanner.astro` should import `PrimaryBannerContent` and define:

```ts
import type { PrimaryBannerContent } from '../data/primary-banner';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface Props extends PrimaryBannerContent {
	headingLevel?: HeadingLevel;
	class?: string;
	imageLoading?: 'eager' | 'lazy';
	imageFetchPriority?: 'high' | 'low';
}
```

Defaults:

- `headingLevel = 2` because the banner is normally a section within the home page.
- `imageLoading = 'lazy'` because the Primary Banner follows the home hero/category content and is not normally the page LCP element.
- `imageFetchPriority` is omitted by default so the browser uses normal priority.
- No default content values: all content fields remain required.

Usage constraints:

- A parent may pass `imageLoading="eager"` and `imageFetchPriority="high"` only when this banner is actually above the fold and its product image is the measured LCP candidate.
- Never pair `imageLoading="lazy"` with `imageFetchPriority="high"`.
- `productImageAlt` must always be passed. Use `""` only after deciding that the image is redundant with the nearby heading.
- `class` is an Astro-native outer layout hook. Do not expose arbitrary inline styles or component-wide visual variants.
- Do not add `imagePosition`, `headingLines`, analytics, color themes, extra CTAs, or slots in the first implementation. Those needs are not demonstrated by the reference instance.

## Reference data and example usage

The reference instance belongs in `frontend/src/data/primary-banner.ts`:

```ts
export const primaryBannerReference = {
	productName: 'ZX9 Speaker',
	supportingCopy:
		'Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.',
	ctaLabel: 'See Product',
	ctaHref: '/product-zx9-speaker/',
	ctaAriaLabel: 'See ZX9 Speaker product',
	productImage: {
		src: '/assets/home/mobile/image-speaker-zx9.png',
		width: 320,
		height: 388,
		sources: {
			tablet: {
				src: '/assets/home/tablet/image-speaker-zx9.png',
				width: 366,
				height: 444,
			},
			desktop: {
				src: '/assets/home/desktop/image-speaker-zx9.png',
				width: 756,
				height: 918,
			},
		},
	},
	productImageAlt: 'Black ZX9 speaker with a white horn and exposed woofer',
} as const satisfies PrimaryBannerContent;
```

`/product-zx9-speaker/` follows the existing source page name. The final href must be updated if the Astro/WordPress product permalink convention is later defined differently; link generation remains the parent/data layer's responsibility.

Isolated review-route usage:

```astro
---
import PrimaryBanner from '../../components/PrimaryBanner.astro';
import { primaryBannerReference } from '../../data/primary-banner';
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Primary banner | Audiophile design system">
	<main class="primary-banner-review">
		<h1 class="visually-hidden">Primary banner</h1>
		<div class="site-container">
			<PrimaryBanner {...primaryBannerReference} headingLevel={2} />
		</div>
	</main>
</Layout>
```

The review page may define its own small `.visually-hidden` rule, as `index.astro` currently does. Do not broaden this task into a shared-utility refactor.

## Expected file structure

```text
docs/design-system/components/primary-banner/
├── ASTRO_IMPLEMENTATION.md
├── DESIGN.md
├── SPEC.md
├── PLAN.md
├── Desktop.jpg
├── Tablet.jpg
└── Mobile.jpg

frontend/
├── public/assets/home/
│   ├── desktop/
│   │   ├── image-speaker-zx9.png
│   │   └── pattern-circles.svg
│   ├── tablet/image-speaker-zx9.png
│   └── mobile/image-speaker-zx9.png
└── src/
    ├── components/PrimaryBanner.astro
    ├── data/primary-banner.ts
    ├── pages/design-system/primary-banner.astro
    └── styles/tokens.css
```

Only `tokens.css` may need a small shared-token addition (`--color-white`). `global.css` and `Layout.astro` already provide the required font, reset, container, and global-style import and should remain unchanged. Home-page integration is a later step after isolated approval.

## HTML structure

Target static output:

```html
<section class="primary-banner">
	<div class="primary-banner__layout">
		<img
			class="primary-banner__rings"
			src="/assets/home/desktop/pattern-circles.svg"
			width="944"
			height="944"
			alt=""
			aria-hidden="true"
		/>

		<div class="primary-banner__content">
			<h2 class="primary-banner__heading">ZX9 Speaker</h2>
			<p class="primary-banner__copy">...</p>
			<a
				class="primary-banner__cta"
				href="/product-zx9-speaker/"
				aria-label="See ZX9 Speaker product"
			>
				See Product
			</a>
		</div>

		<picture class="primary-banner__media">
			<img
				class="primary-banner__image"
				src="/assets/home/mobile/image-speaker-zx9.png"
				srcset="...320w, ...366w, ...756w"
				sizes="(min-width: 63rem) 25.625rem, (min-width: 48rem) 12.3125rem, 10.75rem"
				width="320"
				height="388"
				alt="Black ZX9 speaker with a white horn and exposed woofer"
				loading="lazy"
				decoding="async"
			/>
		</picture>
	</div>
</section>
```

Implementation notes:

- Keep the `<picture>` wrapper even though the first implementation uses an `<img srcset>`. It provides a stable media wrapper and a straightforward path to true art direction later without changing the surrounding structure.
- Build `srcset` only from sources that exist. When there are no optional sources, omit `srcset` and `sizes` rather than emitting empty attributes.
- Render `fetchpriority` only when `imageFetchPriority` is passed.
- Resolve the heading tag from `headingLevel`; do not change the visual class by level.
- Use `class:list={['primary-banner', className]}` for the optional outer class.
- Keep `.primary-banner__content` before the meaningful product image in DOM order so the section begins with its heading and actionable text. CSS positioning creates the supplied visual order without changing reading or focus order.
- Render the CTA as an anchor, not a button, because it navigates.
- Do not wrap the whole banner in a link.
- Do not add client-side scripts or hydration directives.

## CSS strategy

### Architecture and conventions

- Keep Primary Banner styles inside `PrimaryBanner.astro` so Astro scopes them.
- Use `.primary-banner` BEM-style classes and logical properties (`inline-size`, `block-size`, `inset-inline-start`, `padding-block`, and `margin-inline`).
- Declare `container: primary-banner / inline-size` on the component root. Use a `.primary-banner__layout` child as the visual canvas so container queries can change its properties; a container cannot query and restyle itself.
- Use mobile-first named container queries at `43rem` and `58rem`, matching the existing `CategoryBanner.astro` convention. These thresholds also map the standard page container to the supplied `689px` tablet target and the approximately `1024px+` desktop viewport transition.
- Use component-local custom properties for the banner height, artwork sizes/offsets, text width, typography, and content gaps. Keep exact Figma-derived measurements in one block per responsive state.
- Use `position: relative`, `overflow: hidden`, `border-radius: var(--radius-card)`, and the orange background on `.primary-banner__layout`.
- Absolutely position only the rings and product media. Keep heading, copy, and CTA in normal flow within `.primary-banner__content` so text zoom or longer valid copy can increase the banner's block size instead of being clipped.
- Use `min-block-size`, never a fixed `block-size`, on `.primary-banner__layout`; the semantic root grows with it.
- Do not add transitions or motion. The design does not require them.

### Values to reuse

Reuse existing tokens:

- `--color-primary`
- `--color-black`
- `--font-family-sans`
- `--font-weight-medium`
- `--font-weight-bold`
- `--radius-card`
- `--focus-ring-width`
- `--focus-ring-offset`
- `--focus-ring-color-light`

Add `--color-white: #fff` to `tokens.css` because white is a general palette value that will be shared by header, footer, hero, and buttons. Keep the inferred dark CTA hover color (`#4c4c4c`) local until a shared button primitive establishes it as a system token.

Do not add breakpoint custom properties: CSS custom properties cannot be used in media/container-query conditions. Keep the established `43rem` and `58rem` query values explicit and consistent.

### Responsive measurement map

| Property | Mobile base | Tablet `@container (min-width: 43rem)` | Desktop `@container (min-width: 58rem)` |
| --- | ---: | ---: | ---: |
| Layout min block size | `37.5rem` (`600px`) | `45rem` (`720px`) | `35rem` (`560px`) |
| Product rendered width | `10.75rem` (`172px`) | `12.3125rem` (`197px`) | `25.625rem` (`410px`) |
| Product top | `3.4375rem` (`55px`) | `3.25rem` (`52px`) | `6rem` (`96px`) |
| Product inline placement | centered | centered | `10.54%` from start; `117px` at `1110px` |
| Rings rendered size | `34.875rem` (`558px`) | `59rem` (`944px`) | `59rem` (`944px`) |
| Rings top | `-7.5625rem` (`-121px`) | `-18rem` (`-288px`) | `-2.25rem` (`-36px`) |
| Rings inline placement | centered | centered | `-9.3125rem` (`-149px`) |
| Content top | `18.375rem` (`294px`) | `22.0625rem` (`353px`) | `8.3125rem` (`133px`) |
| Content max width | `17.5rem` (`280px`) | `21.8125rem` (`349px`) | `21.8125rem` (`349px`) |
| Content inline placement | centered | centered | `60%` from start; `666px` at `1110px` |
| Heading | `36/40px`, `1.29px` tracking | `56/58px`, `2px` | `56/58px`, `2px` |
| Heading-to-copy gap | `1.5rem` (`24px`) | `1.5rem` (`24px`) | `1.5rem` (`24px`) |
| Copy-to-CTA gap | `1.5rem` (`24px`) | `2.5rem` (`40px`) | `2.5rem` (`40px`) |

The exact values are starting targets for visual QA, not permission to absolutely position text. Content uses top padding/inset plus normal-flow gaps; valid content growth may make the banner taller than the reference.

### Typography and CTA

- Apply `text-transform: uppercase` in CSS; keep source content in editorial casing.
- Heading: bold, white, no margin, and `overflow-wrap: anywhere` as a last-resort overflow guard. Natural wrapping should produce the reference two-line `ZX9 Speaker`; do not inject `<br>`.
- Copy: `15px/25px`, medium weight, white at `75%` opacity for Figma fidelity, no margin.
- CTA: `160 × 48px`, inline-flex centered, black background, white `13px` bold uppercase label, `1px` letter spacing, no wrapping, and no text decoration.
- CTA hover and focus-visible background: `#4c4c4c`; active may retain the same color. Do not shift, scale, or resize it.
- Use the existing focus-ring tokens for a visible black outline with offset. The offset separates it from the black CTA and places it against the orange surface. Confirm it is not clipped.
- Add a focused forced-colors check. If the default outline is not visible, use a `Highlight` outline in `@media (forced-colors: active)`.

## Responsive behavior

### Mobile, below `43rem` component width

- Render a centered vertical composition with the product fully visible near the top.
- Keep the rings centered at the reference offset and clipped by the banner.
- Begin content at approximately `294px`; center heading, copy, and CTA.
- Allow inline padding to protect text below `327px` component width. The CTA and text must never cause horizontal page overflow.
- Retain `600px` as the minimum reference height; content may expand it under zoom or valid text growth.

### Tablet, `43rem` through `57.999rem` component width

- Keep the centered vertical composition.
- Increase the heading, rings, and image to tablet values.
- Use a `349px` content measure and the `720px` minimum reference height.
- Keep the product fully visible and prevent collision with the content at `353px`.

### Desktop, `58rem` and wider component width

- Switch to the horizontal composition.
- Position the product on the left and allow only its bottom to be clipped.
- Place the content at approximately `60%` of the banner width, left-align it, and keep it above the image/rings in the stacking order.
- Use the `560px` minimum reference height.
- At the `1110px` container maximum, match the supplied desktop offsets. At intermediate widths, use the percentage-based product/content placements rather than scaling the whole design proportionally.

Container queries control visual layout. The image `sizes` attribute necessarily uses viewport media conditions; its `48rem`/`63rem` thresholds describe the component's rendered image width in the standard `.site-container` context. If a future page embeds the component in an unusually narrow column on a wide viewport, this may download a larger source than needed but will not change layout or crop.

## Accessibility details

- Use a real `section`, heading, paragraph, and link. The heading makes the section understandable without adding a redundant `aria-label` to the section.
- Default to `h2`, but allow `h1`–`h6` so the parent can preserve a sequential page outline.
- Keep the content order stable and do not use CSS `order` to create a keyboard/reading-order mismatch.
- Keep all meaningful copy as live text. The component must remain understandable if the product image fails.
- Require an explicit image alt decision. The reference data uses a concise appearance description because the visual communicates more than the name alone. Consumers may pass `alt=""` when the image is intentionally redundant.
- Use both `alt=""` and `aria-hidden="true"` on the decorative rings, plus `pointer-events: none` and `user-select: none`.
- Render the CTA as the only focusable element. Its `160 × 48px` hit area exceeds common minimum target guidance.
- Preserve a visible `:focus-visible` outline, keyboard activation, and a clear accessible name. An optional `ctaAriaLabel` must include or closely match the visible label so speech-input users can still identify it.
- Do not add positive `tabindex`, click handlers, hover-only content, animation, or ARIA roles that duplicate native semantics.
- Test at `200%` browser zoom and with increased text size. Text and CTA must expand the component instead of being clipped.
- Test forced-colors mode and a broken image URL.

### Known contrast decision

The Figma-faithful body copy (`15px` semi-transparent white on `#d87d4a`) does not meet WCAG AA contrast for normal text. Full white on the same orange also remains below the `4.5:1` normal-text target, so merely removing opacity does not solve it.

The first visual implementation may preserve the supplied design only while this is explicitly recorded as an unresolved accessibility decision. Before the component is approved for production or described as WCAG AA compliant, design must approve either a darker banner treatment, a sufficiently contrasting text treatment, or another tested solution. This is a release/approval gate, not a reason to hide or reduce the copy.

## Image and asset handling

- Copy the four verified source assets into the matching `frontend/public/assets/home/...` paths shown above. Preserve filenames and bytes during the first implementation.
- Use stable root-relative `/assets/...` URLs, consistent with existing frontend components and easy to translate into WordPress asset helpers later.
- Use a normal HTML `<img>` rather than Astro's image service because the project currently serves copied `public/` assets directly and prioritizes WordPress portability.
- Include intrinsic `width` and `height` on the fallback image to reserve space and reduce layout shift.
- Build a width-descriptor `srcset` from the verified intrinsic widths and provide the explicit `sizes` value shown above.
- Do not use CSS background images for the product. Meaningful/LCP-capable images must be discoverable in the HTML response.
- Do not lazy-load the image if the banner is actually above the fold. Do not add a preload unless measurement establishes this image as LCP.
- Keep `decoding="async"` consistent with the existing image convention. If later LCP measurement shows decode delay, review this in the consuming page rather than hardcoding all instances as high priority.
- Render the rings as a fixed internal decorative asset, not a public prop. Scale and position the SVG through component CSS.
- Do not recompress, rasterize, or redraw the rings before visual parity has been checked.

## Integration with existing design-system conventions

- Component name: `PrimaryBanner.astro` (PascalCase).
- Data module and route: lowercase, hyphenated `primary-banner.ts` and `primary-banner.astro`.
- Static assets: stable lowercase/hyphenated paths under `public/assets/`.
- Props/data are strict TypeScript; content selection stays in the page/data layer.
- Styling is scoped, mobile-first, BEM-like, token-driven, logical-property based, and container-responsive.
- The component renders static HTML/CSS and has no framework hydration or client-side business logic.
- `.site-container` owns the outer maximum width and gutters; `PrimaryBanner` owns only its internal layout and fills `100%` of the available inline size.
- Reuse the current font, container, radius, primary color, weights, and focus tokens. Do not rename existing `--font-family-sans` to the stale `--font-family-base` name from `PLAN.md`.
- Follow the existing isolated review-route pattern before modifying `index.astro`.
- Keep the markup straightforward enough to port to a WordPress partial: content fields map directly to escaped text/URL/alt values, and responsive image sources map to attachment metadata.

## Implementation checklist

### Preparation

- [ ] Copy the verified mobile, tablet, desktop, and rings assets into `frontend/public/assets/home/`.
- [ ] Add only `--color-white` to `tokens.css`; confirm no other shared token is needed.
- [ ] Create `frontend/src/data/primary-banner.ts` with the interfaces and ZX9 reference data.
- [ ] Confirm or update the reference CTA permalink before full-page integration.

### Component

- [ ] Create `PrimaryBanner.astro` with the exact required and optional props documented above.
- [ ] Build `srcset` only from supplied responsive sources.
- [ ] Omit `sizes` when no `srcset` is present.
- [ ] Render a dynamic semantic heading with default level `2`.
- [ ] Render decorative rings as hidden, non-interactive artwork.
- [ ] Render the product as an HTML image with intrinsic dimensions, explicit alt text, loading, decoding, and optional fetch priority.
- [ ] Render one CTA anchor with optional contextual `aria-label`.
- [ ] Merge the optional `class` through `class:list`.
- [ ] Add no script, hydration directive, generic variants, slots, or new dependency.

### Styling

- [ ] Implement scoped, mobile-first BEM CSS and local custom properties.
- [ ] Add the named `primary-banner` container and `43rem`/`58rem` queries.
- [ ] Match the `327 × 600`, `689 × 720`, and `1110 × 560` references.
- [ ] Keep text and CTA in normal flow and use `min-block-size` for reference heights.
- [ ] Keep rings and product behind content and clipped by the rounded banner.
- [ ] Preserve image aspect ratio and avoid horizontal overflow at intermediate widths.
- [ ] Add hover, active, focus-visible, and forced-colors-safe focus treatments without layout shift.

### Review route and verification

- [ ] Create `/design-system/primary-banner` using `Layout`, `.site-container`, and the reference data.
- [ ] Run `pnpm build` from `frontend/` and confirm no dependency or hydration output was added.
- [ ] Compare at component widths `327px`, `689px`, and `1110px` against all three supplied images.
- [ ] Also test `375px`, `768px`, `1024px`, and `1440px` viewports in the standard container.
- [ ] Test below `327px` for overflow and between query thresholds for collisions.
- [ ] Test keyboard focus/activation, forced colors, `200%` zoom, increased text, and a broken image URL.
- [ ] Test one-word/two-line names, maximum intended copy, a long CTA failure case, descriptive alt, and empty alt.
- [ ] Record the accepted contrast decision; do not claim WCAG AA until it is resolved.
- [ ] Integrate into `index.astro` only after isolated visual/accessibility approval.

## Differences from `PLAN.md`

This concrete plan intentionally refines the earlier plan in the following ways:

- It uses the actual source documents `DESIGN.md` and `SPEC.md`; `PLAN.md` incorrectly names nonexistent `DESIGN.reviewed.md` and `SPEC.reviewed.md` files.
- It confirms the asset paths, intrinsic dimensions, existing global foundations, and exact reusable tokens instead of leaving them as audit-time assumptions.
- It adopts the current project's named container-query convention (`43rem` and `58rem`) rather than the earlier assumed `48rem`/`64rem` media-query implementation. Viewport conditions remain only in the image `sizes` hint because HTML does not support container conditions there.
- It uses a responsive `<img srcset>` because the verified ZX9 images are same-composition resolution variants. The `<picture>` wrapper is retained for future genuine art direction.
- It makes a single fallback `productImage` required and nests optional tablet/desktop sources, concretizing the looser `productImage` plus `productImageSources` concept from `SPEC.md`/`PLAN.md`.
- It defaults the image to lazy loading and normal browser priority, with explicit eager/high opt-in only when a consuming page establishes it as LCP. The Primary Banner is not the site's top hero in the current content order.
- It resolves the reference alt-text example as descriptive, while still requiring consumers to make an explicit empty-versus-descriptive decision.
- It relies on natural heading wrapping and deliberately leaves `headingLines` and `imagePosition` out of the first API.
- It mirrors the source asset tree under `public/assets/home/desktop/` instead of moving the circles into an unproven shared location.
- It identifies `tokens.css` as the only likely shared-style change and avoids unnecessary edits to `global.css` or `Layout.astro`, which already provide the required foundations.
- It records the body-copy contrast problem as a production approval gate. It does not claim that increasing the white opacity alone would achieve WCAG AA.

## Readiness

The component is ready to implement in the isolated Astro review route using this contract and the verified local assets. No structural, asset, framework, or breakpoint question remains that blocks implementation.

Two integration/approval decisions remain intentionally outside the component implementation:

1. Confirm the final product permalink when the product-route convention is established.
2. Resolve or explicitly accept the body-copy contrast deviation before production approval or any WCAG AA claim.

Neither prevents building and visually validating the component now.
