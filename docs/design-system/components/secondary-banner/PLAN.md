# PLAN.md — Secondary Product Banner

## Purpose of this plan

This plan defines a practical implementation path for the **Secondary Product Banner** component described by:

- Figma section: `Secondary Product Banner`, node `62849:219`.
- `secondary-banner-DESIGN.md`.
- `secondary-banner-SPEC.md`.
- The existing Audiophile project structure and design-system conventions.

This is an implementation plan only. It does **not** implement the component and does **not** include production component code.

---

## Alignment review notes

This plan was reviewed against `DESIGN.md` and `SPEC.md` to reduce unnecessary complexity and keep the work aligned with the current project.

Important corrections applied in this version:

- The data model now follows the `SPEC.md` field names: required `image`, optional `desktopImage`, `tabletImage`, `mobileImage`, and optional `imageFocalPoint`.
- The plan no longer treats a nested `images` object as the preferred data shape unless the implementation team explicitly chooses to introduce a mapping layer later.
- The component remains CTA-only clickable for the first version, matching the current design assumption.
- Responsive image art direction is kept as a required implementation concern, but complex CMS crop tooling is not part of this component implementation.
- Shared foundations are scoped to the minimum needed tokens/styles instead of becoming a broad design-system refactor.
- Focus styling is handled on the CTA so it is not clipped by the rounded image container.

---

## Source inspection summary

### Figma component facts

| Variant | Node | Reference size | Content inset | Notes |
| --- | ---: | ---: | ---: | --- |
| Desktop | `62849:156` | `1110 × 320` | `95px` | Full-width landscape crop, product subject on right. |
| Tablet | `62849:166` | `689 × 320` | `62px` | Same height, tighter image crop. |
| Mobile | `62849:204` | `327 × 320` | `24px` | Same height, right-biased crop, content remains left-aligned. |

Shared visual facts:

- Banner height: `320px`.
- Border radius: `8px`.
- Fallback surface: `#f1f1f1`.
- Title style: Manrope Bold, `28px / ~38px`, `2px` letter spacing, uppercase.
- CTA style: outlined button, `160 × 48px`, `1px` black border, transparent background.
- CTA label style: Manrope Bold, `13px`, `1px` letter spacing, uppercase.
- Content group is vertically centered: `(320 - 118) / 2 = 101px`.
- Image is art-directed per breakpoint and must protect the left text safe area.

### Documentation facts

`DESIGN.md` and `SPEC.md` define this component as a **general-purpose editor-managed secondary product banner**, not a hardcoded ZX7-only banner.

Required publish-ready content:

- `title`
- `ctaLabel`
- `ctaUrl`
- `image`

Optional or enhancement fields:

- `desktopImage`
- `tabletImage`
- `mobileImage`
- `imageFocalPoint`
- `imageAlt`
- `ctaAccessibleLabel`
- `headingLevel`

### Project facts relevant to implementation

The current implementation target is the Astro frontend under `frontend/`.

The project conventions documented so far are:

- Semantic HTML.
- CSS custom properties.
- Flexbox and CSS Grid.
- Mobile-first workflow.
- Astro components.
- WordPress portability later.
- Figma/reference-image validation.

Current project state to account for:

- `frontend/package.json` is a minimal Astro setup.
- `frontend/src/layouts/Layout.astro` is still close to the Astro starter and does not yet import Audiophile global styles.
- `frontend/src/pages/index.astro` still renders the default starter content.
- Repo-level design-system documentation already defines the relevant color, typography, radius, container, and responsive validation targets.
- Existing category-banner documentation establishes useful conventions: static Astro components, typed data files, scoped CSS, isolated design-system review routes, no client-side JavaScript, and stable public asset paths.

---

## Files to create or modify

### Documentation file

| File | Action | Purpose |
| --- | --- | --- |
| `docs/design-system/components/secondary-product-banner/PLAN.md` | Create or update when committing docs | Store this implementation plan beside the component design/spec docs. |

### Frontend component files

| File | Action | Purpose |
| --- | --- | --- |
| `frontend/src/components/SecondaryProductBanner.astro` | Create | Reusable static Astro component. |
| `frontend/src/data/secondary-product-banner.ts` | Create | Typed reference data and reusable content contract. |
| `frontend/src/pages/design-system/secondary-product-banner.astro` | Create | Isolated visual and accessibility review route. |

### Shared foundation files

| File | Action | Purpose |
| --- | --- | --- |
| `frontend/src/styles/tokens.css` | Create or modify only if missing/incomplete | Define shared Audiophile tokens used by this and other components. |
| `frontend/src/styles/global.css` | Create or modify only if missing/incomplete | Define reset, font defaults, page background, image defaults, and container utility. |
| `frontend/src/layouts/Layout.astro` | Modify | Import global styles once and support a configurable document title. |

### Asset files

Use stable repository assets. Do **not** depend on temporary Figma MCP asset URLs for implementation.

| File | Action | Purpose |
| --- | --- | --- |
| `frontend/public/assets/home/desktop/image-speaker-zx7.jpg` | Copy from `docs/design-code/assets/home/desktop/` if present | Desktop reference image. |
| `frontend/public/assets/home/tablet/image-speaker-zx7.jpg` | Copy from `docs/design-code/assets/home/tablet/` if present | Tablet reference image. |
| `frontend/public/assets/home/mobile/image-speaker-zx7.jpg` | Copy from `docs/design-code/assets/home/mobile/` if present | Mobile/reference fallback image. |

If the `docs/design-code` source images are not present locally, stop and resolve the stable asset source before implementing the component. The Figma-export URLs are useful for inspection only and expire.

### Files not to modify yet

| File | Reason |
| --- | --- |
| `frontend/src/pages/index.astro` | Keep home-page assembly separate from isolated component implementation. |
| `frontend/src/components/Welcome.astro` | Starter cleanup can happen later as part of page assembly. |

**Assumption:** If the shared foundation files already exist by the time implementation starts, this task should update/reuse them instead of creating duplicate token or global-style files.

---

## Proposed component structure

### Component responsibilities

`SecondaryProductBanner.astro` should:

- Render one editor-provided product/promotion banner.
- Render the product title as semantic heading text.
- Render one CTA link.
- Render a responsive image layer with art-directed sources.
- Preserve the left-content/right-image composition.
- Apply component-scoped layout and visual styles.
- Keep image, title, CTA label, URL, and accessibility labels data-driven.

It should **not**:

- Fetch product data.
- Select products automatically.
- Manage CMS/editor validation UI.
- Render price, rating, inventory, product description, or multiple CTAs.
- Add carousel behavior.
- Add overlay/gradient contrast treatment unless approved later as a design change.
- Make the full banner clickable in the first version.

### Markup structure

Use a static Astro component with no client-side JavaScript.

Recommended structure:

```text
section.secondary-product-banner
├── picture.secondary-product-banner__picture
│   ├── source desktop image, when provided
│   ├── source tablet image, when provided
│   └── img fallback/default image
└── div.secondary-product-banner__content
    ├── heading element selected from headingLevel
    └── a.secondary-product-banner__cta
```

Notes:

- The image layer should appear before the content in the DOM and sit visually behind it.
- The CTA must be an `<a>` element because it navigates.
- The first version should make **only the CTA** interactive.
- The heading level should be configurable by page context while preserving the H4 visual style.
- The component should emit static HTML and scoped CSS only.

---

## Styling strategy

### General approach

Use the project’s current design-system direction:

- Astro component with scoped CSS.
- CSS custom properties for shared tokens.
- Mobile-first CSS.
- Semantic HTML.
- BEM-like class names for maintainability and portability.
- No Tailwind dependency.
- No React conversion from Figma-generated code.
- No client-side JavaScript.

### Shared tokens to use or add

Use shared tokens where they already exist. Add only the minimum missing tokens needed for this component and nearby components.

| Token role | Value | Notes |
| --- | ---: | --- |
| `--color-black` | `#000000` | Title, CTA text, border. |
| `--color-white` | `#ffffff` | CTA hover text. |
| `--color-surface-muted` | `#f1f1f1` | Fallback banner surface. |
| `--color-page` | `#fafafa` | Review page background. |
| `--radius-card` | `0.5rem` / `8px` | Banner radius. |
| `--container-max` | `69.375rem` / `1110px` | Max content width. |
| `--container-gutter-mobile` | `1.5rem` / `24px` | Mobile page gutter. |
| `--container-gutter-tablet` | `2.4375rem` / `39px` | Tablet page gutter. |
| `--font-family-base` | `Manrope, sans-serif` | Global typeface. |
| `--focus-ring-*` | TBD | Shared focus style once confirmed. |

Component-level custom properties may be used for values that are specific to this banner:

| Component variable | Mobile | Tablet | Desktop |
| --- | ---: | ---: | ---: |
| `--secondary-banner-height` | `320px` | `320px` | `320px` |
| `--secondary-banner-content-inset` | `24px` | `62px` | `95px` |
| `--secondary-banner-content-gap` | `32px` | `32px` | `32px` |
| `--secondary-banner-cta-width` | `160px` | `160px` | `160px` |
| `--secondary-banner-cta-height` | `48px` | `48px` | `48px` |

### Button styling

The CTA should match the outlined/dark secondary-button pattern from the design system.

Default state:

- Transparent background.
- Black text.
- `1px` black border.
- Square corners.
- `160 × 48px` visual size.
- Uppercase `13px` Manrope Bold text with `1px` letter spacing.

Hover state:

- Follow the project’s dark/outlined button behavior.
- If no shared button primitive exists yet, use black background and white text for the first version.

Focus-visible state:

- Must be visible without relying only on color.
- Must not be clipped by the rounded image container.
- Prefer an inset/non-clipped treatment on the CTA itself, or ensure enough internal offset for an outline.

---

## Responsive implementation strategy

### Breakpoint strategy

Use shared project breakpoints when available. If breakpoints are not yet defined, use provisional thresholds only for this isolated route and validate them visually:

- Mobile/default: below tablet breakpoint.
- Tablet: around `48rem`.
- Desktop: around `64rem` or where the full desktop composition can be achieved.

**Assumption:** Final breakpoint values will be shared across components and may be adjusted after testing intermediate widths.

### Layout strategy

- The parent/shared container controls the component width.
- The banner fills the available container width up to the shared `1110px` maximum.
- Height remains `320px` at all inspected breakpoints.
- Use flex alignment for vertical centering instead of hardcoding `top: 101px`.
- Keep foreground content left-aligned at every breakpoint.
- Apply measured content insets by breakpoint:
  - Mobile: `24px`.
  - Tablet: `62px`.
  - Desktop: `95px`.
- Keep the visual content group close to the inspected `204px` width for valid editorial content.
- Ensure the content area never exceeds the available width on very small screens.

### Image strategy

Use responsive art direction with `<picture>`.

Reference/default content should use stable public paths:

- Desktop source: `/assets/home/desktop/image-speaker-zx7.jpg`.
- Tablet source: `/assets/home/tablet/image-speaker-zx7.jpg`.
- Mobile/default source: `/assets/home/mobile/image-speaker-zx7.jpg`.

Rendering behavior:

- Position the image layer absolutely inside the rounded banner container.
- Use `width: 100%`, `height: 100%`, and `object-fit: cover`.
- Use the art-directed source files as the primary crop mechanism.
- Do not add a generic overlay or gradient in the first version.
- Support focal/object-position metadata only as a lightweight optional enhancement if the data contract supplies it; do not build full CMS crop tooling in this component.

**Key implementation risk:** A generic single image with `object-fit: cover` is not enough for this component. The design depends on breakpoint-specific crops or equivalent crop/focal metadata that keep the left text area quiet and readable.

### Very small viewport behavior

- Confirm behavior at `320px` viewport width.
- Do not create horizontal page scroll.
- Keep the mobile inset aligned with the project gutter as much as possible.
- Do not switch to a stacked image/text layout.
- Do not introduce a horizontal scroller.

---

## Data / props implementation

### Data shape aligned with `SPEC.md`

Create a reusable TypeScript content contract in `frontend/src/data/secondary-product-banner.ts`.

Suggested field contract:

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Visible product or product-family title. |
| `ctaLabel` | Yes | Visible CTA text. |
| `ctaUrl` | Yes | Link destination. |
| `image` | Yes | Required default/fallback image. In the reference data this should be the mobile image. |
| `desktopImage` | Optional, strongly recommended | Desktop-specific art-directed source. |
| `tabletImage` | Optional, strongly recommended | Tablet-specific art-directed source. |
| `mobileImage` | Optional | Mobile-specific source when different from `image`. |
| `imageFocalPoint` | Optional | Lightweight per-breakpoint object-position/crop hint if a single image is used. |
| `imageAlt` | Optional | Empty/omitted by default when the image is decorative. |
| `ctaAccessibleLabel` | Optional | Clear accessible CTA name when visible label is generic. |
| `headingLevel` | Optional | Semantic heading level selected by page context. |

Implementation note:

- Prefer this flat field model because it matches `SPEC.md`.
- If the team later prefers a nested `images` object, add a clear adapter layer rather than letting the component drift away from the spec.

### Component props

Suggested prop contract:

| Prop | Purpose |
| --- | --- |
| `promotion` | One object matching the content model above. |
| `headingLevel` | Optional override if not stored in the promotion object. |

Avoid extra passthrough props unless a concrete use case appears. Keeping the first version small will make the component easier to migrate to WordPress later.

### Default/reference data

The isolated review route should use data that recreates the Figma example:

| Field | Value |
| --- | --- |
| `title` | `ZX7 Speaker` |
| `ctaLabel` | `See Product` |
| `ctaUrl` | `/speakers/zx7-speaker/` or final confirmed product route |
| `image` | `/assets/home/mobile/image-speaker-zx7.jpg` |
| `desktopImage` | `/assets/home/desktop/image-speaker-zx7.jpg` |
| `tabletImage` | `/assets/home/tablet/image-speaker-zx7.jpg` |
| `mobileImage` | `/assets/home/mobile/image-speaker-zx7.jpg` |
| `imageAlt` | empty string or omitted |
| `ctaAccessibleLabel` | `See ZX7 Speaker product` |

**Assumption:** The exact product URL is not confirmed. Use the final route from the project routing/content model once available.

### Validation behavior

Keep validation simple and avoid turning the Astro component into a CMS validator.

Recommended behavior:

- Use complete, valid data in the reference data file.
- In local development, fail clearly or render a visible development-only warning if required fields are missing.
- In production, do not render a broken interactive banner when required fields are missing.
- Keep editor/publish validation rules documented for the CMS layer.

**Key implementation risk:** Silent missing or invalid data can ship an inaccessible or visually broken promotional banner.

---

## Accessibility implementation

### Semantics

- Render a section-like promotional component with one visible heading.
- Allow `headingLevel` to be set by the consuming page; constrain it to valid heading levels.
- Render the CTA as a semantic `<a>` element.
- Do not nest links.
- Do not make both the full banner and the CTA separate links in the first version.

### CTA accessible name

- Visible labels such as `See Product` are visually correct but generic out of context.
- If `ctaAccessibleLabel` is provided, use it.
- If it is not provided and the visible label is generic, derive a useful accessible label from `ctaLabel` and `title`.

Recommended derived pattern:

```text
{ctaLabel} — {title}
```

or a natural equivalent:

```text
See {title} product
```

### Image accessibility

- Default behavior: decorative image with empty alt text.
- If `imageAlt` is supplied because the image communicates information not present in the title, expose it.
- Avoid duplicating the product title in the image alt text.

### Keyboard, focus, and contrast

- The CTA must be keyboard reachable exactly once.
- Focus order should follow DOM order.
- Focus-visible style must be obvious on the light image/background.
- Focus-visible style must not be clipped by the rounded/overflow-hidden image container.
- Default, hover, active, and focus states must preserve readable contrast.
- Because editors can change the image, the content workflow must confirm a safe text area before publishing.

---

## Testing checklist

### Visual / responsive checks

Validate the isolated review route at these reference browser widths:

| Browser viewport | Expected content width | Expected banner size |
| --- | ---: | ---: |
| `375px` | `327px` | `327 × 320` |
| `768px` | `689px` | `689 × 320` |
| `1440px` | `1110px` | `1110 × 320` |

Check:

- Banner height is `320px` at all reference widths.
- Border radius is approximately `8px`.
- Image is clipped inside the rounded container.
- Correct responsive image source is selected at each breakpoint.
- Content remains left-aligned and vertically centered.
- Content inset matches the reference: `24px`, `62px`, `95px`.
- Title typography matches H4: `28px / 38px`, `2px` letter spacing, uppercase.
- CTA matches the outlined secondary button treatment: `160 × 48px`.
- Left text safe area remains readable.
- No horizontal overflow appears at `320px`, `375px`, `768px`, or `1440px`.
- Intermediate widths between references do not create crop, content, or focus-ring collisions.

### Content edge-case checks

Test the component with:

- A valid one-line title similar to `ZX7 Speaker`.
- A two-line title at the maximum editorial length under consideration.
- A CTA label near the maximum accepted length.
- Missing image in development/preview state.
- A dark or busy image crop to confirm the failure is caught by review/editorial guidance.

### Interaction checks

- CTA hover state follows the dark/outlined button pattern.
- CTA active state remains readable.
- CTA focus-visible state is clear and not clipped.
- Only the CTA is clickable.
- Pointer, keyboard, and touch activation use the same destination.

### Accessibility checks

- Heading level is correct in the surrounding page context.
- Keyboard tab reaches the CTA once.
- CTA accessible name includes the product title when visible text is generic.
- Decorative image content is not redundantly announced.
- Text and CTA remain readable at browser zoom up to at least `200%` for valid editorial content.
- Increased text size does not overlap the CTA or escape the container for valid editorial content.
- External-link behavior follows project policy if external URLs are allowed.

### Build checks

Run from `frontend/`:

```bash
pnpm build
```

Confirm:

- Astro build succeeds.
- No React, Tailwind, or client-side runtime dependency was introduced.
- Isolated design-system route builds.
- Asset URLs resolve.
- Existing starter route is not unintentionally broken.

---

## Risks and mitigations

### Key implementation risks

1. **Image art direction failure**
   - Risk: A single image or wrong crop can place product detail behind the title/CTA.
   - Mitigation: Use breakpoint-specific `<picture>` sources or equivalent focal metadata; validate at all reference widths.

2. **Temporary Figma assets accidentally used in production**
   - Risk: Figma MCP image URLs expire and are not stable project assets.
   - Mitigation: Copy/use stable repository assets under `frontend/public/`.

3. **Editor-selected images may break contrast**
   - Risk: Generic editor images can make the black title/CTA unreadable.
   - Mitigation: Document image-selection rules; provide preview/review guidance; do not publish without a safe text area.

4. **Focus ring may be clipped**
   - Risk: The rounded image container needs clipping, which can hide an outside focus outline.
   - Mitigation: Put visible focus treatment on the CTA itself using an inset/non-clipped pattern or enough internal offset.

5. **Long title behavior is only partially designed**
   - Risk: Long product names may wrap into the CTA or visually imbalance the fixed-height banner.
   - Mitigation: Keep editorial limits concise; test a two-line title; document final accepted behavior before CMS integration.

6. **CTA label overflow**
   - Risk: The fixed `160px` CTA cannot handle long labels.
   - Mitigation: Keep short labels; validate label length; decide whether to reject, truncate, wrap, or resize before CMS integration.

7. **Spec/data drift**
   - Risk: Implementation data shape can drift from the documented `SPEC.md` fields.
   - Mitigation: Use `image`, `desktopImage`, `tabletImage`, and `mobileImage` as the implementation contract unless the spec is intentionally updated.

8. **Token duplication**
   - Risk: Multiple components may define slightly different versions of the same colors, radii, breakpoints, and typography.
   - Mitigation: Create/reuse shared tokens once in `frontend/src/styles/tokens.css`; component CSS should consume them.

9. **Component becomes too CMS-specific too early**
   - Risk: Building editor UI, crop tooling, or complex validation into the Astro component makes it less portable.
   - Mitigation: Keep the component presentational and data-driven; leave CMS validation/tooling to the CMS layer.

10. **Whole-banner clickability ambiguity**
    - Risk: Making the full banner clickable changes semantics, focus behavior, and visual hit target expectations.
    - Mitigation: First implementation makes only the CTA interactive. Revisit only if design/product approves it.

11. **Missing Manrope font source**
    - Risk: Typography cannot be validated accurately without the approved font files or loading strategy.
    - Mitigation: Confirm/add approved Manrope loading before final visual QA.

12. **Breakpoint/media mismatch**
    - Risk: CSS layout breakpoints and `<picture>` media queries can become misaligned.
    - Mitigation: Define breakpoint tokens once and reuse the same threshold logic for layout and image source selection.

---

## Implementation sequence

### Phase 1 — Confirm foundations and asset availability

1. Check whether `frontend/src/styles/tokens.css` and `frontend/src/styles/global.css` already exist.
2. Check whether `docs/design-code/assets/home/{desktop,tablet,mobile}/image-speaker-zx7.jpg` exists.
3. Confirm Manrope loading strategy.
4. Confirm provisional or shared breakpoint values.

Output of this phase:

- Known source assets.
- Known shared-style status.
- No component implementation yet.

### Phase 2 — Add or update minimum shared foundations

1. Add/reuse required color, radius, container, typography, and focus tokens.
2. Add/reuse global reset and base body styles.
3. Add/reuse shared responsive container utility.
4. Import global styles from `Layout.astro`.
5. Add configurable page title support to `Layout.astro` if missing.

Output of this phase:

- Shared foundation ready for this and future components.

### Phase 3 — Prepare stable reference assets

1. Copy the three ZX7 reference images into `frontend/public/assets/home/{desktop,tablet,mobile}/`.
2. Preserve file names and directory structure.
3. Do not recompress or edit the assets.
4. Record intrinsic dimensions if useful for documentation/data.

Output of this phase:

- Stable public image paths for the review route.

### Phase 4 — Define the typed data contract

1. Create `frontend/src/data/secondary-product-banner.ts`.
2. Define the content interface using the `SPEC.md` field names.
3. Add default/reference ZX7 promotion data.
4. Keep data external to the component.

Output of this phase:

- Component can receive editor-like data through props.

### Phase 5 — Create the Astro component shell

1. Create `frontend/src/components/SecondaryProductBanner.astro`.
2. Add prop contract.
3. Add semantic markup only.
4. Add heading-level handling.
5. Add CTA accessible-label behavior.
6. Add missing-required-field handling for development/preview.

Output of this phase:

- Static semantic component structure exists.

### Phase 6 — Add component-scoped visual and responsive styles

1. Add mobile-first scoped CSS.
2. Apply fixed `320px` height, rounded clipping, and fallback background.
3. Add responsive `<picture>` image layer.
4. Add vertically centered content group.
5. Add title and CTA visual styles.
6. Add responsive content insets.
7. Confirm very small viewport behavior.

Output of this phase:

- Component visually approximates all three references.

### Phase 7 — Add interaction and accessibility details

1. Add CTA hover state.
2. Add active state.
3. Add focus-visible treatment that is not clipped.
4. Confirm decorative image behavior.
5. Test keyboard navigation.

Output of this phase:

- Interaction and accessibility requirements are covered.

### Phase 8 — Add isolated review route

1. Create `frontend/src/pages/design-system/secondary-product-banner.astro`.
2. Import `Layout`, the component, and default data.
3. Render the component inside the shared centered container.
4. Use the page background from the design system.
5. Keep this route isolated from home-page assembly.

Output of this phase:

- Dedicated page for visual and accessibility QA.

### Phase 9 — Validate and tune

1. Compare against the Figma references at `375px`, `768px`, and `1440px` browser widths.
2. Validate intermediate widths.
3. Validate `320px` minimum width assumption.
4. Test content edge cases.
5. Test keyboard, focus, zoom, and reduced text-size/increased text-size behavior.
6. Run `pnpm build`.

Output of this phase:

- Component ready for review and later home-page integration.

---

## Assumptions

- The implementation target is the Astro app inside `frontend/`.
- The component should remain static/server-rendered and require no client-side JavaScript.
- The component should be portable to a future WordPress theme partial.
- Shared tokens and global styles should be created once and reused across components.
- Manrope should be loaded through an approved project-level font-loading strategy.
- The reference ZX7 images exist or can be added under stable repository paths.
- The first implementation should make only the CTA interactive.
- The first implementation should not introduce an overlay, gradient, or scrim because the Figma design does not show one.
- The product title and CTA label are expected to be concise editorial strings.
- The project minimum supported viewport is approximately `320px`, pending confirmation.

---

## Open questions

1. Are the shared foundation files from the category-banner plan already implemented locally, or should this task create them first?
2. What are the final shared breakpoint token names and values?
3. What is the approved Manrope font source?
4. Are the stable ZX7 assets present in `docs/design-code/assets/home/`, and should the implementation copy them to `frontend/public/assets/home/`?
5. What is the final product URL for the default ZX7 example?
6. Should `headingLevel` be provided per component instance or controlled by the parent page only?
7. What is the official maximum title length for editor-managed product banners?
8. What is the official maximum CTA label length?
9. Should external CTA URLs be supported in this component?
10. If external URLs are supported, should they open in the same tab or a new tab?
11. Should the component eventually support whole-banner clickability, or remain CTA-only?
12. Will the editor/CMS provide breakpoint-specific image crops, focal-point controls, or both?
13. Should contrast validation be editorial/manual only, or should the CMS provide an image preview warning?
14. What is the final site-wide focus-ring style?
15. Should optional overlay support be added later for editor-selected images, or should image selection rules remain strict?

---

## Recommended next step

Start with **Phase 1: confirm foundations and asset availability**.

Before implementing `SecondaryProductBanner.astro`, verify:

1. whether shared token/global-style files already exist locally,
2. whether the stable ZX7 source images exist in `docs/design-code/assets/home/`,
3. how Manrope should be loaded,
4. which breakpoint values should be used for both CSS layout and `<picture>` source selection.

Then proceed with the isolated review route before integrating the banner into the home page.
