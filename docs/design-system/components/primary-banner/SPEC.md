# SPEC.md — Primary Banner

## Source alignment

This specification is based on:
- `DESIGN.md`, which defines the visual and UX contract for the component.

## Component responsibilities

The **Primary Banner** is responsible for presenting one featured product as a high-priority promotional block.

It must:

- Display a product image as the main visual anchor.
- Display a product heading sourced from editable product content.
- Display concise supporting marketing copy sourced from editable product content.
- Display one primary CTA sourced from editable content and linked to a destination.
- Preserve the orange promotional surface, decorative acoustic rings, rounded container, and premium visual rhythm defined in `DESIGN.md`.
- Adapt layout across desktop, tablet, and mobile according to the inspected Figma references.
- Keep decorative elements separate from meaningful content for accessibility.
- Avoid hardcoding `ZX9 Speaker`, `See Product`, or the ZX9 image as permanent component values.

It must not:

- Fetch product data by itself.
- Decide which product should be featured.
- Render multiple products.
- Become a generic marketing card with arbitrary layout or visual variants.

## Content requirements

The component represents exactly one featured product promotion.

Required content:

| Field | Purpose | Example from reference | Notes |
|---|---|---|---|
| Product name | Main heading | `ZX9 Speaker` | Rendered visually uppercase. Must be editable. |
| Supporting copy | Short promotional paragraph | `Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.` | Must be concise enough to preserve the fixed visual rhythm. |
| CTA label | Visible action text | `See Product` | Must be editable and short. Rendered visually uppercase. |
| CTA destination | Navigation target | Product detail page | Required when the CTA is rendered as a link. |
| Product image | Main product artwork | ZX9 speaker cutout | Must be editable and preserve transparent/cutout presentation. |
| Product image alt text | Accessible image description | `ZX9 Speaker` or more descriptive text | Required as an explicit content decision. Empty alt is allowed only when the image is intentionally decorative and redundant. |

Recommended content constraints:

- Product name: ideally 1–2 short words, or a deliberately edited display name.
- Heading visual lines: 1–2 lines preferred. More than 2 lines is an edge case and may not match the intended design.
- Supporting copy: approximately 80–120 characters, or up to 3 visual lines within the text block.
- CTA label: approximately 8–16 characters preferred; must fit within a `160px × 48px` CTA without wrapping.
- Product image: transparent PNG/WebP or equivalent cutout asset, with enough whitespace/crop control to support the desktop, tablet, and mobile compositions.

## Data model / props

This section defines the expected content contract only. It does not define implementation code.

### Required fields

| Prop / data field | Type | Required | Description | Validation / constraints |
|---|---|---:|---|---|
| `productName` | string | Yes | Product display name used as the banner heading. | Non-empty. Should be editorially short. Visual transform to uppercase is handled by the component. |
| `supportingCopy` | string | Yes | Promotional text below the heading. | Non-empty. Should remain concise; copy longer than 3 visual lines is outside the intended design. |
| `ctaLabel` | string | Yes | Visible CTA text. | Non-empty. Should be short enough to fit one line inside `160px × 48px`. |
| `ctaHref` | string | Yes | Destination for the CTA. | Must resolve to a valid product or marketing destination. |
| `productImage` | image asset | Yes | Main product image source. | Must preserve aspect ratio and be suitable for transparent/cutout rendering. |
| `productImageAlt` | string | Yes | Alt text decision for the product image. | May be descriptive text or an empty string when the image is decorative and redundant. Must not be omitted. |

### Optional fields

| Prop / data field | Type | Required | Description | Notes |
|---|---|---:|---|---|
| `ctaAriaLabel` | string | No | More specific accessible name for the CTA. | Recommended when `ctaLabel` is generic, for example: `See ZX9 Speaker product`. |
| `productImageSources` | responsive image set | No | Breakpoint-specific image assets. | Useful when one asset cannot crop/scale well across desktop, tablet, and mobile. |
| `productImagePosition` | art-direction metadata | No | Optional positioning hints for unusual product silhouettes. | Should be used sparingly; default placement must match the design reference. |
| `headingLevel` | semantic heading level | No | Allows the page context to choose the correct heading level. | The visual style remains the same regardless of semantic level. |
| `className` / layout hook | string | No | Allows the parent layout to position the component. | Must not be required for the default visual layout. |

### Data ownership

The component receives content from the parent page, CMS, static product data, or another product source. It should not own product selection logic. The parent context is responsible for passing complete and validated content.

## Layout rules

### Global rules

- The banner fills the available content width provided by its parent container.
- The desktop reference maximum width is `1110px`.
- The banner has a fixed visual height per breakpoint:
  - Desktop: approximately `560px`.
  - Tablet: approximately `720px`.
  - Mobile: approximately `600px`.
- The outer container uses approximately `8px` border radius.
- All internal artwork must be clipped by the rounded banner container.
- The orange background is part of the component identity and should remain `#D87D4A` unless the design system later defines a token for it.
- Decorative acoustic rings are always behind foreground content.
- The CTA remains `160px × 48px` across breakpoints.
- The component should preserve visual spacing rather than allowing content to push the banner taller.

### Desktop layout rules

Figma reference: `1110px × 560px`.

- Use a two-column hero composition.
- Product image appears on the left.
- Text content appears on the right.
- Text content is left-aligned.
- Reference product image placement:
  - Approximate size: `410px × 493px`.
  - Approximate position: `117px` from the left and `96px` from the top.
  - Image may be clipped at the bottom for dramatic scale.
- Reference text block:
  - Approximate size: `349px × 303px`.
  - Approximate position: `666px` from the left and `133px` from the top.
- Reference text rhythm:
  - Heading to body gap: approximately `24px`.
  - Body to CTA gap: approximately `40px`.
- Decorative ring system:
  - Approximate artwork bounds: `944px × 944px`.
  - Approximate position: `-149px` from the left and `-36px` from the top.

### Tablet layout rules

Figma reference: `689px × 720px`.

- Switch to a vertical centered composition.
- Product image appears near the top and is fully visible.
- Text block appears below the product image.
- Text and CTA are centered.
- Reference product image placement:
  - Approximate size: `197px × 237px`.
  - Approximate position: `247px` from the left and `52px` from the top.
- Reference text block:
  - Approximate size: `349px × 303px`.
  - Approximate position: `171px` from the left and `353px` from the top.
- Decorative ring system:
  - Approximate artwork bounds: `944px × 944px`.
  - Approximate position: `-127px` from the left and `-288px` from the top.

### Mobile layout rules

Figma reference: `327px × 600px`.

- Keep a vertical centered composition.
- Product image appears near the top and is fully visible.
- Text and CTA remain centered.
- Reference product image placement:
  - Approximate size: `172px × 207px`.
  - Approximate position: `77px` from the left and `55px` from the top.
- Heading bounds:
  - Approximate width: `280px`.
  - Approximate position: `23px` from the left and `294px` from the top.
- Body copy bounds:
  - Approximate width: `280px`.
  - Approximate position: `23px` from the left and `398px` from the top.
- CTA placement:
  - Approximate position: `83px` from the left and `497px` from the top.
- Decorative ring system:
  - Approximate artwork bounds: `558px × 558px`.
  - Approximate position: `-116px` from the left and `-121px` from the top.

## Responsive requirements

Use the Figma frames as breakpoint targets rather than scaling one layout proportionally.

| Viewport category | Expected behavior | Visual target |
|---|---|---|
| Desktop | Horizontal two-column layout. Product image left, text right, text left-aligned. | `1110px × 560px` reference frame. |
| Tablet | Vertical centered layout. Product image top, text block below, CTA centered. | `689px × 720px` reference frame. |
| Mobile | Compact vertical centered layout. Reduced heading size and narrower text width. | `327px × 600px` reference frame. |

Required responsive behavior:

- The component must fit inside the page content container without horizontal scrolling.
- The product image must preserve aspect ratio at every breakpoint.
- The product image must not overlap the heading, body copy, or CTA.
- The text block must not be positioned behind the product image.
- The CTA must remain visible without requiring interaction to reveal it.
- Heading typography must reduce on mobile:
  - Desktop/tablet: approximately `56px` font size, `58px` line height, `2px` letter spacing.
  - Mobile: approximately `36px` font size, `40px` line height, `1.29px` letter spacing.
- Body typography remains approximately `15px` font size and `25px` line height across breakpoints.
- Decorative rings must remain clipped by the banner container and must not create page overflow.

## Accessibility requirements

- The CTA must be keyboard reachable.
- The CTA must be activatable with keyboard input.
- The CTA should be implemented semantically as navigation when it links to a product detail page.
- The CTA accessible name must be clear in context.
  - `See Product` is acceptable visually.
  - A more specific accessible name is recommended, such as `See ZX9 Speaker product`.
- The product image must include an explicit alt text decision:
  - Use descriptive alt text when the image communicates product identity or appearance.
  - Use empty alt text only if the product name already communicates the same information and the image is decorative.
- Decorative acoustic rings must be hidden from assistive technologies.
- The heading must participate correctly in the page heading hierarchy.
  - The visual style must not force a specific semantic level.
- Focus-visible styling must be present and clearly visible against the orange background and black CTA.
- The interactive target size is acceptable at `160px × 48px`.
- The component must not rely on hover-only interaction.
- The component must remain understandable without the product image loading.
- Contrast risk must be acknowledged:
  - White heading text over `#D87D4A` is acceptable for large text in the reference.
  - The semi-transparent `15px` body copy likely does not meet WCAG AA for normal text. If strict WCAG AA compliance is required, the body copy color/opacity or background treatment must be revisited.

## Interaction behavior

The CTA is the only interactive element defined by the design.

### Default state

- CTA background: black.
- CTA label: white, bold, uppercase, letter-spaced.
- CTA size: `160px × 48px`.
- CTA navigates to the provided destination.

### Hover state

Assumption: the Figma node does not show a hover state. The recommended behavior follows the Audiophile button language:

- CTA background changes from black to dark gray, approximately `#4C4C4C`.
- CTA text remains white.
- No movement, resizing, or layout shift occurs.

### Focus-visible state

Assumption: the Figma node does not show a focus state.

- A visible focus indicator must appear around the CTA.
- The focus indicator must have sufficient contrast against both the black CTA and orange background.
- The focus indicator must not be removed unless replaced with an accessible custom indicator.

### Active / pressed state

Assumption: the Figma node does not show a pressed state.

- The CTA may retain the hover state or use a subtle pressed dark state.
- No layout shift should occur.

### Disabled state

No disabled state is specified. Since this CTA is a navigation action, the expected product behavior is to provide a valid destination rather than render a disabled CTA.

## Edge cases

### Long product names

- The design expects short product names.
- Product names longer than two visual lines may collide with the body copy or reduce the premium composition.
- The preferred solution is editorial: provide a shorter display name for the banner.
- Assumption: runtime auto-resizing for arbitrarily long headings is not required unless separately specified.

### Long supporting copy

- Copy longer than approximately three visual lines may break the intended spacing.
- The preferred solution is editorial: keep copy concise.
- The component should avoid expanding height automatically because the design relies on fixed breakpoint heights.

### Long CTA labels

- CTA labels should not wrap.
- Labels that do not fit within `160px × 48px` should be edited or handled by a separately approved CTA sizing rule.

### Missing image

- The product image is required content.
- If the image fails to load, the banner must still show heading, copy, and CTA.
- The layout should not collapse in a way that hides text or CTA.

### Unusual product image silhouettes

- Very wide, very tall, or asymmetrical product cutouts may not fit the default reference placement.
- Optional responsive image sources or image positioning metadata may be needed for art direction.
- The default component should still preserve aspect ratio and avoid distortion.

### Missing CTA destination

- A CTA destination is required for this component.
- The component should not render a disabled promotional banner as the default behavior.
- If no destination is available, product/content data should be considered invalid for this banner.

### Reduced motion

- No animation is required.
- If animation is introduced later, it must respect `prefers-reduced-motion`.

### Localization

- Translated CTA labels and copy may be longer than the English reference.
- Localized content must be reviewed against the same line-length constraints.
- The layout is not yet specified for right-to-left languages.

## Non-goals

This specification does not cover:

- Component implementation details.
- File structure or CSS architecture.
- API calls or CMS integration.
- Product selection logic.
- Analytics tracking.
- Animations or parallax effects.
- Alternate color themes.
- Multiple CTAs.
- Carousel behavior.
- Multiple products inside one banner.
- Admin editing UI.
- Image optimization pipeline.
- Exact browser support matrix.

## Acceptance criteria

### Content and reusability

- The component is named and documented as **Primary Banner**.
- `ZX9 Speaker` is treated only as a reference content instance.
- Product name, supporting copy, CTA label, CTA destination, product image, and product image alt text can be changed without changing the component structure.
- No visible text is hardcoded to the ZX9 reference in the reusable component contract.
- The component renders exactly one product promotion and one primary CTA.

### Visual fidelity

- The banner uses the orange background, rounded corners, clipped decorative rings, product image, heading, body copy, and black CTA described in `DESIGN.md`.
- Desktop presentation matches the `1110px × 560px` Figma reference within reasonable implementation tolerance.
- Tablet presentation matches the `689px × 720px` Figma reference within reasonable implementation tolerance.
- Mobile presentation matches the `327px × 600px` Figma reference within reasonable implementation tolerance.
- Product image preserves aspect ratio and is not distorted.
- Decorative rings remain behind foreground content and clipped by the banner.
- CTA remains `160px × 48px` and visually prominent across breakpoints.

### Responsive behavior

- Desktop uses a two-column layout with left product image and right text block.
- Tablet and mobile use a centered vertical layout.
- The banner does not cause horizontal page overflow.
- The CTA remains visible and reachable on all inspected viewport sizes.
- Heading typography reduces on mobile according to the design reference.

### Accessibility

- The CTA is reachable and operable by keyboard.
- The CTA has a visible focus state.
- The CTA accessible name is clear, especially when the visible label is generic.
- Product image alt text is explicitly provided or intentionally empty.
- Decorative rings are ignored by assistive technologies.
- The heading level can fit the surrounding page outline.
- Known body-copy contrast risk is documented and either accepted as a design decision or resolved before claiming WCAG AA compliance.

### Interaction

- CTA default, hover, focus-visible, and active states are defined.
- Hover and active states do not cause layout shift.
- The component does not require hover to reveal critical information.

### Content constraints

- Product heading remains visually stable for 1–2 line product names.
- Supporting copy remains visually stable for concise copy up to approximately three lines.
- CTA label remains one line.
- Invalid or incomplete content is handled by the parent/content layer before rendering.

## Assumptions

- The component will live inside an existing page/container that controls the maximum content width.
- The project uses the Audiophile visual language, including Manrope typography and the orange `#D87D4A` brand color.
- The CTA navigates to a product detail page or equivalent product destination.
- The provided product image is a transparent cutout or can be displayed as one.
- Exact breakpoints are not specified in Figma; desktop/tablet/mobile requirements are inferred from the three inspected frames.
- Hover, focus, and active states are not specified in Figma and are therefore inferred from expected e-commerce behavior.
- Advanced image art direction is optional and only needed for product silhouettes that do not fit the default composition.

## Open questions

1. Should `productImageAlt` always be descriptive, or should product images be treated as decorative when the heading already names the product?
2. Should the component support a manually controlled heading line break for product names, or rely on natural text wrapping?
3. What are the exact project breakpoints for switching between desktop, tablet, and mobile layouts?
4. Should the body copy opacity be adjusted to meet WCAG AA, or should the current Figma contrast be preserved as an approved visual decision?
5. Should alternate product images be supplied per breakpoint, or should one image asset be scaled and positioned across all layouts?
6. Should CTA analytics/tracking metadata be part of the content contract, or handled outside this component?
7. Are localized or right-to-left versions in scope for the first implementation?
