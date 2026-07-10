# Category Banner Astro Implementation Plan

This plan describes how to implement the category banner specified in [`DESIGN.md`](DESIGN.md) as a reusable Astro component. It covers the minimum design-system foundations, component API, content model, responsive CSS, review route, and validation work required for completion.

The target is a data-driven, server-rendered component with no client-side JavaScript. The result must remain portable enough to become a WordPress theme partial later.

## Current State

The Astro application is still the default starter:

- No shared design tokens or global Audiophile styles exist.
- Manrope font files are not present.
- The category assets have not been copied into `frontend/public/`.
- No component data layer or isolated design-system review routes exist.
- No automated visual or component test suite is configured.

The implementation therefore needs a small foundations step before the component can be validated accurately.

## Planned File Changes

| File | Action |
| --- | --- |
| `frontend/src/components/CategoryBanner.astro` | Add the reusable Astro component |
| `frontend/src/data/category-banner.ts` | Add typed category content and the component data contract |
| `frontend/src/styles/tokens.css` | Add required color, typography, layout, and radius tokens |
| `frontend/src/styles/global.css` | Add the reset, Manrope defaults, and shared container behavior |
| `frontend/src/layouts/Layout.astro` | Import global styles and support a configurable page title |
| `frontend/src/pages/design-system/category-banner.astro` | Add an isolated review route |
| `frontend/public/assets/shared/desktop/image-category-thumbnail-*.png` | Copy the three category product images |
| `frontend/public/assets/shared/desktop/icon-arrow-right.svg` | Copy the existing arrow icon |
| `frontend/public/assets/fonts/` | Add approved self-hosted Manrope font files when available |

The starter `Welcome.astro` and the home route should remain unchanged until home-page assembly begins.

## Phase 1: Establish the Minimum Foundations

### 1. Add shared design tokens

Create `frontend/src/styles/tokens.css` and expose the values needed by the category banner as CSS custom properties.

Initial tokens:

```css
:root {
	--color-primary: #d87d4a;
	--color-primary-hover: #fbaf85;
	--color-black: #000;
	--color-surface-muted: #f1f1f1;
	--color-page: #fafafa;
	--radius-card: 0.5rem;
	--container-max: 69.375rem;
	--container-gutter-mobile: 1.5rem;
	--container-gutter-tablet: 2.4375rem;
}
```

The values correspond to:

- Maximum desktop content width: 1110px.
- Mobile gutter: 24px.
- Tablet gutter: 39px.
- Card radius: approximately 8px.

Add shared focus-ring variables once the site-wide focus treatment is selected. Avoid introducing component-specific duplicates of global colors or typography values.

### 2. Add global styles

Create `frontend/src/styles/global.css` with:

- `box-sizing: border-box` for all elements and pseudo-elements.
- Body margin reset.
- Manrope as the primary font family.
- Default page and text colors.
- Block-level responsive image defaults.
- Shared centered-container behavior.
- Responsive container gutters.
- Sensible link and list resets that do not remove accessibility affordances.

Import the global stylesheet once from `Layout.astro`. Component-specific layout rules must remain scoped within `CategoryBanner.astro`.

### 3. Add Manrope

Use approved self-hosted WOFF2 files for the weights needed by this component:

- `500` for body/system use.
- `700` for category names and action labels.

Add the font files under `frontend/public/assets/fonts/` and declare them with `@font-face` in the global foundation layer. Use `font-display: swap`.

Manrope is not currently present in the repository. Pixel-accurate typography validation should be considered incomplete until the approved font files or another approved loading strategy is available.

## Phase 2: Prepare Component Assets

Copy these existing files into the Astro public asset tree while preserving stable paths:

```text
frontend/public/assets/shared/desktop/image-category-thumbnail-headphones.png
frontend/public/assets/shared/desktop/image-category-thumbnail-speakers.png
frontend/public/assets/shared/desktop/image-category-thumbnail-earphones.png
frontend/public/assets/shared/desktop/icon-arrow-right.svg
```

Source files:

```text
docs/design-code/assets/shared/desktop/image-category-thumbnail-headphones.png
docs/design-code/assets/shared/desktop/image-category-thumbnail-speakers.png
docs/design-code/assets/shared/desktop/image-category-thumbnail-earphones.png
docs/design-code/assets/shared/desktop/icon-arrow-right.svg
```

Asset rules:

- Do not alter or recompress the source images.
- Preserve intrinsic dimensions to prevent layout shift.
- Do not add CSS drop shadows; the shadows are part of the PNG artwork.
- Do not create mobile or tablet image variants because these transparent assets are shared across breakpoints.
- Keep URLs stable and independent from Astro's source-asset pipeline for easier WordPress migration.

## Phase 3: Define the Data Contract

Create `frontend/src/data/category-banner.ts` and export both the item type and the default collection.

Suggested type:

```ts
export interface CategoryBannerItem {
	name: string;
	href: string;
	image: {
		src: string;
		width: number;
		height: number;
		alt: string;
	};
	actionLabel: string;
	current?: boolean;
}
```

Default data:

| Category | Destination | Intrinsic image dimensions |
| --- | --- | --- |
| Headphones | `/headphones/` | 438 × 422px |
| Speakers | `/speakers/` | 438 × 408px |
| Earphones | `/earphones/` | 438 × 380px |

Use `Shop` as the default action label. Set each product image's alternative text to an empty string because the image repeats the category name contained in the same link.

The component should receive this data through props rather than importing default storefront content internally. This keeps rendering separate from the content source and allows the same markup to accept future WordPress navigation or taxonomy data.

## Phase 4: Implement the Component API

Create `frontend/src/components/CategoryBanner.astro` with a strict TypeScript prop contract.

Suggested API:

```ts
interface Props {
	items: readonly CategoryBannerItem[];
	ariaLabel?: string;
}
```

Behavior:

- Default `ariaLabel` to `Product categories`.
- Accept the collection from the consuming page.
- Avoid assuming exactly three items in the markup, even though the documented visual composition targets three.
- Add `aria-current="page"` when an item's `current` property is true.
- Render static HTML and CSS with no `client:*` hydration directive.
- Fail clearly during development or render nothing intentionally if an empty collection is supplied.

## Phase 5: Build Semantic Markup

Recommended hierarchy:

```text
nav.category-banner
└── ul.category-banner__list
    └── li.category-banner__item
        └── a.category-banner__link
            ├── img.category-banner__image
            └── span.category-banner__surface
                ├── span.category-banner__title
                └── span.category-banner__action
                    ├── “Shop”
                    └── decorative arrow image
```

Markup requirements:

- Use a `nav` landmark with the configurable accessible label.
- Represent the categories as an unordered list.
- Use one link for the complete category card; do not create a nested “Shop” link.
- Keep the DOM order as headphones, speakers, then earphones.
- Use styled text rather than a fixed heading level so the component does not disrupt the surrounding page's heading hierarchy.
- Give the product image and arrow empty alternative text because the visible category/action text already names the destination.
- Ensure the image cannot become a separate pointer target.

## Phase 6: Implement the Mobile Layout

Use mobile-first component-scoped CSS.

Base layout:

- One grid column.
- Width controlled by the shared page container.
- 217px item frame height.
- 165px gray surface height.
- Gray surface aligned to the bottom of the item frame.
- 52px between the item top and the gray surface top.
- 16px vertical gap between item frames.
- 683px total height at the 327px reference width.
- Approximately 8px surface radius.
- Horizontally centered artwork, title, and action.

Use a positioned item frame to reserve space for the overlapping artwork. This avoids collisions between absolutely positioned images and surrounding sections.

Define compact-layout custom properties for:

- Product image width.
- Product vertical offset.
- Surface height.
- Title/action gap.
- Bottom content inset.

Do not implement the mobile layout as a carousel or horizontal scroller.

## Phase 7: Add the Tablet Layout

At the shared tablet breakpoint, initially proposed as `48rem`:

- Change the list to three equal columns.
- Use a 10px column gap.
- Retain the compact 217px item height.
- Retain the 165px surface height.
- Retain the 52px surface top offset.
- Reduce the product artwork proportionally without changing its source or crop.

Use flexible columns:

```css
grid-template-columns: repeat(3, minmax(0, 1fr));
```

At the 689px reference width, this must resolve to:

```text
223px card + 10px gap + 223px card + 10px gap + 223px card = 689px
```

Avoid fixed column widths so the layout can interpolate without overflow between the documented viewports.

## Phase 8: Add the Desktop Layout

At the shared desktop breakpoint, initially proposed as `64rem`:

- Increase the column gap to 30px.
- Increase each item frame to 284px.
- Increase the surface height to 204px.
- Increase the surface top offset to 80px.
- Increase product artwork scale.
- Adjust title/action spacing to match the expanded composition.

At the 1110px maximum container width:

```text
350px card + 30px gap + 350px card + 30px gap + 350px card = 1110px
```

The component should stop growing at the shared maximum width and remain centered.

The proposed 48rem and 64rem breakpoints are initial implementation decisions. Adjust them only if intermediate-width testing shows content compression, overlap, or a premature change in composition.

## Phase 9: Tune Product Artwork

The three PNG files share a 438px canvas width but have different intrinsic heights and transparent bounds. Start with one shared compact image width and one shared desktop image width.

Compare each rendered product against the references for:

- Visual center rather than transparent-canvas center.
- Top position.
- Relative scale.
- Shadow position against the gray surface.
- Amount of product overlap.

If category-specific corrections are necessary, expose presentation variables at the item level, for example:

```html
<li style="--image-width: ...; --image-offset-y: ...">
```

Do not scatter category-name selectors throughout the stylesheet. Keep visual correction values out of business data unless the future CMS is expected to control presentation.

## Phase 10: Add Interaction States

Implement these states on the single category link:

- The complete card acts as the pointer and touch target.
- The `Shop` text changes to `#D87D4A` on hover.
- The arrow remains orange in its default state.
- `:focus-visible` draws a clear, non-color-only focus indicator around the actionable item.
- A current category exposes `aria-current="page"`.
- The effective interactive target exceeds 44 × 44px.

Do not add product movement or hover animation in the first version. It is not required by the specification and would introduce unnecessary reduced-motion behavior.

## Phase 11: Add an Isolated Review Route

Create `frontend/src/pages/design-system/category-banner.astro`.

The route should:

- Import `Layout`, `CategoryBanner`, and the default category data.
- Set a descriptive document title.
- Render the component on the `#FAFAFA` page background.
- Provide enough page padding for artwork overflow and focus outlines.
- Avoid decorative frames that would interfere with comparison against the reference images.
- Include a current-category example if it can be done without altering the primary reference composition.

Do not integrate the component into `src/pages/index.astro` during this task. The isolated route provides a focused review target and keeps home-page assembly separate.

## Phase 12: Validate Responsive Composition

Run the Astro development server and inspect the isolated route at the three target viewport widths.

| Viewport | Expected content width | Expected component height |
| --- | --- | --- |
| 375px | 327px | 683px |
| 768px | 689px | 217px |
| 1440px | 1110px | 284px |

Compare against:

- [`mobile.jpg`](mobile.jpg)
- [`tablet.jpg`](tablet.jpg)
- [`desktop.jpg`](desktop.jpg)

Check:

- Card widths and gaps.
- Surface heights, offsets, colors, and radii.
- Product image scale and overlap.
- Product shadow placement.
- Title and action baselines.
- Typography, letter spacing, and capitalization.
- Centering inside the shared page container.
- Absence of horizontal overflow.
- Stable behavior at widths between the three references.

## Phase 13: Validate Accessibility

Manually verify:

- Tab navigation reaches each category exactly once.
- Focus order follows the visual and DOM order.
- Focus rings are visible and are not clipped.
- Each link announces a useful category destination.
- Product and arrow images do not duplicate the accessible name.
- `aria-current` is announced on a current-category example.
- The component remains usable at 200% browser zoom.
- Increased text size does not overlap the images or action.
- Pointer, keyboard, and touch input activate the same destination.
- Reduced-opacity action text maintains acceptable contrast against `#F1F1F1`.

## Phase 14: Validate the Production Build

Run all Astro commands from `frontend/`.

```bash
pnpm build
```

Confirm:

- Astro's strict TypeScript build succeeds.
- No additional UI framework or runtime dependency was introduced.
- The component emits static HTML and scoped CSS without hydration.
- All production asset URLs resolve.
- The review route builds successfully.
- No existing starter route is broken unintentionally.

## Definition of Done

The implementation is complete when:

- `CategoryBanner.astro` accepts typed external category data.
- The component uses one semantic navigation link per category.
- The component matches the three supplied reference images at their documented content widths.
- Card dimensions, gaps, surface offsets, and total heights match the measured specification.
- Artwork remains centered and correctly overlaps the surfaces.
- Default, hover, focus-visible, and current-page states are implemented.
- Keyboard, pointer, touch, zoom, and increased-text checks pass.
- The component introduces no horizontal overflow between reference widths.
- The component requires no client-side JavaScript.
- `pnpm build` passes.
- The component can later be added to the home route without changing its internal markup or data contract.

## Open Decisions During Implementation

- Approved Manrope font source and files.
- Final shared breakpoint thresholds after intermediate-width review.
- Exact compact and desktop product-image rendering dimensions.
- Any category-specific artwork alignment corrections.
- The final site-wide focus-ring token.
- Whether the current category needs a persistent visual treatment in addition to `aria-current`.

Resolve these during implementation using the component references and record any adopted shared tokens in the repository-level design documentation.
