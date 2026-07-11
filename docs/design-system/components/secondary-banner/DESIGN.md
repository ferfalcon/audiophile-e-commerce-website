# DESIGN.md — Secondary Product Banner

## Component purpose

The **Secondary Product Banner** is a reusable promotional banner for highlighting one product or product family inside a landing page, category page, or home page section.

It is visually quieter than a primary hero or primary feature banner. Its purpose is to give a product visual presence, show a short product title, and provide a clear route to a related product or campaign destination.

The current example uses `ZX7 SPEAKER`, but the component must be treated as **general purpose** and **editor-managed** in the final project.

Editable content should include:

- Product title / heading.
- CTA label.
- CTA destination URL.
- Background/product image.
- Responsive image variants or crop/focal-point settings.
- Optional accessible CTA label when the visible CTA label is generic.

The component is best suited to images with a clear product subject on the right and enough quiet negative space on the left to preserve text readability.

---

## Visual anatomy

The banner has a simple three-layer composition:

1. **Outer rounded container**
   - Fixed visual height across the inspected breakpoints: `320px`.
   - Rounded corners: `8px`.
   - Clips image/background content.
   - Uses a light neutral fallback surface: `#f1f1f1`.

2. **Background/product image layer**
   - Full-bleed image inside the rounded container.
   - In the Figma example, the image is a grayscale product/lifestyle photo.
   - The product subject is positioned to the right.
   - The crop changes per breakpoint to protect the text area.

3. **Foreground content group**
   - Left-aligned product title.
   - Outlined CTA below the title.
   - Vertically centered as a group.
   - Text and CTA sit directly over the image/fallback surface, with no separate card, overlay, or panel in the inspected design.

There are no icons or decorative vector elements. The visual character comes from image crop, typography, spacing, and the outlined button treatment.

---

## Layout structure

### Overall layout

The component is a fixed-height horizontal promotional banner.

- Height: `320px` at mobile, tablet, and desktop references.
- Width: fluid within the page/container layout.
- Maximum observed desktop width: `1110px`.
- Border radius: `8px`.
- Content remains left-aligned at all breakpoints.
- The image behaves as a background image and is cropped responsively.

Reference composition:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   PRODUCT TITLE                         Product image crop   │
│                                                              │
│   [ CTA LABEL ]                                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Content group

The foreground content group has the same measured size in all inspected variants:

- Width: approximately `204px`.
- Height: approximately `118px`.
- Vertical position: `101px` from top.

Because `(320 - 118) / 2 = 101`, this should be understood as **vertical centering**, not an arbitrary top offset.

Design behavior:

- Treat the content group as vertically centered inside the banner.
- Preserve the title-above-CTA hierarchy.
- Preserve the internal spacing between title and CTA.
- Keep all foreground content left-aligned.

### Horizontal positioning by breakpoint

Measured foreground content offsets:

| Breakpoint | Banner width | Content left offset |
|---|---:|---:|
| Desktop | `1110px` | `95px` |
| Tablet | `689px` | `62px` |
| Mobile | `327px` | `24px` |

Design intent:

- Desktop uses a generous editorial inset.
- Tablet reduces the inset while keeping the composition spacious.
- Mobile uses compact page-padding-like inset.

### Text safe area

The text safe area is the quiet left portion of the image where the title and CTA sit.

Required visual behavior:

- The area behind the title and CTA should remain light, low-detail, and high-contrast.
- The product subject should not overlap or visually compete with the foreground content.
- The visible image crop should preserve a preferred buffer to the right of the content group, especially on desktop and tablet.

**Assumption:** The content safe area should cover at least the content group width plus a small right-side buffer. The exact buffer is not specified in Figma and should be validated during implementation/testing.

---

## Responsive behavior

The component does **not** stack vertically on mobile. It keeps the same banner height and the same left-aligned content pattern.

### Desktop behavior

- Reference size: `1110 × 320`.
- Content left inset: approximately `95px`.
- Product image is large and positioned on the right/center-right.
- Left side has strong negative space for title and CTA.

### Tablet behavior

- Reference size: `689 × 320`.
- Content left inset: approximately `62px`.
- Height remains `320px`.
- Content remains vertically centered.
- Image crop becomes tighter than desktop.
- Product subject remains right-biased and must not interfere with the text area.

### Mobile behavior

- Reference size: `327 × 320`.
- Content left inset: approximately `24px`.
- Height remains `320px`.
- Content remains left-aligned and vertically centered.
- Image is pushed/cropped heavily to the right; only part of the product may remain visible.
- The mobile layout must not center the content or stack image and text vertically.

### Very small viewport behavior

The inspected mobile reference is `327px` wide. Production viewports may be slightly narrower.

Expected design behavior for narrow screens:

- The banner should not create horizontal page scroll.
- The content should remain readable.
- The content inset may need to follow the project’s smallest mobile page padding if the viewport is below the inspected reference width.

**Assumption:** The production layout must support at least common small mobile widths around `320px`.

### Content editing impact on responsiveness

Because this is a general-purpose editable component, responsive behavior depends on both text length and image art direction.

Editorial constraints:

- Product title should be concise, ideally one line.
- Long product names may wrap and increase the content group height.
- If wrapping is allowed, the CTA must not overlap the title and the group must still feel vertically balanced.
- Images should be selected or cropped so the subject does not sit behind the text.
- Editors should be able to provide breakpoint-specific images or equivalent focal/crop settings.

**Assumption:** The banner is intended for concise product names similar in visual length to `ZX7 SPEAKER`, not long marketing headlines.

---

## Typography

### Product title

Observed text:

```text
ZX7 SPEAKER
```

Measured style:

- Font family: `Manrope`.
- Font weight: `700` / Bold.
- Font size: `28px`.
- Letter spacing: `2px`.
- Text transform: uppercase.
- Color: `#000000`.
- Text box: approximately `202px × 38px`.
- Alignment: left.
- No visible wrapping in the Figma example.

Design intent:

- The title should feel bold, premium, compact, and product-focused.
- Uppercase styling matches the broader Audiophile visual language.
- The title is the only heading-level text inside the component.

Editable-content guidance:

- Editors may change the title text.
- The component should preserve the uppercase visual style even when CMS text is entered in lowercase.
- One-line titles are preferred.
- If longer titles are allowed, they should wrap gracefully rather than overlap the CTA or leave the container.

**Assumption:** Title line-height is approximately the natural/normal line-height for Manrope Bold at `28px`, visually close to the `38px` text box height.

### CTA text

Observed text:

```text
SEE PRODUCT
```

Measured style:

- Font family: `Manrope`.
- Font weight: `700` / Bold.
- Font size: `13px`.
- Letter spacing: `1px`.
- Text transform: uppercase.
- Color: `#000000`.
- Alignment: centered inside the button.

Design intent:

- CTA should be compact, direct, and secondary in visual weight.
- The default label may remain `See Product`, but the final component should allow editors to change it.

Editable-content guidance:

- CTA label should be short.
- Recommended labels: `See Product`, `Shop Now`, `Learn More`, or equivalent concise actions.
- Long CTA labels are visually risky because the button is intentionally compact.
- If the visible CTA label is generic, the accessible label should include the product title.

---

## Colors

No Figma variables were detected for this section. The inspected component uses raw color values.

Observed colors:

| Element | Color |
|---|---:|
| Fallback / mask background | `#f1f1f1` |
| Title | `#000000` |
| CTA text | `#000000` |
| CTA border | `#000000` |

Design intent:

- The banner uses a quiet neutral image surface.
- Black text and border provide strong contrast against the pale background.
- There is no overlay gradient, tint, scrim, or shadow in the inspected design.

Content-editing risk:

- Since editors can change the image, contrast may become inconsistent.
- The design currently depends on the selected image having a light, low-detail text area.
- Optional overlays or contrast treatments are not part of the inspected design and should be treated as a product/design decision before implementation.

**Assumption:** Product images used in this component should be art-directed for this layout, with enough empty/light space behind the text.

---

## Spacing

### Internal content spacing

Measured content group:

- Title starts at `y: 0`.
- Title box height: `38px`.
- CTA starts at `y: 70px`.
- CTA size: `160px × 48px`.

Calculated gap:

```text
70px - 38px = 32px
```

The vertical gap between title and CTA is approximately `32px`.

### CTA dimensions

- Width: `160px`.
- Height: `48px`.
- Border: `1px` solid black.
- Border radius: `0px`.
- Text is centered.

### Container spacing

- Desktop left inset: `95px`.
- Tablet left inset: `62px`.
- Mobile left inset: `24px`.
- Vertical centering: content group centered within the `320px` banner.

Design intent:

- The component should feel spacious on large screens and compact but not cramped on mobile.
- The left inset should align with the page’s responsive spacing system where possible.

**Assumption:** The mobile `24px` inset likely corresponds to the page/container padding used elsewhere in the project.

---

## Imagery, icons, and decorative elements

### Imagery

The Figma example uses a grayscale product/lifestyle image of a speaker on a table.

Image behavior by breakpoint:

| Breakpoint | Visible behavior |
|---|---|
| Desktop | Wide crop, product mostly on right, large negative space on left. |
| Tablet | Tighter crop, product more central/right, text area remains clear. |
| Mobile | Heavy right-side crop, partial product visible, text remains on left. |

The image is clipped by the rounded banner container.

Editable-image requirements:

- The final component must support editor-selected images.
- The image must be art-directed to preserve the text safe area.
- Ideally, editors should be able to provide separate image assets for desktop, tablet, and mobile.
- If only one image is supported, editors should be able to choose a focal point or crop position.
- Image should be decorative unless it communicates information not available in text.

### Icons

No icons are present.

### Decorative elements

No additional decorative shapes, illustrations, overlays, gradients, or patterns are present.

The rounded clipping and responsive image crop are the only decorative treatments.

---

## Interaction states

The Figma section only shows the default state. Interaction states are not visually defined in the inspected design.

### CTA default state

- Transparent background.
- Black border.
- Black uppercase text.

### Recommended hover state

The component should use the project’s secondary/outlined button hover behavior. If no existing behavior exists, recommended visual behavior:

- Background changes to black.
- Text changes to white.
- Border remains black.

### Recommended focus-visible state

- Keyboard focus must be clearly visible.
- Focus ring should not rely only on a subtle color change.
- Suggested behavior: visible outline outside the button, with enough offset to separate it from the button border.
- The focus ring must not be clipped by the rounded banner container or internal overflow.

### Recommended active state

- Active/click state should follow the existing button system.
- Active state must not remove the visible focus state after keyboard activation.

### Whole-banner interaction

The inspected Figma design shows only the CTA as an interactive element.

**Assumption:** Only the CTA is clickable, not the whole banner.

Open question: Should the entire banner be clickable as a product link, or only the CTA?

---

## Accessibility considerations

### Semantic structure

The component should be represented as a promotional section or article-like block with one heading and one link.

Recommended semantic intent:

- Heading: editable product title.
- Link: CTA to the product detail page or configured destination.
- Image: decorative background by default.

### Heading level

The heading level should be determined by page context. The visual style remains the same regardless of semantic heading level.

Examples:

- On a home page section, this may be an `h2` or `h3` depending on surrounding content.
- Avoid choosing a heading level based only on visual size.

### Image accessibility

If the product image is decorative:

- Do not expose it to assistive technology.
- The product title already communicates the promoted item.

If the image communicates important content not present in text:

- Provide editable alt text.
- Avoid repeating the same product name already present in the heading.

**Assumption:** In this design, the image is decorative because the product name and CTA provide the meaningful information.

### CTA accessibility

The visible CTA label `See Product` is generic. The accessible name should include the product name when possible.

Recommended accessible name pattern:

```text
[CTA action] [Product title]
```

For the Figma example:

```text
See Product ZX7 Speaker
```

A more natural equivalent is also acceptable:

```text
See ZX7 Speaker product
```

### Contrast

The inspected design has strong contrast because black text sits on a pale image area.

Accessibility risk:

- Editor-selected images may reduce contrast.
- The CMS/editor workflow should require suitable image crops or provide safeguards such as contrast preview, focal point controls, or an approved-image workflow.
- An optional overlay may be useful in production, but it is not shown in the current design and requires design approval.

### Keyboard and pointer access

- CTA must be reachable by keyboard.
- Focus state must be visible.
- Hit area is acceptable at `160px × 48px`.
- Touch target height meets common minimum target guidance.

---

## Edge cases to preserve visually

- Missing or invalid image should not silently create a final published banner that looks empty.
- Long product titles should not overlap the CTA.
- Long CTA labels should not overflow the button.
- Busy or dark image crops should not reduce text readability.
- Mobile crops should not place the product subject behind the text.
- External destination behavior should be consistent with the site’s link policy.

---

## Pre-planning implementation risks

These risks should be resolved or documented before implementation planning:

1. **Responsive image art direction**
   - A single image with simple `cover` behavior may not match the Figma composition at all breakpoints.

2. **Editor-selected image quality**
   - The component’s readability depends on images having a safe light/low-detail text area.

3. **Unconfirmed long-text behavior**
   - The design shows a short one-line title and short CTA only.

4. **Interaction states not designed in Figma**
   - Hover, focus, and active states must come from the project button system or be approved separately.

5. **Focus ring clipping**
   - The rounded, overflow-clipped container may accidentally clip focus indicators if the CTA/focus style is implemented inside the clipped region.

6. **Design-token mapping**
   - No Figma variables were attached, so raw values need to be mapped to project tokens later.

7. **Clickable-area decision**
   - Making the whole banner clickable would change semantics, keyboard behavior, and possibly duplicate the CTA link.

---

## Assumptions and uncertainties

### Assumptions

- The component is reusable and should not be hardcoded to `ZX7 SPEAKER`.
- The image is decorative unless editors explicitly provide meaningful alt text.
- The final CMS/editor will allow changing title, CTA label, CTA URL, and image.
- The component should preserve the same visual layout for all products, with image art direction handled through responsive assets or crop/focal controls.
- The mobile layout intentionally keeps the content left-aligned and does not stack image and text vertically.
- The banner height remains `320px` across the inspected breakpoints.
- The CTA uses the project’s outlined/secondary button style.
- The current image crop is product-specific and should not be treated as universal for all images.

### Uncertainties

- Exact production image assets are not confirmed.
- It is not clear whether the final project will use one responsive image with focal positioning or separate images per breakpoint.
- The exact line-height token is not exposed in the inspected Figma output.
- No design tokens or Figma variables were attached to this section.
- Hover, focus, and active states are not shown in the Figma section.
- It is not clear whether content editors can control text casing or whether the component should enforce uppercase visually.
- It is not clear whether the entire banner should be clickable.

---

## Open questions

1. Should editors upload separate desktop, tablet, and mobile images, or one image with focal-point controls?
2. Should the editor be allowed to change the CTA label, or should it always default to `See Product`?
3. Should the CTA accessible label be auto-generated from the CTA label and product title?
4. Should the whole banner be clickable, or only the CTA?
5. What is the official maximum recommended product title length?
6. Should long titles wrap, shrink, truncate, or be rejected by editorial validation?
7. Should the component support dark or busy images with an optional overlay, or should editors only use approved light-background images?
8. Should the heading level be configurable based on page context?
9. Are the color, spacing, radius, and typography values already available as project design tokens?
10. Should this component support alignment variants, such as content on the right and image subject on the left, or is this always a left-content/right-image banner?
11. How should external CTA URLs behave, if they are allowed?

---

## Design summary

The **Secondary Product Banner** is a reusable, editor-managed promotional banner with a fixed-height rounded image surface, left-aligned product heading, and outlined CTA.

The defining UX and visual qualities are:

- Quiet promotional emphasis.
- Strong product-focused title.
- Clear secondary CTA.
- Generous negative space around the content.
- Responsive image cropping that protects text readability.
- Consistent vertical centering across breakpoints.

The most important design requirement for the final editable component is not just replacing the text and image. It is preserving the composition when editors change content: the selected image must keep a safe text area, the title must remain concise, and the CTA must stay accessible and visually consistent.
