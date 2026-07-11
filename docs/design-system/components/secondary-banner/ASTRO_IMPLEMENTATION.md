# ASTRO_IMPLEMENTATION.md — Secondary Product Banner

## Purpose and source of truth

This document defines the concrete Astro implementation plan for the Secondary Product Banner. It does not implement the component.

The implementation must be checked against, in order:

1. The Figma `Secondary Product Banner` section (`62849:219`) and its desktop, tablet, and mobile variants.
2. `DESIGN.md` for visual intent and measured values.
3. `SPEC.md` for content, behavior, accessibility, and acceptance requirements.
4. `PLAN.md` for scope and delivery sequencing.
5. The current repository and `frontend/AGENTS.md` for Astro and portability conventions.

The ZX7 speaker content is a reference instance only. `SecondaryProductBanner.astro` must receive all editor-managed content from its parent.

## Confirmed source findings

### Figma and reference images

The page URL points to page node `62844:102`; the requested component section is child node `62849:219`.

| Variant | Figma node | Reference size | Content inset | Content group |
| --- | --- | ---: | ---: | ---: |
| Mobile | `62849:204` | `327 × 320` | `24px` | `204 × 118` |
| Tablet | `62849:166` | `689 × 320` | `62px` | `204 × 118` |
| Desktop | `62849:156` | `1110 × 320` | `95px` | `204 × 118` |

All three variants confirm:

- A `320px` reference height and `8px` radius.
- A pale `#f1f1f1` fallback surface.
- A left-aligned `28px` Manrope Bold heading with `2px` tracking.
- A `160 × 48px` outlined CTA with `13px` Manrope Bold text and `1px` tracking.
- A `32px` heading-to-CTA gap.
- Vertical centering: `(320px - 118px) / 2 = 101px`.
- No scrim, overlay, gradient, icon, shadow, or whole-banner link.

The supplied `Mobile.jpg`, `Tablet.jpg`, and `Desktop.jpg` match the Figma variants. The home-page mocks confirm that the component sits inside the standard responsive page container and remains horizontal on mobile. `docs/design-mocks/Design System.jpg` confirms the Manrope H4 treatment and the outlined button's black-background/white-text hover state.

### Stable source assets

The text-free, art-directed source images already exist:

| Source asset | Intrinsic size | Role |
| --- | ---: | --- |
| `docs/design-code/assets/home/mobile/image-speaker-zx7.jpg` | `654 × 640` | Mobile/default fallback; exact 2× version of the `327 × 320` crop |
| `docs/design-code/assets/home/tablet/image-speaker-zx7.jpg` | `689 × 320` | Tablet crop |
| `docs/design-code/assets/home/desktop/image-speaker-zx7.jpg` | `1110 × 320` | Desktop crop |

These are genuinely different crops, not only resolution variants. The component therefore needs `<picture>` art direction rather than one `<img srcset>` based only on pixel density.

Temporary Figma asset URLs must not be used in implementation.

### Confirmed Astro implementation context

- `frontend/` uses Astro `7.0.7` with strict TypeScript.
- This component establishes the first Audiophile typed data module, token file, global stylesheet, stable asset tree, and isolated design-system review route.
- `Welcome.astro` and `index.astro` remain the starter content; home-page assembly is intentionally separate.
- Manrope is self-hosted as one Latin variable WOFF2 with its OFL license and preloaded once from `Layout.astro`.
- No shared button or responsive-image primitive exists. The banner keeps those rules scoped rather than introducing abstractions with only one consumer.
- The implementation follows the repository direction: semantic HTML, scoped mobile-first CSS, BEM-like classes, logical properties, strict data, stable `/assets/...` URLs, and WordPress portability.

## Proposed Astro component API

### Shared data types

Create `frontend/src/data/secondary-product-banner.ts` with the strict v1 content contract below. It keeps the flat field names from `SPEC.md`, makes image dimensions explicit, and requires all three verified art-directed crops.

```ts
export interface SecondaryProductBannerImage {
	src: string;
	width: number;
	height: number;
}

export type SecondaryProductBannerHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface SecondaryProductBannerContent {
	title: string;
	ctaLabel: string;
	ctaUrl: string;
	image: SecondaryProductBannerImage;
	tabletImage: SecondaryProductBannerImage;
	desktopImage: SecondaryProductBannerImage;
	imageAlt?: string;
	ctaAccessibleLabel?: string;
	headingLevel?: SecondaryProductBannerHeadingLevel;
}
```

### Props interface

`frontend/src/components/SecondaryProductBanner.astro` should import the content interface and define:

```ts
import type { SecondaryProductBannerContent } from '../data/secondary-product-banner';

interface Props extends SecondaryProductBannerContent {
	class?: string;
	imagePriority?: 'normal' | 'high';
}
```

Defaults and behavior:

- `headingLevel = 2` because this is normally a section within a page.
- `imageAlt = ''`, treating the image as decorative when the title already identifies the product.
- `imagePriority = 'normal'`, matching its below-primary-banner position in the supplied home page.
- `normal` renders `loading="lazy"`, `decoding="async"`, and no `fetchpriority` attribute.
- `high` renders `loading="eager"`, `decoding="sync"`, and `fetchpriority="high"`; use it only when the consuming page has established this image as its LCP candidate.
- Default image position is `0% 50%` so widths below the `327px` reference crop the product side before sacrificing the quiet left text area.
- Derive the CTA accessible name as `${ctaLabel} — ${title}` when `ctaAccessibleLabel` is absent. This keeps the visible label inside the accessible name for speech-input compatibility.
- Merge the optional outer `class` with `class:list`; do not expose arbitrary style strings or visual variants.

Required props are `title`, `ctaLabel`, `ctaUrl`, `image`, `tabletImage`, and `desktopImage`. Requiring all three crops guarantees the responsive text-safe composition without introducing unproven focal-point controls. `image` is the mobile and fallback source.

Do not add slots, a second CTA, theme/alignment variants, a whole-banner link, focal-point controls, analytics props, `target`, or CMS validation UI in the first implementation.

### Required-content handling

TypeScript catches omissions in authored Astro data, but runtime values can still be empty or malformed. The component must fail fast in every environment:

- Validate non-empty `title` and `ctaLabel` after trimming whitespace.
- Accept only whitespace-free root-relative CTA paths that begin with exactly one `/`; reject `//`, backslashes, schemes, and external URLs. Links always open in the same tab.
- Validate a non-empty `src` plus positive finite `width` and `height` for all three required images.
- Validate `headingLevel` and `imagePriority` against their finite unions.
- Throw one descriptive `SecondaryProductBanner:` error naming the first invalid field. Never omit invalid content silently.
- Keep the approximate `24`-character title and `16`-character CTA guidance editorial; do not truncate or reject otherwise valid strings in the component.

## Reference data and example usage

Reference data belongs in `frontend/src/data/secondary-product-banner.ts`, not in the component:

```ts
export const secondaryProductBannerReference = {
	title: 'ZX7 Speaker',
	ctaLabel: 'See Product',
	ctaUrl: '/product-zx7-speaker/',
	image: {
		src: '/assets/home/mobile/image-speaker-zx7.jpg',
		width: 654,
		height: 640,
	},
	tabletImage: {
		src: '/assets/home/tablet/image-speaker-zx7.jpg',
		width: 689,
		height: 320,
	},
	desktopImage: {
		src: '/assets/home/desktop/image-speaker-zx7.jpg',
		width: 1110,
		height: 320,
	},
	imageAlt: '',
	ctaAccessibleLabel: 'See ZX7 Speaker product',
} as const satisfies SecondaryProductBannerContent;
```

The required `image` is the mobile crop and fallback. V1 deliberately has no separate `mobileImage` or focal-point field.

Isolated review-route usage:

```astro
---
import SecondaryProductBanner from '../../components/SecondaryProductBanner.astro';
import { secondaryProductBannerReference } from '../../data/secondary-product-banner';
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Secondary product banner | Audiophile design system">
	<main class="secondary-product-banner-review">
		<h1 class="visually-hidden">Secondary product banner</h1>
		<div class="site-container">
			<SecondaryProductBanner
				{...secondaryProductBannerReference}
				headingLevel={2}
			/>
		</div>
	</main>
</Layout>
```

`/product-zx7-speaker/` follows the existing source page name. The parent/data layer must update it if the final Astro or WordPress permalink convention differs.

## Expected file structure

```text
docs/design-system/components/secondary-banner/
├── ASTRO_IMPLEMENTATION.md
├── DESIGN.md
├── SPEC.md
├── PLAN.md
├── Desktop.jpg
├── Tablet.jpg
└── Mobile.jpg

frontend/
├── public/assets/home/
│   ├── desktop/image-speaker-zx7.jpg
│   ├── tablet/image-speaker-zx7.jpg
│   └── mobile/image-speaker-zx7.jpg
└── src/
    ├── components/SecondaryProductBanner.astro
    ├── data/secondary-product-banner.ts
    ├── layouts/Layout.astro
    ├── pages/design-system/secondary-product-banner.astro
    └── styles/
        ├── global.css
        └── tokens.css
```

Implementation file actions:

- Copy the three stable source JPEGs without recompressing them.
- Create the component, typed data module, shared styles, and isolated review route.
- Update `Layout.astro` to import global styles once and accept a document `title` prop.
- Leave `index.astro` and `Welcome.astro` unchanged until separate home-page assembly work.
- If another component establishes the shared foundations first, reuse them and add only missing tokens; do not create parallel naming systems.

## HTML structure

Target static output:

```html
<section class="secondary-product-banner">
	<picture class="secondary-product-banner__media">
		<source media="(min-width: 64rem)" srcset="...desktop..." />
		<source media="(min-width: 48rem)" srcset="...tablet..." />
		<img
			class="secondary-product-banner__image"
			src="...mobile/default..."
			width="654"
			height="640"
			alt=""
			loading="lazy"
			decoding="async"
		/>
	</picture>

	<div class="secondary-product-banner__content">
		<h2 class="secondary-product-banner__title">ZX7 Speaker</h2>
		<a
			class="secondary-product-banner__cta"
			href="/product-zx7-speaker/"
			aria-label="See ZX7 Speaker product"
		>
			See Product
		</a>
	</div>
</section>
```

Implementation rules:

- Resolve the heading tag from `headingLevel`; visual styling never changes with semantic level.
- Render the required desktop and tablet `<source>` elements with `min-width: 64rem` and `min-width: 48rem`, ordered largest condition first. Keep required `image` as the mobile/fallback `<img>`.
- Include `width` and `height` on the fallback `<img>`. Include source dimensions where Astro/HTML output supports them so the browser can calculate the selected source ratio.
- Render the picture before the content because its image is decorative by default; it is absolutely positioned and does not interrupt reading or focus order.
- Use an empty `alt` by default. If `imageAlt` contains unique meaningful information, pass it through unchanged after content validation.
- Render only one interactive element: the CTA anchor.
- Add no role that duplicates native `section`, heading, image, or anchor semantics.
- Add no script or hydration directive.

## CSS strategy

### Architecture

- Keep component rules in `SecondaryProductBanner.astro` so Astro scopes them.
- Use mobile-first BEM-like classes, logical properties, and component-local custom properties.
- Use viewport media queries at `48rem` and `64rem` for both internal layout and `<picture>` source selection.
- Keep CSS and HTML media thresholds identical. The source files are different crops, so selecting a desktop crop while retaining a tablet/mobile layout could violate the text safe area.
- Treat the standard full-width `.site-container` as part of the component's placement contract. If a future page needs this banner in a narrow column on a wide viewport, that use case requires a separately approved responsive strategy rather than silently mixing crop and layout states.
- Keep the content in normal flow inside a one-cell grid. Absolutely position only the media layer.
- Use `min-block-size: 20rem`, not a rigid `block-size`, so the normal reference remains exactly `320px` while valid wrapping, zoom, or increased text can grow the component rather than be clipped.
- Do not add transitions, animation, transforms on interaction, or reduced-motion code; the design has no motion.

### Clipping and stacking

The component root should own the fallback background, radius, grid alignment, and stacking context, but it should not use `overflow: hidden`.

`.secondary-product-banner__media` should be absolutely inset, inherit the radius, and clip only the image. This achieves the rounded artwork while leaving the CTA focus ring unclipped. The content sits above the media through an explicit stacking layer.

This structure is preferable to clipping the entire section and then trying to repair a hidden outline.

### Shared tokens

Create or reuse these shared roles:

| Token | Initial value | Use |
| --- | ---: | --- |
| `--color-black` | `#000` | Heading, CTA text/border, default focus ring |
| `--color-white` | `#fff` | CTA hover text |
| `--color-surface-muted` | `#f1f1f1` | Fallback surface |
| `--color-page` | `#fafafa` | Review/page background |
| `--font-family-sans` | `Manrope, sans-serif` | Site typography |
| `--font-weight-bold` | `700` | Heading and CTA |
| `--radius-card` | `0.5rem` | Banner radius |
| `--container-max` | `69.375rem` | `1110px` page maximum |
| `--container-gutter-mobile` | `1.5rem` | `24px` mobile page gutter |
| `--container-gutter-tablet` | `2.46875rem` | `39.5px` tablet gutter; produces the exact `689px` content width at `768px` |
| `--focus-ring-width` | `0.1875rem` | `3px` shared focus thickness |
| `--focus-ring-offset` | `0.1875rem` | `3px` separation from CTA border |
| `--focus-ring-color-light` | `#000` | Ring visible on the light image |

Self-host one approved Manrope Latin variable WOFF2 covering the shared weight range, retain its OFL license, declare it with `font-display: swap`, and preload that one critical font file from `Layout.astro`. Use `font-size-adjust: from-font` as a progressive enhancement for a more stable fallback. Do not retain a font package dependency.

### Component values

| Property | Mobile base | Tablet `@media (min-width: 48rem)` | Desktop `@media (min-width: 64rem)` |
| --- | ---: | ---: | ---: |
| Reference block size | `20rem` (`320px`) | `20rem` | `20rem` |
| Content start inset | `1.5rem` (`24px`) | `3.875rem` (`62px`) | `5.9375rem` (`95px`) |
| Content max inline size | `14rem` (`224px`) | `14rem` | `14rem` |
| Heading-to-CTA gap | `2rem` (`32px`) | `2rem` | `2rem` |
| CTA size | `10rem × 3rem` | same | same |
| Radius | `0.5rem` | same | same |

The reference children still form the measured `204 × 118px` one-line group. The wrapper allows up to `224px` solely so valid product names near the editorial limit do not orphan a final letter; this remains inside the mobile crop's quiet text-safe area. Grid alignment reproduces the measured `101px` top offset without hardcoding it.

### Typography and CTA

- Title: `28px/38px`, bold, black, `2px` letter spacing, uppercase, no margin.
- Keep source strings in editorial casing and apply uppercase visually with CSS.
- Allow wrapping and use `overflow-wrap: anywhere` only as a last-resort guard. Do not truncate, shrink, or inject line breaks in the component.
- CTA: `160 × 48px`, inline-flex centered, transparent background, `1px` black border, no radius, no text decoration, and no wrapping.
- CTA label: `13px`, bold, `1px` letter spacing, uppercase.
- Default hover fallback, until a shared button primitive exists: black background and white text.
- Active state may retain the hover colors; it must not remove focus.
- `:focus-visible` uses an outline with visible width and offset. Add a `Highlight` outline inside `@media (forced-colors: active)` if the shared ring is not visible in forced colors.
- Do not create a shared Button component solely for this banner. Reuse one later only if it already matches the exact outlined-button contract.

## Responsive behavior

### Mobile, below `48rem` viewport width

- Fill the parent container and keep a `320px` minimum height.
- Use the `24px` content inset and keep content left-aligned and vertically centered.
- Use the mobile/default crop. The reference mobile file scales from `654 × 640` to `327 × 320` without additional cropping.
- Keep the product partially visible on the right; do not stack or center the content.
- At a `320px` viewport in the standard container, permit the banner to narrow below `327px` without horizontal scrolling. The fixed `160px` CTA and `204px` content measure still fit with the mobile inset.

### Tablet, `48rem` through `63.999rem` viewport width

- Keep the same height and horizontal composition.
- Change the content inset to `62px`.
- Select the tablet art-directed source at the standard `48rem` viewport transition.
- Preserve the right-biased speaker and quiet left text area.

### Desktop, `64rem` and wider viewport width

- Keep the same height and composition.
- Change the content inset to `95px`.
- Select the desktop art-directed source at the standard `64rem` viewport transition.
- Cap overall width through the parent `.site-container`, not inside this component.
- At `1110px`, match the exact Figma crop and offsets; do not scale the whole component beyond the container maximum.

### Text and intermediate widths

- One-line titles are the approved reference state and should remain the editorial default.
- A valid wrapped title expands the content group; grid centering keeps it balanced.
- If content exceeds the reference height under zoom or increased text, the section grows beyond `320px`. This is an accessibility safeguard, not a new default visual variant.
- A CTA label that cannot fit on one line fails content validation; the component must not silently shrink or truncate it.
- Test widths immediately around both thresholds and at intermediate viewports to confirm that crop and layout switch together without overflow or text collision.

## Accessibility details

- Use a real `section`, contextual heading, and anchor. The heading names the section, so a redundant `aria-label` on the section is unnecessary.
- Default to `h2`, but support `h1`–`h6` so the parent can maintain a sequential page outline.
- Keep the title as live text. The component remains understandable when the image fails.
- Render the image with `alt=""` by default. Do not announce the product photo when it only repeats the nearby product identity.
- If an editor supplies meaningful `imageAlt`, require information beyond the visible title; do not use `aria-hidden` in that case.
- Derive or accept a contextual CTA name that contains the visible label and product title.
- Keep only the CTA in the tab order. Do not add `tabindex`, click handlers, nested links, or duplicate banner-level links.
- Preserve the DOM order rather than using CSS `order` or reversed flex flow.
- Ensure the `160 × 48px` target remains operable with pointer, touch, keyboard, and speech input.
- Keep `:focus-visible` distinct from the `1px` CTA border and ensure the media clipping layer cannot clip it.
- Validate black title/CTA contrast against every editor-provided crop. Do not add an unapproved overlay to compensate for invalid imagery.
- Test keyboard activation, forced colors, broken images, `200%` browser zoom, and increased text size.

## Image and asset handling

- Copy source assets from `docs/design-code/assets/home/{mobile,tablet,desktop}/` to matching stable paths under `frontend/public/assets/home/`.
- Preserve filenames, dimensions, bytes, crop, and quality for the first visual implementation.
- Use root-relative `/assets/...` URLs. This matches the planned frontend convention and maps cleanly to future WordPress asset helpers.
- Use an HTML `<picture>` and `<img>`, not a CSS background image. HTML discovery supports responsive selection, explicit dimensions, alt behavior, lazy/eager control, and LCP tuning.
- Do not use Astro's image service for this first public-asset implementation. The repository currently favors copied public assets and WordPress portability.
- Use `object-fit: cover`, `object-position: left center`, and the three supplied crops as the complete v1 art-direction strategy.
- Use the required mobile image as fallback `src` and always emit the required tablet/desktop sources.
- Derive loading, decoding, and fetch priority only from `imagePriority`; omit default `fetchpriority` rather than outputting `auto`.
- If a consuming page moves this banner above the fold and measures it as LCP, it passes `imagePriority="high"`.
- Do not use `image-set()` or CSS background images for the reference image. The image can be a large contentful paint candidate and should remain discoverable by the HTML preload scanner.
- Preserve the supplied JPEG bytes for visual parity. The `689 × 320` tablet and `1110 × 320` desktop files are 1× assets; record that limitation for future CMS-provided high-density sources rather than manufacturing missing detail.

## Integration with existing design-system conventions

- Component: PascalCase `SecondaryProductBanner.astro`.
- Data module and route: lowercase, hyphenated `secondary-product-banner.ts` and `secondary-product-banner.astro`.
- Props and reference data: strict TypeScript, with content selection outside the component.
- CSS: scoped, mobile-first, BEM-like, token-driven, logical-property based, and synchronized with responsive image media conditions.
- Output: static HTML/CSS with no client-side framework, hydration, or business logic.
- Layout ownership: `.site-container` owns maximum width and page gutters; the banner fills the available width and owns only its internal composition.
- Assets: stable public paths mirroring the source asset tree.
- Accessibility: native elements first, visible focus, contextual link name, and an explicit decorative-versus-meaningful image decision.
- Portability: every field maps directly to escaped WordPress text, URL, alt, and responsive attachment data; no Astro-only client behavior is required.
- Review workflow: approve the isolated design-system route before modifying the home page.

Because the current frontend has no implemented shared foundations, the first component to land should establish `tokens.css`, `global.css`, `.site-container`, Manrope loading, and `Layout` title support. Later components must reuse those files rather than re-declare them.

## Reconciliation against `DESIGN.md`, `SPEC.md`, and `PLAN.md`

| Requirement | Concrete implementation decision | Status |
| --- | --- | --- |
| General-purpose/editor-managed | All content and image data are external typed props | Aligned |
| Required content | `title`, `ctaLabel`, internal `ctaUrl`, and all three image crops are required | Stricter v1 contract that guarantees the required responsive composition |
| Responsive images/focal point | Three required named image assets; focal-point controls deferred | Aligned with the spec's “breakpoint-specific images or focal metadata” requirement |
| `320px` at references | `min-block-size: 320px`; exact at normal reference content, expandable for accessibility | Aligned with acceptance criteria and zoom requirement |
| `8px` clipped image radius | Root radius plus independently clipped media layer | Aligned |
| 24/62/95px insets | Component custom property changed by the same media thresholds as `<picture>` | Aligned |
| Vertical centering | Grid alignment, not fixed `top: 101px` | Aligned with documented intent |
| Art-directed image | `<picture>` with stable desktop/tablet/default sources | Aligned |
| Decorative image default | `alt=""`; optional meaningful alt supported | Aligned |
| Contextual heading | Dynamic `h1`–`h6`, default `h2`, fixed visual style | Aligned |
| CTA-only interaction | One anchor; no wrapper link | Aligned |
| Focus not clipped | Root overflow remains visible; media clips separately | Aligned |
| No overlay/gradient | None proposed | Aligned |
| Long text | Editorial constraint plus safe wrapping/growth; no truncate/shrink | Resolves the implementation behavior without changing the preferred one-line design |
| Missing or malformed required content | Descriptive failure in every environment | Resolves the previously open runtime behavior without hiding publishing errors |

No contradiction remains between this plan and the three source documents. The only deliberate flexibility is allowing the component to grow above `320px` when zoom or valid wrapping would otherwise clip content; the normal reference state remains `320px`.

## Differences from the original `PLAN.md`

- The documentation path is corrected to the actual `docs/design-system/components/secondary-banner/` directory. `PLAN.md` incorrectly lists `secondary-product-banner/PLAN.md` as the documentation location.
- The current frontend is recorded as the starter it actually is. The original plan references category-banner conventions as though implementation may already exist; no such Astro component or shared styles are present on this branch.
- The component receives flat props directly instead of a single `promotion` object. The field names still match `SPEC.md`, and direct Astro spread usage is simpler and consistent with the adjacent primary-banner plan.
- Image strings become typed `{ src, width, height }` assets so markup can include intrinsic dimensions and avoid layout-shift ambiguity.
- Tablet and desktop sources are required alongside the mobile/fallback source; speculative focal-point and redundant `mobileImage` fields are removed from v1.
- Breakpoints are concrete and synchronized: `48rem` and `64rem` media conditions control both layout and `<picture>` selection. The original plan left these thresholds provisional.
- The verified image dimensions and the fact that the three assets are true art-directed crops are now documented.
- The reference uses required `image` as its mobile fallback and omits redundant `mobileImage`; the original example supplied the same path twice.
- The outer clipping strategy is resolved: only the media layer clips, which guarantees the CTA focus ring remains visible.
- The reference uses `min-block-size: 320px` rather than an inflexible fixed height, preserving exact visual height while allowing accessibility-driven growth.
- A single `imagePriority` prop atomically selects normal or LCP behavior, preventing lazy/high-priority contradictions.
- Required-content failure behavior, internal-only CTA validation, CTA accessible-name fallback, forced-colors focus, and LCP ownership are specified concretely rather than deferred.
- Focus tokens are fixed at a `3px` black ring with a `3px` offset instead of remaining TBD.
- V1 is explicitly supported only as a full-width child of `.site-container`; narrow-column placement on wide viewports is deferred.
- The supplied tablet/desktop 1× density limitation is documented rather than obscured by generated formats or upscaling.
- The planned font token name is `--font-family-sans`, aligning with adjacent design-system planning, rather than the original `--font-family-base` placeholder.

## Implementation checklist

### Preparation and foundations

- [ ] Confirm no concurrent component work has already created `tokens.css`, `global.css`, `.site-container`, or Manrope loading.
- [ ] Create or reuse the minimum shared color, font, weight, radius, container, and focus tokens.
- [ ] Add the global reset, responsive image defaults, page defaults, and standard `.site-container`.
- [ ] Vendor one official Manrope Latin variable WOFF2 plus its OFL license; declare it with `font-display: swap` and preload it once.
- [ ] Update `Layout.astro` to import global styles once and accept a document title.
- [ ] Copy all three ZX7 source JPEGs to the matching `frontend/public/assets/home/` paths without modifying them.

### Data and component

- [ ] Create `secondary-product-banner.ts` with the exact interfaces and reference data documented above.
- [ ] Create `SecondaryProductBanner.astro` with flat typed props and documented defaults.
- [ ] Validate trimmed required strings, internal root-relative URL shape, heading/priority unions, and positive metadata for all three images; throw on failure in every environment.
- [ ] Always render the required desktop/tablet sources and mobile fallback in the documented order.
- [ ] Render intrinsic fallback dimensions, explicit alt behavior, and atomic normal/high image-priority attributes.
- [ ] Render a dynamic contextual heading and one CTA anchor.
- [ ] Derive a contextual CTA accessible name when no override is supplied.
- [ ] Merge only the optional outer class; add no slot, script, hydration, visual variant, or extra CTA.

### Styling

- [ ] Add scoped mobile-first BEM CSS using logical properties.
- [ ] Add synchronized `48rem`/`64rem` CSS media queries matching the `<picture>` source conditions.
- [ ] Match the `327 × 320`, `689 × 320`, and `1110 × 320` references.
- [ ] Implement the measured `24px`, `62px`, and `95px` content insets.
- [ ] Center normal-flow content vertically and preserve the `32px` gap.
- [ ] Clip only the media layer; verify root overflow does not hide focus.
- [ ] Match title typography and the `160 × 48px` outlined CTA.
- [ ] Add default, hover, active, focus-visible, and forced-colors-safe focus states without layout shift.

### Review route and validation

- [ ] Create `/design-system/secondary-product-banner` with `Layout`, `.site-container`, and reference data.
- [ ] Compare against `Mobile.jpg`, `Tablet.jpg`, and `Desktop.jpg` at component widths `327px`, `689px`, and `1110px`.
- [ ] Also validate `320px`, `375px`, `768px`, `1024px`, and `1440px` viewports and widths between thresholds.
- [ ] Confirm the selected `<picture>` source at each reference viewport.
- [ ] Test one-line and two-line titles, the `24`/`16` character editorial guidance cases, missing/invalid required data, an external/protocol-relative CTA, and a broken image.
- [ ] Test image safe-area/contrast with valid and deliberately invalid crops; reject the invalid editorial case rather than adding an overlay.
- [ ] Test keyboard focus and activation, pointer/touch target, speech-accessible name, forced colors, `200%` zoom, and increased text size.
- [ ] Run `pnpm build` from `frontend/` and confirm no new client runtime or UI framework is emitted.
- [ ] Keep `index.astro` unchanged until isolated visual and accessibility review passes.

## Readiness

The component is ready to implement in an isolated Astro review route. The source assets, strict content contract, internal-only link policy, font strategy, focus tokens, semantic structure, synchronized responsive measurements, crop strategy, and validation targets are all concrete.

V1 is intentionally limited to full-width `.site-container` placement and the supplied three-crop art-direction model. Future CMS work may add high-density sources or focal controls only after a demonstrated content need. Home-page integration remains a separate approval step.
