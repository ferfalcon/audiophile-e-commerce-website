# Site Footer Astro Implementation Plan

This plan describes how to implement the footer specified in [`DESIGN.md`](DESIGN.md) as a reusable, data-driven Astro component. It covers the current project baseline, shared token changes, vector-asset handling, component and data APIs, responsive CSS architecture, interaction states, an isolated review route, and proportional validation.

The target is a fully server-rendered footer with semantic HTML and component-scoped CSS. It must emit no client-side JavaScript and remain straightforward to port into a WordPress theme partial later.

## Pre-implementation Baseline

The Astro prototype already contains several foundations that the footer should reuse:

- `frontend/src/styles/tokens.css` defines Manrope weights, the primary orange, the 1110px maximum container, responsive container gutters, and light-surface focus-ring dimensions.
- `frontend/src/styles/global.css` declares the self-hosted Manrope variable font, the box-sizing reset, page defaults, and the shared `.site-container` utility.
- The current `.site-container` resolves to the footer's measured widths without modification: 327px at 375px, 689px at 768px, and 1110px at 1440px.
- `frontend/src/layouts/Layout.astro` already imports global CSS and preloads Manrope.
- `frontend/src/pages/design-system/category-banner.astro` establishes the isolated component-review route pattern.
- The footer SVG sources remain in `docs/design-code/assets/shared/desktop/`; none has been copied into the Astro public tree yet.
- No automated visual or component test suite is configured.

The footer implementation must extend these foundations rather than recreating them. In particular, it must not add another font declaration, a second container utility, or a duplicate reset.

The worktree contains in-progress category-banner and page changes. Footer work must preserve those changes and avoid broad rewrites of shared files.

## Resolved Implementation Decisions

- Name the reusable component `SiteFooter.astro`.
- Keep the component server-rendered with no `<script>` block, framework integration, or `client:*` directive.
- Use viewport media queries for the two global-shell composition changes: tablet at `48rem` and desktop at `64rem`.
- Use media queries rather than container queries because the site footer is a full-width page-shell landmark; its state follows the global viewport and shared site gutter rather than an arbitrary card slot.
- Use a flex container for the one-dimensional logo/navigation group and CSS Grid for the description/copyright/social relationship.
- Keep the DOM in mobile reading order: logo, primary navigation, description, copyright, social navigation.
- Treat the documented heights as English-reference outcomes, never fixed production heights.
- Express implementation typography, spacing, and breakpoints in `rem` with unitless line heights; retain pixel values in this plan only as traceable reference measurements. Intrinsic SVG `width` and `height` attributes remain numeric CSS-pixel dimensions.
- Reuse the existing fixed `Copyright 2021. All Rights Reserved` text. Do not compute the year in JavaScript.
- Keep current-page styling semantic-only in the first version through `aria-current="page"`, matching the existing category component. Do not invent a persistent visual treatment until the header establishes a shared convention.
- Apply `#D87D4A` to hover, active, and focus-visible text/icon states. Add a white focus outline so keyboard focus is not communicated by color alone.
- Use the original social path geometry in a small inline `SocialIcon.astro` component with `fill="currentColor"`. Do not use CSS filters or raster copies for state changes.
- Preserve the supplied 24px visible icons and 16px visual gaps. Use real anchor padding paired with compensating negative margins on coarse pointers to create approximately 40px target boxes without changing layout measurements.
- Allow the horizontal navigation to wrap when localization or text enlargement requires it; the English reference remains one row at tablet and desktop widths.
- Keep social links in the same browsing context. Use platform-root URLs in the review/default data until Audiophile account URLs are supplied; do not add `target="_blank"` or new-tab messaging speculatively.
- Do not integrate the footer into `index.astro` or hard-code it into `Layout.astro` in this task. Validate it first through an isolated footer route; site-page assembly is a later step.

## Plan Review: Risks and Mitigations

The implementation should account for these tradeoffs explicitly rather than discovering them during visual tuning.

| Risk | Downside | Mitigation adopted in this plan |
| --- | --- | --- |
| Fixed reference heights | A hard `height` would clip translated, zoomed, or enlarged text | Reproduce the English height through padding, gaps, and line-height; let content increase block size |
| Invisible pseudo-element hit areas | Generated boxes are harder to inspect, may not satisfy automated target-size checks, and can claim unexpected pointer regions | Use padding on the actual anchors; offset it with negative margins only where necessary to preserve the measured visual rhythm |
| Horizontal navigation at tablet widths | Longer localized labels could overflow even though the English labels fit | Use `flex-wrap: wrap`, `min-inline-size: 0`, and content-driven footer height; verify English remains on one row |
| Pixel-perfect text wrapping | `text-wrap: pretty` or a fallback font can change the documented 6/3/4-line wraps | Use ordinary wrapping and wait for `document.fonts.ready` before reference screenshots |
| Desktop social 7px correction | An unexplained one-off nudge is brittle and easy to duplicate | Store it as a documented component custom property used only in the desktop grid and revalidate it after the font loads |
| Composite active reference | `Desktop-Active.jpg` shows two controls orange simultaneously and does not prove a persistent current-page style | Implement hover, active, and focus-visible orange; keep `aria-current` semantic-only until header/footer behavior is designed together |
| Platform-root social URLs | Prototype URLs are not Audiophile account URLs and could accidentally ship | Keep them in typed prototype data, use no new-tab behavior, and make replacement with approved account URLs a mandatory integration gate before adding the footer to the real site shell |
| Inline social paths | Copying SVG path data into an Astro primitive creates a second representation that can drift | Compare every path and view box against the source SVG during implementation and keep the primitive intentionally closed to arbitrary geometry |
| Isolated review route | A perfect component crop does not prove correct spacing against neighboring page modules | Validate the isolated component first, then require a separate page-shell integration check when the header/hero/home composition is assembled |

Reference fidelity is evaluated at the default 16px root font size. Accessibility and localization checks may intentionally produce a taller footer; that is correct behavior, not a visual regression.

## Planned File Changes

| File | Action |
| --- | --- |
| `frontend/src/components/SiteFooter.astro` | Add the semantic footer component and responsive scoped CSS |
| `frontend/src/components/icons/SocialIcon.astro` | Add a server-rendered icon primitive using the three supplied SVG paths and `currentColor` |
| `frontend/src/data/footer.ts` | Add strict footer content types and the default English data fixture |
| `frontend/src/styles/tokens.css` | Add dark-surface, white, muted-on-dark, and dark-surface focus tokens |
| `frontend/public/assets/shared/desktop/logo.svg` | Copy the original logo unchanged for a stable public URL |
| `frontend/src/pages/design-system/footer.astro` | Add a zero-offset isolated review route for visual comparison |

No change is required in:

- `frontend/src/styles/global.css`; its font and container behavior already match the footer.
- `frontend/src/layouts/Layout.astro`; it already imports the shared styles and font preload.
- `frontend/src/pages/index.astro`; home-page assembly remains outside this component task.
- `frontend/package.json`; the footer needs no new dependency.

## Phase 1: Extend the Shared Tokens Minimally

Update `frontend/src/styles/tokens.css` with only the shared values not already present:

```css
:root {
	--color-white: #fff;
	--color-surface-dark: #101010;
	--color-text-on-dark-muted: rgb(255 255 255 / 50%);
	--focus-ring-color-dark: #fff;
}
```

Continue using the existing tokens for:

- `--color-primary: #d87d4a`.
- `--font-family-sans`.
- `--font-weight-medium` and `--font-weight-bold`.
- `--container-max`, `--container-gutter`, and `.site-container`.
- `--focus-ring-width` and `--focus-ring-offset`.

Do not express the supporting copy by setting `opacity: 0.5` on a parent container. Use the alpha color token directly so focus indicators, child links, and future inline content are not unintentionally faded.

When writing component CSS, convert the measured spacing to `rem` (`52px` → `3.25rem`, `48px` → `3rem`, and so on). Use unitless line-height values that resolve to 25px at the reference font sizes:

```css
/* 13px / 25px */
font-size: 0.8125rem;
line-height: 1.923077;

/* 15px / 25px */
font-size: 0.9375rem;
line-height: 1.666667;
```

Do not apply `text-wrap: pretty` or `text-wrap: balance` to the description; either feature can intentionally redistribute words and break the measured reference wraps.

## Phase 2: Prepare the Brand and Social Artwork

### 2.1 Copy the logo

Copy the existing logo without modifying its path, color, view box, or intrinsic dimensions:

```text
docs/design-code/assets/shared/desktop/logo.svg
→ frontend/public/assets/shared/desktop/logo.svg
```

The component should render it as:

- `/assets/shared/desktop/logo.svg`.
- `width="143"` and `height="25"`.
- `alt="Audiophile"` inside the home link.

Do not preload the logo. It is a small below-the-fold vector and not an LCP candidate.

The source logo has a hard-coded white fill and no interaction-color state in the references. Keep it white on hover and active; apply the dark-surface focus outline to its parent link instead of attempting to recolor the `<img>` with a filter.

### 2.2 Create the social icon primitive

Create `frontend/src/components/icons/SocialIcon.astro` with a strict icon-name union imported from the footer data types through `import type`, preventing a runtime component-to-data dependency.

Supported names:

```ts
export type FooterSocialIcon = 'facebook' | 'twitter' | 'instagram';
```

For each name, reproduce the exact `viewBox` and path data from:

```text
docs/design-code/assets/shared/desktop/icon-facebook.svg
docs/design-code/assets/shared/desktop/icon-twitter.svg
docs/design-code/assets/shared/desktop/icon-instagram.svg
```

Primitive requirements:

- Render inline SVG, not `<img>`, so the path can use `fill="currentColor"`.
- Keep Facebook and Instagram at 24 × 24px.
- Keep Twitter at 24 × 20px and let its wrapper center it in a 24px visual row.
- Add `aria-hidden="true"` because the parent link provides the accessible name.
- Add `focusable="false"` defensively to prevent legacy SVG focus behavior.
- Do not include `<title>` elements that duplicate the parent link's accessible name.
- Do not expose sizing, fill, or arbitrary path props; the primitive implements a fixed design-system asset.

After transcribing the paths, compare the values directly against the original SVG files so the implementation cannot drift from the supplied geometry.

## Phase 3: Define the Footer Data Contract

Create `frontend/src/data/footer.ts` and export the types separately from the default content.

Suggested types:

```ts
export interface FooterNavigationItem {
	label: string;
	href: string;
	current?: boolean;
}

export type FooterSocialIcon = 'facebook' | 'twitter' | 'instagram';

export interface FooterSocialLink {
	platform: string;
	href: string;
	icon: FooterSocialIcon;
}

export interface SiteFooterContent {
	logoHref: string;
	navigation: readonly FooterNavigationItem[];
	description: string;
	copyright: string;
	socialLinks: readonly FooterSocialLink[];
}
```

Export a default `siteFooterContent` object with `as const satisfies SiteFooterContent`.

Default content:

| Field | Value |
| --- | --- |
| Logo destination | `/` |
| Primary navigation | Home, Headphones, Speakers, Earphones |
| Category destinations | `/`, `/headphones/`, `/speakers/`, `/earphones/` |
| Description | Exact paragraph from `DESIGN.md` |
| Copyright | `Copyright 2021. All Rights Reserved` |
| Social order | Facebook, Twitter, Instagram |
| Prototype social destinations | Public platform roots, in the same browsing context |

Do not store presentational measurements, class names, colors, icon path data, or breakpoint choices in `footer.ts`. WordPress or another CMS should eventually provide labels, destinations, current state, and text—not layout details.

Add a source comment immediately above the prototype social data stating that the roots are review-only fallbacks, not verified Audiophile accounts. Replacing all three with approved account URLs is required before `SiteFooter` is integrated into a real storefront page. The isolated design-system route may use the prototype values because its purpose is component review.

The current-page boolean remains consumer-controlled. Avoid reading `Astro.url` inside the component so the footer has no hidden router dependency and can map cleanly to WordPress navigation data.

## Phase 4: Define the Component API

Create `frontend/src/components/SiteFooter.astro` with a strict prop contract based on `SiteFooterContent`:

```ts
interface Props extends SiteFooterContent {
	navigationLabel?: string;
	socialLabel?: string;
}
```

Defaults:

```ts
navigationLabel = 'Footer'
socialLabel = 'Social'
```

Expected usage:

```astro
<SiteFooter {...siteFooterContent} />
```

Behavior:

- Accept all visible copy and destinations through props.
- Keep the logo source and SVG geometry internal because they are fixed design assets.
- Add `aria-current="page"` only when a navigation item has `current: true`.
- Render the primary or social `<nav>` only when its corresponding array is non-empty; do not emit an empty navigation landmark.
- Do not mutate, sort, or infer the incoming arrays.
- Do not assume social links open a new context.
- Do not add runtime validation, hydration, event listeners, or browser-state reads.

## Phase 5: Build the Semantic Markup

Use this hierarchy:

```text
footer.site-footer
└── div.site-footer__inner.site-container
    ├── div.site-footer__top
    │   ├── a.site-footer__brand
    │   │   └── img (Audiophile logo)
    │   └── nav.site-footer__primary-nav[aria-label="Footer"]
    │       └── ul.site-footer__primary-list
    │           └── li
    │               └── a.site-footer__primary-link
    └── div.site-footer__content
        ├── p.site-footer__description
        ├── p.site-footer__copyright
        └── nav.site-footer__social-nav[aria-label="Social"]
            └── ul.site-footer__social-list
                └── li
                    └── a.site-footer__social-link[aria-label]
                        └── SocialIcon
```

Markup requirements:

- Use the native `<footer>` landmark without a redundant `role`.
- Keep the logo as one home link.
- Use unordered lists for both repeated link collections.
- Use links for destinations, never buttons or generic elements with link roles.
- Give each social anchor `aria-label={link.platform}`.
- Hide the SVG itself from the accessibility tree.
- Preserve DOM order as logo, primary navigation, description, copyright, social navigation.
- Do not add a footer heading purely for styling; the two named navigation landmarks provide sufficient orientation.
- Do not add redundant `role="list"` because both lists live inside named `<nav>` landmarks.

Keep all list, paragraph, link, and image resets component-scoped. Avoid introducing global element selectors that could change the existing category component.

## Phase 6: Implement the Mobile-first Composition

The base styles target the 375 × 654px reference.

### 6.1 Footer and inner container

- Set the full-width footer surface to `var(--color-surface-dark)`.
- Set default foreground color to `var(--color-white)`.
- Position the inner `.site-container` relatively.
- Apply 52px padding at the top and 38px at the bottom.
- Do not set a fixed or minimum footer height solely to reach 654px.

### 6.2 Accent rule

Use `.site-footer__inner::before` for the decorative rule:

- Empty generated content.
- Absolute at the footer's top edge.
- 101px inline size and 4px block size.
- `#D87D4A` through `--color-primary`.
- Centered with `inset-inline-start: 50%` and `translateX(-50%)` in the base layout.
- No accessible content or pointer events.

### 6.3 Brand/navigation group

Style `.site-footer__top` as a centered column flex container:

- `align-items: center`.
- 48px gap between the 25px logo and primary navigation group.
- No hard-coded group height.

Style the primary list as a centered column:

- Four natural 25px line boxes.
- 16px row gap.
- Total reference height: `25 × 4 + 16 × 3 = 148px`.
- Uppercase Manrope Bold, 13/25px, 2px letter spacing, matching the supplied
  footer rasters rather than the shared 1px subtitle token.
- `min-inline-size: 0` on list items and links.
- Centered ordinary wrapping with `overflow-wrap: anywhere` as a last-resort safeguard for an unusually long unbroken label.

This yields a top-group reference height of `25 + 48 + 148 = 221px`.

### 6.4 Content group

Start `.site-footer__content` 48px after the primary navigation group.

Use a one-column grid with:

- 48px row gaps.
- Centered items and text.
- Description first, copyright second, social navigation third.

Description:

- Full 327px available width at the reference viewport.
- Manrope Medium, 15/25px.
- `var(--color-text-on-dark-muted)`.
- No authored `<br>` elements.
- Six reference lines and a 150px line-box height.

Copyright:

- Manrope Bold, 15/25px.
- Same muted-on-dark color.
- One 25px line box.

Social group:

- Three 24px visual wrappers.
- 16px visual gap.
- Total visible group width: `24 × 3 + 16 × 2 = 104px`.
- Center Twitter's 20px artwork vertically.
- Give each social anchor a real minimum size of 24 × 24px before any coarse-pointer enhancement.

The mobile vertical equation must emerge naturally:

```text
52 top padding
+ 25 logo
+ 48 logo/nav gap
+ 148 navigation
+ 48 top/content gap
+ 150 description
+ 48 content row gap
+ 25 copyright
+ 48 content row gap
+ 24 social row
+ 38 bottom padding
= 654px
```

## Phase 7: Add the Tablet Composition

At `@media (min-width: 48rem)`, align the composition with the 768 × 400px reference and the existing global gutter change.

### Inner container and rule

- Change padding to 60px top and 46px bottom.
- Move the accent rule to the inner container's inline start.
- Remove the centering transform from the rule.

### Brand/navigation group

- Keep `.site-footer__top` as a column.
- Change alignment to `flex-start`.
- Reduce the logo/navigation gap to 32px.
- Change the primary list to a row.
- Use a 32px flex-column gap and a 16px row gap. With the 2px tracking and
  Manrope glyph side bearings, this produces the measured approximately
  34–36px visible gaps between words.
- Enable `flex-wrap: wrap`; the supplied English labels must still resolve to one row at the 689px reference width.
- Keep the navigation and list at `max-inline-size: 100%` so a localized row cannot widen the page.

The top group becomes `25 + 32 + 25 = 82px` tall.

### Content group

- Start content 32px after the navigation row.
- Change the content grid to `minmax(0, 1fr) auto`.
- Set an 80px row gap.
- Span the description across both columns.
- Remove its mobile maximum and use the full 689px content width.
- Left-align the description and copyright.
- Place copyright at the start of row two.
- Place social navigation at the end of row two and center its 24px visual height within the 25px copyright line box.

The description must wrap to three 25px lines at the 768px target.

The tablet vertical equation is:

```text
60 top padding
+ 82 brand/navigation group
+ 32 top/content gap
+ 75 description
+ 80 content row gap
+ 25 closing row
+ 46 bottom padding
= 400px
```

Use `min-inline-size: 0` on the flexible grid column and description so long content can shrink rather than producing horizontal overflow.

## Phase 8: Add the Desktop Composition

At `@media (min-width: 64rem)`, move to the two-sided desktop layout. This threshold leaves enough room for the 143px logo plus the approximately 429px navigation row and for a 540px description column plus the 104px social group.

### Inner container and top group

- Change padding to 75px top and 48px bottom.
- Keep the rule aligned to the inner container's inline start.
- Change `.site-footer__top` to a row.
- Align items centrally and distribute logo and navigation with `justify-content: space-between`.
- Retain the 143 × 25px logo and the unchanged horizontal navigation metrics.
- Keep the primary list wrappable and justify its English row to the inline end; if localization creates a second row, the top group and footer grow rather than collide.

### Content grid

- Start content 36px after the top row.
- Use `grid-template-columns: minmax(0, 33.75rem) minmax(0, 1fr)`; 33.75rem is the measured 540px description measure.
- Set the grid row gap to 56px.
- Place the description in column one, row one.
- Place copyright in column one, row two.
- Place social navigation at the inline end of column two, row one.
- Define `--social-reference-offset: 0.4375rem` on the desktop content grid.
- Align the social group to the end of the 100px description track, then apply that single block-end margin so the visible icons begin at `y = 205px` rather than `y = 212px`.
- Keep text left-aligned.

At the 1440px reference, the existing `.site-container` supplies `x = 165px` through `x = 1275px`. The expected visible social group is `x = 1171px` through `x = 1275px`.

The desktop vertical equation is:

```text
75 top padding
+ 25 top row
+ 36 top/content gap
+ 100 description row
+ 56 content row gap
+ 25 copyright row
+ 48 bottom padding
= 365px
```

Do not use absolute positioning for the logo, navigation, description, copyright, or social group. Only the decorative rule should be absolute.

## Phase 9: Implement Link States and Target Sizing

### Primary and social color states

Use `color` as the single state source for both text and `currentColor` SVG paths:

- Default: `var(--color-white)`.
- `:hover`: `var(--color-primary)`.
- `:active`: `var(--color-primary)`.
- `:focus-visible`: `var(--color-primary)` plus the focus outline.

Do not add opacity, scaling, translation, or font-weight changes on interaction. `Desktop-Active.jpg` changes color without changing geometry.

Apply hover color inside `@media (hover: hover)` so touch-only browsers do not retain a misleading sticky hover state. Keep `:active` and `:focus-visible` outside that query so touch and keyboard feedback remain available.

The brand link is the exception to color-state sharing: its external logo SVG remains white because its source fill is fixed and no orange logo state is documented. It still receives the same visible focus outline.

Keep `[aria-current="page"]` semantic-only in this phase. If the header later adopts a persistent visible current state, update both navigation components together.

### Focus indication

For the brand, primary links, and social links:

- Use the existing 3px focus-ring width and 4px offset.
- Use `--focus-ring-color-dark` so the outline remains white while the focused text/icon becomes orange.
- Do not remove the browser outline without this replacement.
- Ensure no ancestor clips the outline.

### Touch and pointer targets

The mocks require 25px navigation line boxes, 24px icons, and 16px visual gaps. Preserve those visuals while expanding hit regions:

- Give the brand and primary links a real minimum block size of 25px and social links a real minimum size of 24 × 24px. This satisfies the WCAG 2.5.8 AA minimum before enhancement.
- Under `@media (pointer: coarse)`, add `0.5rem` (8px at the reference root size) padding to the actual brand, primary, and social anchors and an equal `-0.5rem` margin on the same axes. The border box and clickable region grow while each margin box continues to occupy the measured 25px or 24px layout slot.
- A social anchor then exposes a 40 × 40px border box. Adjacent icon centers remain 40px apart, so the target edges meet but do not overlap.
- A mobile navigation anchor becomes approximately 41px tall. Consecutive rows are also 41px apart, so their target edges meet without overlap.
- Keep list and footer overflow visible so focus outlines around the expanded border boxes are not clipped.
- Validate with `getBoundingClientRect()` or the browser inspector under coarse-pointer emulation; do not assume negative margins preserved the target geometry.

Avoid generated pseudo-elements for hit testing. Real padded anchor boxes are easier to inspect, focus, audit, and port to WordPress.

### Motion

Do not add a transition in the first implementation. The state is an immediate color change, matching the source and avoiding an unnecessary reduced-motion branch.

## Phase 10: Add the Isolated Review Route

Create `frontend/src/pages/design-system/footer.astro`.

The route should:

- Import `Layout`, `SiteFooter`, and `siteFooterContent`.
- Set the title to `Footer | Audiophile design system`.
- Render a semantic `<main>` containing a visually hidden `<h1>` that contributes no layout height.
- Render `SiteFooter` immediately after the zero-height main so the footer begins at viewport `y = 0` for direct image comparison.
- Mark Headphones as `current: true` in a local review copy to exercise `aria-current` without changing the default data.
- Avoid an outer `.site-container`; the footer owns its internal container.
- Avoid review padding, borders, labels, or page backgrounds that contaminate the component crop.
- Add no review-only component prop, state toggle, or JavaScript.

Use browser hover/focus emulation to inspect Headphones and Facebook interaction colors separately. Do not add a production prop merely to force the composite `Desktop-Active.jpg` state.

## Phase 11: Validate Visual Geometry

Run the Astro background development server from `frontend/`:

```bash
pnpm astro dev --background
```

Open `/design-system/footer/` and capture the component at the exact reference viewports:

| Viewport | Expected footer height | Expected content width | Reference |
| --- | --- | --- | --- |
| 375px | 654px | 327px | [`Mobile.jpg`](Mobile.jpg) |
| 768px | 400px | 689px | [`Tablet.jpg`](Tablet.jpg) |
| 1440px | 365px | 1110px | [`Desktop.jpg`](Desktop.jpg) |

Before each capture, confirm the root font size is the browser default 16px and wait for `document.fonts.ready`. A screenshot taken during fallback-font rendering is invalid because different glyph metrics can change both line wrapping and footer height.

Check every invariant:

- Surface is exactly `#101010` and reaches both viewport edges.
- Rule is 101 × 4px and flush with the top edge.
- Rule is centered only in mobile and left-aligned to the content container thereafter.
- Logo remains 143 × 25px.
- Navigation type remains 13/25px with unchanged word geometry.
- Description wraps to 6, 3, and 4 lines at mobile, tablet, and desktop.
- Supporting and copyright text visually composite to approximately `#888888`.
- Copyright remains one line.
- Social icons remain 24/20/24px high with 16px visual gaps.
- Twitter is vertically centered.
- Desktop social placement is in the lower description region, not the copyright row.
- Tablet social placement is opposite copyright.
- Mobile social placement follows copyright by 48px.
- No fixed height clips content or focus rings.
- If coarse-pointer padding is active during a mobile reference capture, its compensating margins must keep the visible icon centers, text baselines, and footer height identical to the reference.

For closer comparison, overlay each captured footer crop at 50% opacity against its reference. Resolve layout, typography, and wrapping differences before accepting antialiasing-only deviations.

### Active-state visual check

Compare interaction colors against `Desktop-Active.jpg`:

- Hover or focus Headphones and verify `#D87D4A` with unchanged dimensions.
- Hover or focus Facebook and verify its path uses the same `#D87D4A`.
- Confirm Twitter and Instagram use the identical rule when activated.
- Confirm the white focus outline remains visible in addition to the orange color.

## Phase 12: Validate Responsive Resilience

Inspect widths between and beyond the three reference canvases:

- 320px narrow mobile.
- 374px immediately below the mobile reference.
- 767px immediately below the tablet switch.
- 768px at the tablet switch.
- 1023px immediately below the desktop switch.
- 1024px at the desktop switch.
- 1440px and wider, confirming the inner content remains capped at 1110px.

Verify:

- No horizontal page overflow.
- The horizontal navigation fits at and above the 48rem tablet switch; the mobile stack remains the fallback below it.
- Content does not collide during the 64rem desktop transition.
- A temporary localized/long-label fixture wraps the tablet or desktop navigation onto another row without changing DOM order, clipping focus rings, or producing horizontal overflow.
- Longer descriptions and localized copyright text increase footer height.
- The accent rule stays attached to the correct container edge.
- The component does not use `100vw`, which could create scrollbar-width overflow.
- Coarse-pointer anchor padding produces real 40px-class target rectangles while the negative margins preserve the measured English layout.

## Phase 13: Validate Semantics and Accessibility

Manually inspect the rendered DOM and accessibility tree.

Required checks:

- The page exposes one footer landmark.
- The footer and social navigation landmarks are announced with distinct names.
- Both link collections retain list semantics and correct item counts.
- The logo link is announced as Audiophile.
- Every social link is announced once with its platform name; SVG paths are silent.
- Tab order is logo, four primary links, then three social links.
- CSS layout does not change that focus order at any breakpoint.
- Every link can be activated by keyboard without custom JavaScript.
- `aria-current="page"` is announced on the review Headphones item.
- Focus outlines are visible and not clipped on the dark background.
- Actual padded anchor rectangles meet the documented minimum size and do not overlap adjacent anchors.
- Supporting copy remains at least the documented 50% white contrast.
- The component remains usable at 200% browser zoom and with enlarged text.
- Forced-colors mode preserves link/icon visibility and a visible focus indicator; `currentColor` icons should adapt with their links.

Run a Lighthouse or axe accessibility audit against the isolated route if the browser tooling is available. Treat it as a supplement to—not a replacement for—the keyboard, target-overlap, and accessibility-tree checks above.

Do not add positive `tabindex`, redundant ARIA roles, or accessible names containing the role word “navigation.”

If the author white outline is not preserved in forced-colors mode, add a scoped fallback using a system color such as `Highlight`. Do not use `forced-color-adjust: none` merely to preserve the orange aesthetic; the decorative accent rule may disappear without affecting meaning.

## Phase 14: Validate Portability

Before handoff, confirm the component has no Astro-specific business logic beyond prop rendering:

- Navigation and social collections come entirely from typed data.
- Current-page state is supplied, not inferred from `Astro.url`.
- The output is ordinary footer/nav/list/link/paragraph markup.
- Social SVG geometry can become a small WordPress icon partial without browser JavaScript.
- CSS uses custom properties, flexbox, grid, logical properties, and ordinary media queries that can move into a theme stylesheet.
- Asset URLs are stable under `/assets/shared/desktop/`.
- No runtime dependency or hydration payload is introduced.
- The component remains ready for page-shell integration, but integration must not proceed with unverified platform-root social URLs.

## Phase 15: Validate the Production Build

Run from `frontend/`:

```bash
pnpm build
```

Confirm:

- Astro strict TypeScript compilation succeeds.
- The footer review route is included in static output.
- The copied logo resolves in production output.
- The inline social icons render without external SVG requests.
- No dependency or lockfile change occurred.
- Existing category-banner and index routes still build.
- The generated footer contains no hydration script or client bundle.

Stop the background development server after validation:

```bash
pnpm astro dev stop
```

## Definition of Done

The footer implementation is complete when:

- `SiteFooter.astro` accepts strict external content data and emits static semantic HTML.
- `SocialIcon.astro` reproduces all three supplied icons with `currentColor` and no duplicated accessible names.
- Shared tokens are extended without duplicating the existing font, container, or reset foundations.
- The component matches the 375 × 654, 768 × 400, and 1440 × 365 references at their exact viewport widths.
- The rule, logo, typography, text wrapping, icon sizes, gaps, and responsive alignments match the measured specification.
- Hover, active, focus-visible, and semantic current-page states are implemented as planned.
- Keyboard, pointer, touch, zoom, enlarged-text, and forced-colors checks pass.
- Real anchor boxes meet at least the 24 × 24px WCAG AA minimum, expand on coarse pointers, and do not overlap.
- The component introduces no horizontal overflow or fixed-height clipping.
- Localized navigation can wrap and grow without changing the DOM or focus order.
- The isolated review route supports clean visual capture without review chrome.
- No client-side JavaScript or new dependency is introduced.
- `pnpm build` passes without breaking existing routes.
- The component can be inserted into the future site shell or a WordPress footer partial without changing its markup or content model.

## Adopted Decisions Summary

- Shared foundations: reuse the existing Manrope, `.site-container`, and focus dimensions.
- Responsive thresholds: 48rem tablet and 64rem desktop media queries.
- Layout model: flexbox for brand/navigation; grid for description/copyright/social placement.
- Asset strategy: unchanged public logo plus inline `currentColor` social paths.
- Content year: authored `2021`, not runtime-generated.
- Current-page treatment: semantic-only until a header/footer convention is established.
- Focus treatment: 3px white outline with 4px offset on the dark surface.
- Visible icon spacing: intrinsic sizes and 16px gaps; coarse pointers receive real padded 40px-class anchor boxes with compensating margins.
- Social browsing context: same tab; platform-root prototype URLs are blocked from real site-shell integration until approved account URLs are provided.
- Integration scope: isolated design-system route only; no home or layout-shell integration yet.
