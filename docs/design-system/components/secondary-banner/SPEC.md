# SPEC.md — Secondary Product Banner

## Source

This specification translates the visual definition from `DESIGN.md` into technical product requirements. It does not define the implementation approach or component code.

---

## Component responsibilities

The **Secondary Product Banner** is responsible for presenting a single promoted product or product family in a compact promotional banner.

The component must:

- Display one editor-provided product title.
- Display one editor-provided call-to-action.
- Link the call-to-action to an editor-provided destination.
- Display an editor-managed product/background image.
- Preserve a fixed-height, rounded promotional banner layout across responsive breakpoints.
- Keep foreground content readable over the image.
- Support responsive image art direction through either breakpoint-specific images or focal/crop metadata.
- Provide accessible semantics for the title, CTA, and decorative image behavior.

The component must not be hardcoded to the current example content (`ZX7 SPEAKER`). The example is only the reference instance.

---

## Content requirements

The component is editor-managed. At minimum, an editor must be able to control:

| Content item | Requirement | Notes |
|---|---|---|
| Product title | Editable | Example: `ZX7 SPEAKER`. Should remain concise and product-focused. |
| CTA label | Editable | Example: `SEE PRODUCT`. Should remain short enough for the fixed compact button. |
| CTA destination | Editable | Must point to a valid internal route or approved external destination. |
| Background/product image | Editable | Must preserve the visual composition: readable left-side text area, product subject biased to the right. |
| Responsive image behavior | Editable/configurable | Either separate images per breakpoint or focal/crop settings. |
| CTA accessible label | Optional field, required behavior | Can be editor-provided or auto-generated when the visible label is generic. |

Editorial guidance:

- Product titles should ideally be short enough to fit on one line in the reference content area.
- CTA labels should be concise, action-oriented, and preferably 1–3 words.
- Images should have enough negative space behind the text area.
- Images should not place busy, dark, or high-contrast details behind the title or CTA unless a separate approved contrast treatment is introduced.

---

## Data model / props

The following is a product-level data contract, not implementation code.

| Field | Type | Required | Purpose | Validation / constraints |
|---|---|---:|---|---|
| `title` | Text | Yes | Product or product-family title displayed as the banner heading. | Non-empty. One-line display is preferred. Recommended editorial length: about 24 characters or less, but final limits must be confirmed. Must support uppercase visual styling. |
| `ctaLabel` | Text | Yes | Visible CTA text. | Non-empty. Recommended maximum: about 14–16 characters for the fixed `160px` button. Final limit must be confirmed against the project font/button system. |
| `ctaUrl` | URL / route | Yes | Destination for the CTA. | Must be a valid internal route or approved external URL. |
| `image` | Image asset | Yes | Default product/background image. | Must have sufficient resolution for the largest banner size and preserve a safe text area. |
| `desktopImage` | Image asset | No | Desktop-specific image or crop. | Recommended when the default image cannot preserve the desktop composition. |
| `tabletImage` | Image asset | No | Tablet-specific image or crop. | Recommended when the default image cannot preserve the tablet composition. |
| `mobileImage` | Image asset | No | Mobile-specific image or crop. | Recommended because mobile uses a heavy right-side crop. |
| `imageFocalPoint` | Focal point / crop metadata | No | Controls image subject positioning when only one image is provided. | Should allow the subject to remain right-biased while protecting the text area. |
| `imageAlt` | Text | No | Alternative text only if the image communicates meaningful information not already present in text. | Should be empty/omitted when the image is decorative. Must not duplicate the title unnecessarily. |
| `ctaAccessibleLabel` | Text | No | Accessible name for the CTA when visible label is generic. | If omitted, the component/page should derive a clear label from `ctaLabel` and `title`. |
| `headingLevel` | Heading level / semantic setting | No | Allows the page to set the correct semantic heading level. | Must preserve visual style regardless of semantic level. |

### Required fields

The component requires the following fields for a valid published banner:

- `title`
- `ctaLabel`
- `ctaUrl`
- `image`

Without these fields, the component does not meet its core purpose and should not be considered publish-ready.

### Optional fields

The component may support:

- `desktopImage`
- `tabletImage`
- `mobileImage`
- `imageFocalPoint`
- `imageAlt`
- `ctaAccessibleLabel`
- `headingLevel`

Optional fields are intended to improve art direction, accessibility, and page-level semantic control.

### Required behavior even when fields are optional

Even if responsive images are optional fields, the final banner must still preserve the responsive composition. If a single `image` cannot protect the text safe area at all breakpoints, editors must supply responsive images or focal/crop metadata before publishing.

---

## Layout rules

### Container

The banner container must follow these visual rules:

- Height: `320px` across inspected breakpoints.
- Border radius: `8px`.
- Background fallback color: `#f1f1f1`.
- Content must be clipped to the rounded container.
- The component should fill the available page/content container width.
- Maximum observed desktop width: `1110px`.

### Foreground content group

The content group contains:

1. Product title.
2. CTA button.

Rules:

- Content must remain left-aligned at all breakpoints.
- Content must be vertically centered inside the `320px` banner.
- Content must sit above the background image layer.
- Content must not be horizontally centered.
- The title must appear above the CTA.
- The gap between title and CTA should match the design intent: approximately `32px` for the one-line reference state.
- The CTA target visual size is `160px × 48px`. A project button-system equivalent is acceptable only if it visually matches this size and treatment.

Measured content offsets from Figma:

| Breakpoint | Banner size | Content left inset | Content top position | Content group size |
|---|---:|---:|---:|---:|
| Desktop | `1110 × 320` | `95px` | `101px` | `204 × 118` |
| Tablet | `689 × 320` | `62px` | `101px` | `204 × 118` |
| Mobile | `327 × 320` | `24px` | `101px` | `204 × 118` |

The top value of `101px` represents vertical centering, not an arbitrary fixed offset.

### Text safe area

The component must maintain a readable left-side text safe area.

Rules:

- The area behind the title and CTA must remain visually quiet enough for black text and the outlined CTA to be readable.
- The product subject should remain right-biased.
- The image crop must not place important high-contrast details behind the text.

### Title

The title must visually match the design:

- Font family: Manrope.
- Font weight: `700` / bold.
- Font size: `28px`.
- Letter spacing: `2px`.
- Text transform: uppercase.
- Color: `#000000`.
- Alignment: left.

### CTA

The CTA must visually match the secondary/outlined button style:

- Target width: `160px`.
- Target height: `48px`.
- Border: `1px solid #000000`.
- Background: transparent in the default state.
- Text color: `#000000` in the default state.
- Text style: Manrope, bold, `13px`, `1px` letter spacing, uppercase.
- Border radius: `0px`.

---

## Responsive requirements

The component must support at least three responsive states matching the inspected design.

### Desktop

- Target reference size: `1110 × 320`.
- Content inset: approximately `95px` from the left edge.
- Image subject should appear on the right or center-right.
- Left side must provide enough negative space for the title and CTA.

### Tablet

- Target reference size: `689 × 320`.
- Content inset: approximately `62px` from the left edge.
- Image crop becomes tighter than desktop.
- Product subject remains right-biased and must not overlap the content.

### Mobile

- Target reference size: `327 × 320`.
- Content inset: approximately `24px` from the left edge.
- The component must not stack vertically.
- The component must not move content to the center.
- Image should be heavily cropped or shifted to the right so the left content area remains readable.

### Viewports below the inspected mobile width

The inspected mobile frame is `327px` wide, but the production layout should avoid horizontal scrolling on common small mobile widths.

Requirements:

- The banner must fit inside the available page width.
- The foreground content must remain readable.
- The mobile inset may follow the project’s smallest spacing token if the available width is below the reference width.

**Assumption:** The component must support at least `320px` wide viewports unless the project defines a different minimum supported width.

### Responsive content behavior

- The component must preserve the same visual hierarchy across breakpoints.
- The title and CTA must remain readable at all supported viewport widths.
- The image must be art-directed so it does not obscure the content.
- If title wrapping occurs, the component must avoid overlap between title and CTA.
- The content group may grow vertically for wrapped text only if the final layout still feels balanced inside the fixed-height banner.

**Assumption:** The production component will be placed inside the project’s standard responsive page container, so the banner width will be governed by the parent layout.

---

## Accessibility requirements

### Semantics

The component must expose meaningful content to assistive technologies:

- The product title must be represented as a heading or heading-like element based on the page context.
- The CTA must be represented as a link when it navigates to another page.
- The CTA accessible name must be clear without relying on visual context alone.

### Heading level

- The visual style must not determine the semantic heading level.
- The page or parent context should determine whether the title is an `h2`, `h3`, or equivalent.
- The component should not create heading-level skips in the final page.

### CTA accessible name

If the visible CTA label is generic, such as `SEE PRODUCT`, the accessible name should include the product title.

Recommended accessible label pattern:

```text
[CTA action] [Product title]
```

Example:

```text
See Product ZX7 Speaker
```

A more natural equivalent is also acceptable:

```text
See ZX7 Speaker product
```

### Image accessibility

Default requirement:

- Treat the background/product image as decorative when the title already identifies the promoted product.
- Do not expose decorative background imagery to screen readers.

Optional requirement:

- If an editor marks the image as meaningful, provide alt text.
- Alt text must describe meaningful information not already present in the title.
- Alt text must not simply duplicate the visible title.

### Keyboard accessibility

- The CTA must be keyboard reachable.
- The CTA must have a visible focus state.
- Focus state must not rely only on a subtle color change.
- Keyboard activation must follow expected link behavior.
- Focus indicators must not be clipped by the rounded container or hidden by overflow.

### Contrast

- Text and CTA must maintain accessible contrast against the image area.
- Because images are editor-managed, the content workflow must prevent or flag images that make text unreadable.
- The component must preserve contrast for hover, focus, and active states.
- If a contrast overlay is introduced to solve editor-image issues, it must be approved as a design change because no overlay is present in the inspected Figma design.

---

## Interaction behavior

### Default state

- Background image visible inside rounded container.
- Product title visible in black.
- CTA visible as an outlined black button with transparent background.

### Hover state

The Figma design does not provide a hover state. The component must use the project’s existing secondary/outlined button hover behavior.

If no project behavior is defined, expected behavior is:

- CTA background changes to black.
- CTA text changes to white.
- CTA border remains black.

### Focus-visible state

The component must provide a clear keyboard focus state for the CTA.

Expected behavior:

- Visible outline or focus ring outside the CTA boundary.
- Sufficient offset so the focus state is distinguishable from the `1px` button border.
- Focus style must remain visible against the light image/background.
- Focus style must not be clipped.

### Active state

The active state should follow the project’s button behavior.

Requirements:

- It must not remove the visible keyboard focus indicator.
- It must not make the CTA text unreadable.

### Clickable area

The inspected Figma design indicates only the CTA is interactive.

**Assumption:** Only the CTA should be clickable, not the entire banner.

If the whole banner is later approved as clickable, the specification must be updated to avoid duplicate links, invalid nested interactive elements, and confusing focus behavior.

---

## Edge cases

### Missing required content

- Missing `title`: component should not render as a valid published promotional banner.
- Missing `ctaLabel`: component should not render an empty CTA.
- Missing `ctaUrl`: CTA should not be interactive until a valid destination exists.
- Missing `image`: component may show a neutral placeholder only in an editor/preview state; it should not be considered publish-ready.

### Long title

Risk:

- Long product titles may wrap, collide with the CTA, or exceed the intended content area.

Expected behavior:

- Prefer editorial validation for concise titles.
- If wrapping is allowed, maintain a clear gap between title and CTA.
- Do not allow text to overlap the CTA or leave the rounded container.
- Final behavior for overly long titles must be confirmed: wrap, truncate, resize, or reject.

### Long CTA label

Risk:

- Long CTA labels may overflow the `160px` button.

Expected behavior:

- Prefer short labels.
- Do not allow CTA text to overflow the button boundary.
- Final behavior for overly long CTA labels must be confirmed: reject, wrap, resize button, or use a shorter editorial label.

### Busy or dark image behind text

Risk:

- Editor-selected images may reduce readability.

Expected behavior:

- Editors should provide art-directed images or crops with a safe left-side text area.
- The component should not silently accept unusable image crops without editorial review.
- An optional overlay is not part of the inspected design and requires approval before becoming a requirement.

### Mobile crop failure

Risk:

- A single image may place the product subject behind the text on mobile.

Expected behavior:

- Mobile-specific image or focal/crop configuration should be available when needed.
- The mobile composition must preserve the left-side text area.

### Decorative image with alt text

Risk:

- Duplicate screen reader content if the image alt repeats the title.

Expected behavior:

- Decorative image should have no exposed alt text.
- Meaningful alt text should only be used when the image adds information not present in the text.

### External URLs

Risk:

- CTA may navigate away from the site unexpectedly.

Expected behavior:

- External URLs must follow the project’s link handling policy.
- The editor should know whether the destination is internal or external.
- If external links open in a new tab, the behavior should be communicated accessibly according to project policy.

### Very narrow screens

Risk:

- Widths below the inspected `327px` mobile frame may compress the content area.

Expected behavior:

- The component should not create horizontal page scroll.
- The content and CTA must remain readable and reachable.
- The final minimum supported viewport width must be confirmed by the project.

---

## Non-goals

This component is not responsible for:

- Rendering multiple products.
- Displaying product price, rating, description, availability, or category metadata.
- Managing product data fetching.
- Selecting products automatically.
- Acting as a full hero banner.
- Replacing the primary product banner component.
- Providing carousel behavior.
- Supporting multiple CTAs.
- Supporting arbitrary rich text inside the banner.
- Providing a full CMS editing interface.
- Automatically solving all image contrast problems without editorial constraints or approved design support.
- Introducing a new overlay/gradient treatment unless it is approved as a design change.

---

## Acceptance criteria

### Content and data

- The component renders an editor-provided product title.
- The component renders an editor-provided CTA label.
- The component links the CTA to an editor-provided URL.
- The component renders an editor-provided image.
- The component is not hardcoded to `ZX7 SPEAKER` or any specific product.
- Required fields are validated or handled so empty required content does not produce a broken published banner.
- Missing image states are allowed only as editor/preview placeholders, not as publish-ready output.

### Layout

- At the desktop reference size, the banner visually matches the `1110 × 320` composition.
- At the tablet reference size, the banner visually matches the `689 × 320` composition.
- At the mobile reference size, the banner visually matches the `327 × 320` composition.
- The banner maintains a `320px` visual height across the inspected responsive range.
- The banner has `8px` rounded corners.
- The foreground content remains left-aligned across all breakpoints.
- The foreground content remains vertically centered within the banner for the reference one-line title state.
- The title appears above the CTA with approximately `32px` vertical separation in the reference state.
- The CTA visually matches the `160px × 48px` outlined secondary button treatment.
- The image is clipped inside the rounded banner container.

### Responsive behavior

- Mobile does not stack the image and content.
- Mobile does not center the content horizontally.
- Mobile keeps content left-aligned with an approximately `24px` inset at the reference width.
- Tablet keeps content left-aligned with an approximately `62px` inset at the reference width.
- Desktop keeps content left-aligned with an approximately `95px` inset at the reference width.
- The product image remains right-biased and does not obscure the foreground content.
- The banner does not create horizontal page scroll at the project’s minimum supported viewport width.

### Accessibility

- The product title is exposed as an appropriate heading according to page context.
- The CTA is a keyboard-reachable link when it navigates.
- The CTA has a visible focus-visible state.
- The focus-visible state is not clipped or hidden.
- The CTA accessible name is clear when the visible label is generic.
- Decorative image content is not redundantly announced by screen readers.
- Text and CTA remain readable against the chosen image in default, hover, focus, and active states.

### Interaction

- CTA default state matches the outlined style from the Figma design.
- CTA hover state follows the project’s secondary button behavior.
- CTA focus-visible state is clearly visible.
- CTA active state preserves readability and keyboard focus visibility.
- Only the CTA is interactive unless the open question about whole-banner clickability is explicitly resolved differently.

### Editor experience

- Editors can change title, CTA label, CTA URL, and image.
- Editors can provide responsive image variants or equivalent crop/focal metadata when needed.
- Editors have guidance or constraints for title length, CTA length, and image suitability.
- The component preserves the intended composition when valid editorial content is supplied.
- Editor-selected images that fail the text safe-area requirement are blocked, flagged, or reviewed before publishing.

---

## Pre-planning implementation risks

These risks should be resolved or documented before implementation planning:

1. **Image art direction may be underspecified**
   - The Figma crop is product-specific. A generic `cover` crop may fail for other products or breakpoints.

2. **Contrast depends on editor content**
   - Without image guidelines, crop controls, preview checks, or an approved overlay option, editors can create unreadable banners.

3. **Long-text behavior is not visually designed**
   - The reference only shows a short one-line title and short CTA label.

4. **Button state source is not confirmed**
   - Hover, focus, and active styles are not present in Figma and must come from the project button system or a design decision.

5. **Focus ring clipping risk**
   - The rounded image container clips overflow, which can accidentally hide focus outlines if not handled carefully.

6. **Clickable-area ambiguity**
   - Making the whole banner clickable would change semantics and may create duplicate link behavior with the CTA.

7. **Token mapping is unresolved**
   - Figma exposes raw values, not variables. Values need to be mapped to project typography, spacing, color, and radius tokens later.

8. **CMS/editor validation is part of the UX**
   - The component’s quality depends on constraints and guidance in the editorial workflow, not only on front-end rendering.

---

## Assumptions

- The component is reusable and general purpose, not ZX7-specific.
- The final project includes an editor or CMS layer capable of supplying text, link, and image data.
- The image is decorative by default because the title identifies the promoted product.
- The inspected image treatment depends on art direction; it should not be treated as universally correct for all products.
- The banner height remains fixed at `320px` across the inspected responsive range.
- The current left-side text composition is intentional on mobile and must not become a stacked layout.
- The CTA uses the project’s existing secondary/outlined button behavior where available.
- The mobile `24px` inset likely aligns with the project’s standard mobile page padding.
- No Figma variables or design tokens were attached to the inspected section; raw visual values must later be mapped to project tokens where possible.
- The production layout should support common small mobile widths around `320px`, unless the project defines another minimum.

---

## Open questions

1. Should editors provide separate desktop, tablet, and mobile images, or should the CMS expose focal-point/crop controls for a single image?
2. What is the official maximum product title length?
3. Should long titles wrap, truncate, resize, or be rejected by editorial validation?
4. What is the official maximum CTA label length?
5. Should the visible CTA label always default to `See Product`, or is it fully editor-managed?
6. Should the CTA accessible label be auto-generated from `ctaLabel` and `title`?
7. Should the whole banner be clickable, or only the CTA?
8. Should the component support an optional contrast overlay for editor-selected images?
9. Should `headingLevel` be configurable by the parent/page, or fixed by the component?
10. Are the observed values for color, radius, typography, and spacing already represented by project design tokens?
11. Should external CTA URLs be allowed, or should CTA destinations be restricted to internal product routes?
12. Should this component support future alignment variants, such as content on the right and product image on the left?
13. What is the project’s minimum supported viewport width?
