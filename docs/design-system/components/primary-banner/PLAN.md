# PLAN.md — Primary Banner

## Goal

Implement the **Primary Banner** as a reusable, product-agnostic Astro component that matches the inspected Figma reference and stays aligned with `DESIGN.reviewed.md` and `SPEC.reviewed.md`.

The inspected `ZX9 Speaker` banner is the **reference content instance**, not the component identity. The component must allow the product name, supporting copy, CTA label, CTA destination, product image, and product image alt-text decision to change without changing the component structure.

This plan does **not** implement component code. It defines the practical path for implementation.

---

## Source inputs reviewed

- Figma node `62844:102`, containing desktop, tablet, and mobile Primary Banner frames.
- `DESIGN.reviewed.md`.
- `SPEC.reviewed.md`.
- Existing project conventions:
  - `frontend/` is the Astro design-system prototype.
  - The final implementation should remain portable to WordPress theme partials.
  - Use semantic HTML, accessible labels, mobile-first CSS, PascalCase Astro components, lowercase/hyphenated routes and asset paths.
  - Use CSS custom properties for design tokens.
  - Do **not** introduce Tailwind, Sass, React, Vue, or another UI framework.

---

## Scope guardrails

To keep the implementation maintainable and incremental:

- Implement **one component only**: `PrimaryBanner.astro`.
- Add only the minimum shared foundations needed if they do not already exist.
- Do not create a new shared `Button.astro` or `ResponsivePicture.astro` as part of this component unless the project already has those primitives ready to reuse.
- Do not integrate into the home page until the isolated review route passes visual and accessibility checks.
- Do not add CMS, API, cart, analytics, animation, or WordPress-specific behavior.
- Do not use temporary Figma asset URLs in the implementation; they are short-lived and unsuitable for source code.

---

## Files to create or modify

### Documentation files

| File | Action | Purpose |
| --- | --- | --- |
| `docs/design-system/components/primary-banner/DESIGN.md` | Create or replace | Store the reviewed visual and UX contract. |
| `docs/design-system/components/primary-banner/SPEC.md` | Create or replace | Store the reviewed technical product spec. |
| `docs/design-system/components/primary-banner/PLAN.md` | Create or replace | Store this implementation plan. |

### Component and review files

| File | Action | Purpose |
| --- | --- | --- |
| `frontend/src/components/PrimaryBanner.astro` | Create | Reusable Astro component. |
| `frontend/src/data/primary-banner.ts` | Create | Typed ZX9 reference instance plus reusable content type. |
| `frontend/src/pages/design-system/primary-banner.astro` | Create | Isolated review route for visual QA. |
| `frontend/src/pages/index.astro` | Modify later only after review approval | Home-page integration. |

### Foundation files

Touch these only after auditing what already exists locally:

| File | Action | Purpose |
| --- | --- | --- |
| `frontend/src/styles/tokens.css` | Create or extend | Shared colors, typography, radii, container, breakpoint, and focus tokens. |
| `frontend/src/styles/global.css` | Create or extend | Reset, Manrope setup, base body styles, image defaults, and shared container behavior. |
| `frontend/src/layouts/Layout.astro` | Modify only if needed | Import global styles once and optionally support a better page title. |

### Asset files

Copy stable local source assets into `frontend/public/assets/...` only after confirming the exact source paths in `docs/design-code/assets/`.

Expected ZX9 home-feature assets:

| Target file | Purpose |
| --- | --- |
| `frontend/public/assets/home/desktop/image-speaker-zx9.png` | Desktop product image. |
| `frontend/public/assets/home/tablet/image-speaker-zx9.png` | Tablet product image. |
| `frontend/public/assets/home/mobile/image-speaker-zx9.png` | Mobile product image. |
| `frontend/public/assets/home/desktop/pattern-circles.svg` or `frontend/public/assets/shared/pattern-circles.svg` | Decorative acoustic rings. |

Asset rules:

- Verify source files before copying.
- Preserve original filenames and dimensions where possible.
- Do not recompress, crop, or visually alter assets during first implementation.
- Use stable `/assets/...` URLs from `public/` for WordPress portability.
- Do not use remote Figma MCP asset URLs.

---

## Proposed component structure

### Component responsibility

`PrimaryBanner.astro` renders exactly one promotional product banner from passed-in content.

It should not:

- fetch product data,
- choose the featured product,
- hardcode `ZX9 Speaker`,
- hardcode the ZX9 image as permanent content,
- render multiple promotions,
- require client-side JavaScript,
- hide required text to preserve screenshot-perfect spacing.

### Markup structure

Recommended semantic structure:

```text
section.primary-banner
├── decorative rings layer, aria-hidden
├── picture.primary-banner__media
│   └── img.primary-banner__image
└── div.primary-banner__content
    ├── h2/h3/etc.primary-banner__heading
    ├── p.primary-banner__copy
    └── a.primary-banner__cta
```

Implementation notes:

- Use a real heading element. The default can be `h2`, with a controlled `headingLevel` / `headingTag` option if needed by page context.
- Keep heading, copy, and CTA as real text.
- Render the CTA as an `<a>` because it navigates to a product detail page.
- Do not wrap the entire banner in a link; only the CTA is interactive in the Figma reference.
- Keep decorative rings hidden from assistive technologies.
- Keep decorative and image layers behind the content in stacking order.

### Class naming

Use a stable BEM-style class family scoped to the Astro component:

- `.primary-banner`
- `.primary-banner__rings`
- `.primary-banner__media`
- `.primary-banner__image`
- `.primary-banner__content`
- `.primary-banner__heading`
- `.primary-banner__copy`
- `.primary-banner__cta`

Avoid adding generic classes that conflict with future site-wide utilities.

---

## Styling strategy

### General approach

- Use Astro component-scoped CSS for Primary Banner-specific styling.
- Use shared CSS custom properties for design-system values.
- Use local component custom properties for exact image/ring offsets and breakpoint-specific measurements.
- Write mobile-first CSS.
- Prefer `rem` for authored CSS values, with pixel references kept in comments or docs when useful for visual QA.
- Do not copy Figma-generated React or Tailwind code.
- Do not add Tailwind, Sass, or a styling framework.

### Shared tokens to reuse or add

Only add tokens that are missing and likely to be reused by other modules.

| Token | Value / role |
| --- | --- |
| `--color-primary` | `#d87d4a` |
| `--color-primary-hover` | `#fbaf85` |
| `--color-black` | `#000000` |
| `--color-white` | `#ffffff` |
| `--color-dark-button-hover` | approximately `#4c4c4c` |
| `--font-family-base` | `Manrope`, system fallback |
| `--font-weight-medium` | `500` |
| `--font-weight-bold` | `700` |
| `--radius-card` | `0.5rem` / `8px` |
| `--container-max` | `69.375rem` / `1110px` |
| `--container-gutter-mobile` | `1.5rem` / `24px` |
| `--container-gutter-tablet` | `2.4375rem` / `39px`, if used by existing layout |
| `--focus-ring-width` | `2px`, unless the project defines another value |
| `--focus-ring-offset` | `3px` or `4px`, unless the project defines another value |

### Breakpoint tokens

Assumed until confirmed:

- Tablet: around `48rem`.
- Desktop: around `64rem`.

These should be centralized in the shared token layer if the project already uses breakpoint custom properties or documented media-query values.

### Component-local CSS properties

Inside `.primary-banner`, define local values for:

- banner visual min-height,
- content max-width,
- image width,
- image top offset,
- image horizontal offset / alignment,
- ring size,
- ring top offset,
- ring horizontal offset,
- heading font size / line height / letter spacing,
- body copy opacity,
- CTA width and height.

Use breakpoint overrides to update these values instead of scattering one-off measurements across many selectors.

### CTA styling

For this component, style the CTA locally unless a matching shared button primitive already exists.

Required visual treatment:

- `160px × 48px`,
- black background,
- white uppercase label,
- Manrope Bold,
- `13px` font size,
- `1px` letter spacing,
- hover background around `#4c4c4c`,
- visible focus state,
- no layout shift between states.

Do not create a reusable button primitive just for this task. Extract later only when another component needs the same pattern.

### Decorative rings

Preferred approach:

- Use the project’s `pattern-circles.svg` asset.
- Render as an absolutely positioned decorative element or background layer.
- Mark as `aria-hidden="true"` if rendered as an element.
- Use `pointer-events: none`.
- Place behind product image and content.
- Clip through the rounded banner with `overflow: hidden`.

Fallback approach:

- Draw rings with CSS only if the source SVG cannot be found or does not match the reference after positioning.
- Document this deviation before continuing visual QA.

---

## Responsive implementation strategy

### Layout approach

Use a hybrid layout:

- `.primary-banner` is `position: relative`, `overflow: hidden`, and rounded.
- Decorative rings are absolutely positioned.
- Product image is positioned per breakpoint.
- Text content remains in normal flow inside its content group where possible.
- CTA remains in normal flow below the copy.

This avoids fragile fully absolute text placement and is safer for text zoom and localization.

### Mobile base layout

Visual target: `327px × 600px` content width.

Plan:

- Mobile is the default layout.
- Banner width is `100%` of parent container.
- Use `min-height: 600px` at the reference content width.
- Product image is centered near the top.
- Rings are centered/offset behind the product and heading.
- Content is centered below the product image.
- Heading target: around `280px` wide, `36px / 40px`, letter spacing around `1.29px`.
- Copy target: around `280px` wide, `15px / 25px`.
- CTA is centered below copy.
- At containers narrower than `327px`, avoid horizontal overflow and keep text/CTA reachable even if vertical spacing deviates.

### Tablet layout

Visual target: `689px × 720px` content width.

Plan:

- Keep vertical centered composition.
- Use `min-height: 720px`.
- Increase product image to the tablet visual scale.
- Use a content block around `349px` wide.
- Heading target: `56px / 58px`, `2px` letter spacing.
- Center heading, copy, and CTA.
- Keep oversized rings clipped behind the product/content stack.

### Desktop layout

Visual target: `1110px × 560px` content width.

Plan:

- Use `min-height: 560px`.
- Switch to horizontal composition.
- Product image is on the left and may be clipped at the bottom.
- Content block is on the right, around `349px` wide.
- Heading, copy, and CTA are left-aligned.
- Use desktop ring size and offset.
- Ensure product image/rings never cover the CTA or text.

### Intermediate widths

- Do not build only for exact `327px`, `689px`, and `1110px` widths.
- Between references, let the banner fill the parent container and interpolate using percentages, `clamp()`, or breakpoint-specific custom properties.
- Avoid horizontal scrolling at all tested widths.
- If the component is later used outside the standard page container, reassess whether container queries are needed. Do not introduce container queries in the first pass unless the project already uses them.

### Height behavior

Use `min-height`, not fixed `height`, for the banner.

- Reference content should visually match the Figma heights.
- Meaningful text and the CTA must not be clipped under browser zoom, user font settings, or localization review.
- Decorative artwork may remain clipped.

---

## Data / props implementation

### Public content contract

Use one promotion object passed from the parent page or review route.

| Field | Required | Purpose |
| --- | ---: | --- |
| `productName` | Yes | Visible heading text. |
| `supportingCopy` | Yes | Short promotional paragraph. |
| `ctaLabel` | Yes | Visible CTA text. |
| `ctaHref` | Yes | CTA destination. |
| `productImage` | Yes | Product image fallback source or image object. |
| `productImageAlt` | Yes | Explicit alt-text decision; descriptive text or empty string. |

### Recommended image object

The ZX9 reference should use responsive sources because the design system identifies breakpoint-specific ZX9 assets.

Recommended shape conceptually:

| Field | Purpose |
| --- | --- |
| `mobile.src` | Mobile product image URL. |
| `tablet.src` | Tablet product image URL. |
| `desktop.src` | Desktop product image URL. |
| `width` / `height` per source | Intrinsic dimensions for layout stability. |
| `alt` | Explicit alt-text decision. |

Do not make responsive sources more abstract than needed. A simple object is enough for this component.

### Optional fields

| Field | Use |
| --- | --- |
| `ctaAriaLabel` | More specific accessible name when visible label is generic. |
| `headingLevel` or `headingTag` | Keeps document outline correct in different page contexts. |
| `headingLines` / `displayNameParts` | Only if controlled line breaks are approved. Not required in first pass. |
| `imagePosition` | Only for future unusual product silhouettes. Not required for ZX9 first pass. |

### Reference content file

Create `frontend/src/data/primary-banner.ts` with the ZX9 reference instance:

- `productName`: `ZX9 Speaker`.
- `supportingCopy`: `Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.`
- `ctaLabel`: `See Product`.
- `ctaHref`: unresolved until route pattern is confirmed.
- `productImage`: mobile/tablet/desktop ZX9 sources.
- `productImageAlt`: unresolved until the image-alt decision is confirmed.

The component should receive this data through props. It should not import the ZX9 data internally.

---

## Accessibility implementation

### Semantics

- Use a real heading element.
- Use a real paragraph for supporting copy.
- Use an anchor for the CTA.
- Keep all visible text in HTML, not images.
- Keep DOM order logical: decorative layer, image, text, CTA is acceptable visually, but the accessible reading order should emphasize heading, copy, and CTA.

### CTA

- Must be reachable with `Tab`.
- Must be operable with keyboard activation.
- Must have a clear accessible name.
- If visible text remains `See Product`, prefer a more specific `aria-label`, such as `See ZX9 Speaker product`.
- Focus-visible state must be clearly visible and must not be clipped by the banner’s `overflow: hidden`.
- Hit area remains `160px × 48px`, which satisfies the target-size requirement.

### Product image

- `productImageAlt` must be explicitly passed.
- Allow `alt=""` only if the image is intentionally decorative/redundant with the heading.
- For the isolated review route, document the chosen alt strategy in the data file.
- Preserve width/height attributes or equivalent intrinsic sizing to reduce layout shift.

### Decorative rings

- Hide from assistive technologies.
- Prevent pointer interaction.
- Ensure they do not cover CTA/text in stacking order.

### Contrast and forced-colors

- Body-copy contrast is unresolved in the design/spec.
- Initial implementation may preserve Figma opacity only if this is accepted as a visual decision.
- Do not claim WCAG AA compliance while the `15px` semi-transparent white body copy remains unresolved.
- In forced-colors or high-contrast modes, ensure the CTA remains visible and focusable. A simple `@media (forced-colors: active)` check may be needed if the default focus treatment fails.

### Text zoom

- Test with browser zoom and increased text size.
- Heading, copy, and CTA must remain visible and reachable.
- Accessibility wins over screenshot-perfect fixed height if they conflict.

---

## Testing checklist

### Build validation

From `frontend/`:

- `pnpm install` if dependencies are not installed.
- `pnpm build` before handoff.
- Confirm no new dependency was added.
- Confirm no client-side hydration directive was added.

### Visual QA

Use the isolated review route first.

| Target | Check |
| --- | --- |
| `327px` content width | Mobile composition: image top, centered content, `600px` visual target. |
| `689px` content width | Tablet composition: centered vertical stack, larger heading, `720px` visual target. |
| `1110px` content width | Desktop composition: image left, text right, `560px` visual target. |

Also test viewport-level references:

- `375px` viewport with mobile gutters.
- `768px` viewport with tablet gutters.
- `1440px` viewport with centered `1110px` container.

### Responsive QA

- No horizontal overflow below, between, or above reference widths.
- No product image/text collisions.
- CTA remains visible and reachable.
- Decorative rings remain clipped by the rounded container.
- Product image preserves aspect ratio.
- Desktop product image can be clipped at the bottom without clipping meaningful content.
- Layout remains acceptable at widths slightly below `327px`, or the minimum supported width is documented.

### Content QA

Test at least:

- Reference ZX9 content.
- One-word product name.
- Two-line product name.
- Supporting copy near the approved maximum.
- Long CTA label to confirm the failure mode is visible and documented.
- Empty image alt and descriptive image alt decision.
- Broken product image URL to confirm heading/copy/CTA still render.

### Accessibility QA

- Keyboard reaches CTA.
- CTA focus-visible state is clear.
- CTA accessible name is meaningful.
- Product image has explicit alt text or intentionally empty alt.
- Decorative rings are ignored by assistive technologies.
- Heading level fits the review page outline.
- Browser zoom/text zoom does not hide meaningful text or CTA.
- Body-copy contrast risk is documented and not accidentally marked resolved.
- High-contrast / forced-colors mode does not make the CTA unusable.

### Portability QA

- Component renders static HTML and CSS.
- Data is passed in from the page.
- Asset URLs are stable under `/assets/...`.
- No Astro-only business logic is required to understand or port the module to WordPress.

---

## Key implementation risks and mitigations

### Risk 1 — Over-generalizing the component

**Risk:** Adding broad variant props, shared primitives, CMS hooks, analytics, or layout variants too early makes the component harder to maintain.

**Mitigation:** Implement only the Primary Banner contract from the docs. Add optional hooks only for known needs: accessible CTA label, heading level, and responsive image sources.

### Risk 2 — Figma output conflicts with project stack

**Risk:** Figma-generated code uses React/Tailwind patterns, but the project uses Astro and plain CSS.

**Mitigation:** Use Figma only for measurements and visual intent. Write Astro markup and scoped CSS manually.

### Risk 3 — Asset path assumptions may be wrong

**Risk:** The expected ZX9 and ring assets may not exist at the assumed paths or may differ from the Figma crop.

**Mitigation:** Verify local `docs/design-code/assets/` paths before implementation. Do not proceed with remote Figma URLs. Document any missing assets before coding.

### Risk 4 — Current frontend foundations may be incomplete

**Risk:** Tokens, global CSS, Manrope loading, and review-route conventions may not exist or may still be starter-level.

**Mitigation:** Audit first. Add only minimal shared foundations that are aligned with existing docs and useful beyond this component.

### Risk 5 — Fixed Figma heights can conflict with accessibility

**Risk:** Exact `560px`, `720px`, and `600px` heights can clip content under text zoom, localization, or longer editorial copy.

**Mitigation:** Use `min-height`; keep text/CTA in normal flow where possible; document any visual deviation needed for accessibility.

### Risk 6 — Body copy contrast is unresolved

**Risk:** `15px` white text at reduced opacity over orange likely fails WCAG AA normal-text contrast.

**Mitigation:** Preserve Figma only as an explicit design decision. If WCAG AA is required, adjust contrast before marking the component complete.

### Risk 7 — Alternate product images may not fit

**Risk:** A future product may be wider, shorter, taller, or asymmetrical compared with ZX9.

**Mitigation:** Use responsive image sources and reserve a future image-positioning hook. Keep first implementation optimized for ZX9 reference and document image requirements for future instances.

### Risk 8 — Decorative rings are high-fidelity sensitive

**Risk:** Ring scale and offset define much of the visual identity and can easily look wrong.

**Mitigation:** Use the original `pattern-circles.svg`; position with breakpoint-specific component custom properties; visually compare at all three target widths.

### Risk 9 — Focus outline may be clipped

**Risk:** `overflow: hidden` is needed for rings/image clipping and may clip CTA focus indicators.

**Mitigation:** Keep CTA away from container edges and use an inset or offset-safe focus treatment. Test with keyboard before approval.

### Risk 10 — Heading line breaks may differ

**Risk:** The reference breaks `ZX9 Speaker` into two clean visual lines. Other names may wrap poorly.

**Mitigation:** Use editorial constraints first. Do not add controlled line-break props unless the team confirms this is needed.

### Risk 11 — Home integration could hide issues

**Risk:** Implementing directly on the home page makes visual and accessibility mismatches harder to isolate.

**Mitigation:** Build and approve the isolated review route first. Integrate into the home page only afterward.

---

## Implementation sequence

### Step 1 — Save reviewed documentation

- Create `docs/design-system/components/primary-banner/` if needed.
- Add reviewed `DESIGN.md`, `SPEC.md`, and this `PLAN.md`.
- Keep naming consistent: **Primary Banner**, not **ZX9 Speaker Primary Banner**.

### Step 2 — Audit foundations and assets

Before writing the component:

- Check for `frontend/src/styles/tokens.css`.
- Check for `frontend/src/styles/global.css`.
- Check Manrope loading.
- Check existing design-system review route patterns.
- Verify source paths for ZX9 responsive images.
- Verify source path for `pattern-circles.svg`.

Decision:

- Reuse existing foundations if present.
- Add only missing minimum foundations if absent.
- Stop and document if required assets are missing.

### Step 3 — Copy assets

- Copy verified ZX9 responsive product images into stable `frontend/public/assets/...` paths.
- Copy the decorative circles SVG into a stable path.
- Preserve dimensions and names where practical.
- Avoid any optimization pass until after visual parity is confirmed.

### Step 4 — Add or extend minimal foundation styles

- Add missing design tokens.
- Add or update global CSS imports in `Layout.astro` if needed.
- Add Manrope only through the project-approved loading strategy.
- Avoid a broad CSS reset/refactor beyond what the component needs.

### Step 5 — Define reference data

- Create `frontend/src/data/primary-banner.ts`.
- Define the promotion content type.
- Add the ZX9 reference instance.
- Add TODO comments for unresolved `ctaHref` and `productImageAlt` only if those decisions remain unconfirmed.

### Step 6 — Create isolated review route

- Create `frontend/src/pages/design-system/primary-banner.astro`.
- Import layout, component, and ZX9 reference data.
- Render inside the expected content container.
- Use this route for all first-pass QA.

### Step 7 — Implement component markup

- Create `frontend/src/components/PrimaryBanner.astro`.
- Define strict props.
- Render semantic heading, paragraph, responsive image, decorative rings, and CTA link.
- Do not add client-side JavaScript.

### Step 8 — Implement mobile-first styles

- Match the `327px × 600px` reference first.
- Establish component-local custom properties.
- Verify no overflow below the mobile reference width.

### Step 9 — Add tablet styles

- Add the tablet media query using shared breakpoint conventions.
- Match the `689px × 720px` reference.
- Verify centered stack, product scale, ring placement, and heading typography.

### Step 10 — Add desktop styles

- Add the desktop media query using shared breakpoint conventions.
- Match the `1110px × 560px` reference.
- Verify product image left, text right, left alignment, bottom clipping, and rings.

### Step 11 — Add interaction and accessibility states

- Add hover state.
- Add focus-visible state.
- Add active state without layout shift.
- Verify keyboard and forced-colors behavior.

### Step 12 — Validate and document deviations

- Run `pnpm build`.
- Test visual targets and intermediate widths.
- Test content edge cases.
- Test keyboard, focus, image failure, and text zoom.
- Document any accepted deviations, especially body-copy contrast or image crop differences.

### Step 13 — Integrate into home page after approval

Only after isolated validation:

- Add the component to the home-page composition.
- Pass ZX9 reference data from the page/data layer.
- Re-run visual QA in full-page context.

---

## Assumptions

- Implementation happens inside `frontend/`.
- The final production target remains WordPress-portable markup and CSS.
- The project continues to use Astro, TypeScript, semantic HTML, and CSS custom properties.
- No Tailwind, Sass, React, Vue, or client framework will be added.
- The parent page/data layer chooses and validates the featured product.
- The first validated instance is the ZX9 reference.
- Exact route pattern for product pages is not confirmed yet.
- Exact breakpoint thresholds are not confirmed yet; shared project conventions should win.
- Source assets exist locally under `docs/design-code/assets/`, but exact paths must be verified before coding.
- Body-copy contrast remains an explicit design/accessibility decision.

---

## Open questions

1. What exact `ctaHref` should the ZX9 reference use?
2. Should `productImageAlt` be descriptive for this banner, or intentionally empty because the heading already names the product?
3. Should the body copy preserve Figma opacity, or be adjusted to meet WCAG AA normal-text contrast?
4. Should heading line breaks be controlled by content data, or rely on natural wrapping and editorial constraints?
5. What are the exact shared breakpoint values for tablet and desktop?
6. Where should `pattern-circles.svg` live: under `assets/home/desktop/` or a shared decorative asset path?
7. Is `327px` the minimum supported content width, or must narrower containers be officially supported?
8. Are localization and right-to-left support out of scope for the first implementation?
9. Should home-page integration happen in the same PR after isolated approval, or in a follow-up PR?

---

## Recommended next step

Proceed with **Step 1 and Step 2 only** before coding:

1. Save the reviewed docs under `docs/design-system/components/primary-banner/`.
2. Audit frontend foundations and verify local asset paths.

After that, the plan is ready to become an Astro implementation task for `PrimaryBanner.astro`.
