# DESIGN.md — Primary Banner

## Component purpose

The **Primary Banner** is a reusable, high-impact promotional product banner for the Audiophile home page or other merchandising surfaces. It is designed to spotlight a featured product with a large brand-colored background, decorative acoustic rings, product imagery, concise marketing copy, and one primary navigation CTA.

The component should support updating the following content without changing the visual structure:

- **Product name / heading** — example: `ZX9 Speaker`.
- **Supporting copy** — example: `Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.`
- **CTA label** — example: `See Product`.
- **Product image** — example: transparent cutout image of the ZX9 speaker.

The component should feel editorial and premium rather than like a generic card: large orange surface, oversized decorative acoustic rings, a hero product cutout, bold uppercase heading, concise supporting copy, and one high-contrast action.

## Reference use case

The inspected Figma node shows the **Primary Banner** populated with the following content:

- Product name: `ZX9 Speaker`
- Supporting copy: `Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.`
- CTA label: `See Product`
- Product image: ZX9 speaker product cutout

These values are visual examples only. They should not be treated as hardcoded component requirements.

## Content model

The component should be designed around a small content contract:

| Content field | Required | Visual role | Notes |
|---|---:|---|---|
| `productName` | Yes | Main heading | Rendered uppercase visually. Should support one or two words/lines. |
| `supportingCopy` | Yes | Short descriptive paragraph | Intended for concise marketing copy, approximately 80–120 characters in the reference. |
| `ctaLabel` | Yes | Button/link label | Rendered uppercase visually. Should remain short enough to fit a `160px × 48px` CTA. |
| `productImage` | Yes | Main product artwork | Transparent cutout image, ideally PNG/WebP. |
| `productImageAlt` | Contextual | Accessible image description | Required if the image conveys unique product information. Can be empty if decorative and redundant. |
| `href` / action destination | Yes for navigation | CTA destination | The CTA is expected to navigate to a product detail page. |

### Content flexibility rules

- The heading should not be tightly coupled to `ZX9 SPEAKER`; it should adapt to the current product name.
- The heading style assumes short product names. Long names may require editorial shortening or a responsive type adjustment.
- The supporting copy is expected to be short. If the copy grows beyond 3 lines, it may break the intended rhythm and should be edited.
- The CTA label is expected to be short. Labels significantly longer than `See Product` may overflow or require a wider CTA variant.
- Product imagery must preserve aspect ratio and transparent background.

## Visual anatomy

1. **Outer banner container**
   - Rounded rectangle with approximately `8px` border radius.
   - Brand orange background: `#D87D4A`.
   - No visible border or shadow.
   - Content is clipped to the rounded container; decorative rings and product image can extend beyond the visible bounds but must be hidden by the container mask.

2. **Decorative acoustic ring artwork**
   - A set of thin, concentric circular outlines placed behind the product image and text.
   - Stroke appears white at low opacity, approximately `15–25%`.
   - Purely decorative; it should not affect layout or accessibility.
   - The ring system changes size and position by breakpoint.
   - Rings are part of the Primary Banner visual identity and should remain consistent across product instances.

3. **Product image**
   - A swappable transparent product cutout.
   - Desktop reference: large, left-aligned, intentionally cropped at the bottom by the banner.
   - Tablet and mobile reference: smaller, centered near the top, fully visible.
   - The image is the main visual anchor and should preserve its transparent background.
   - Different product silhouettes may need image-specific art direction, but the default layout should match the inspected reference.

4. **Text content**
   - Product heading populated from `productName`.
   - Supporting paragraph populated from `supportingCopy`.
   - Text is white; body copy uses reduced opacity.
   - Desktop layout uses left-aligned text; tablet and mobile use centered text.

5. **CTA**
   - Black rectangular button/link, `160px × 48px`.
   - Label populated from `ctaLabel`, visually rendered uppercase.
   - White bold text with letter spacing.
   - The CTA is the only explicit interactive element in the component.

## Layout structure

### Desktop layout

Reference frame: `1110px × 560px`.

- Banner size: `1110px` wide, `560px` high.
- Border radius: `8px`.
- Layout: two-column hero composition.
- Product image:
  - Reference ZX9 image size: approximately `410px × 493px`.
  - Position: about `117px` from left, `96px` from top.
  - It extends beyond the bottom edge by roughly `29px`, then is clipped by the banner.
  - For alternate products, image scale and position should preserve the same visual weight and left-side focal balance.
- Decorative ring art:
  - Approximate art bounds: `944px × 944px`.
  - Position: `-149px` from left, `-36px` from top.
  - Rings sit behind the product and continue behind the text area.
- Text block:
  - Approximate size: `349px × 303px`.
  - Position: `666px` from left, `133px` from top.
  - Text is left-aligned.
- Internal text rhythm:
  - Heading height in reference: about `116px`.
  - Gap from heading to body: about `24px`.
  - Body height in reference: about `75px`.
  - Gap from body to CTA: about `40px`.
  - CTA: `160px × 48px`.

### Tablet layout

Reference frame: `689px × 720px`.

- Banner size: `689px` wide, `720px` high.
- Layout changes to a vertical centered composition.
- Product image:
  - Reference ZX9 image size: approximately `197px × 237px`.
  - Position: about `247px` from left, `52px` from top.
  - Fully visible.
  - Alternate product images should be visually centered and scaled to feel comparable in prominence.
- Decorative ring art:
  - Approximate art bounds: `944px × 944px`.
  - Position: `-127px` from left, `-288px` from top.
  - Rings are oversized and clipped by the banner, creating a large halo behind the top content.
- Text block:
  - Approximate size: `349px × 303px`.
  - Position: `171px` from left, `353px` from top.
  - Text is center-aligned.
- CTA is centered under the body copy.

### Mobile layout

Reference frame: `327px × 600px`.

- Banner size: `327px` wide, `600px` high.
- Layout remains vertical and centered.
- Product image:
  - Reference ZX9 image size: approximately `172px × 207px`.
  - Position: about `77px` from left, `55px` from top.
  - Fully visible.
- Decorative ring art:
  - Approximate art bounds: `558px × 558px`.
  - Position: `-116px` from left, `-121px` from top.
  - Rings are scaled down compared with tablet and desktop.
- Heading:
  - Approximate bounds: `280px × 80px`.
  - Position: about `23px` from left, `294px` from top.
  - Center-aligned.
- Body copy:
  - Approximate bounds: `280px × 75px`.
  - Position: about `23px` from left, `398px` from top.
  - Center-aligned.
- CTA:
  - Size: `160px × 48px`.
  - Position: about `83px` from left, `497px` from top.

## Responsive behavior

Use the Figma frames as visual targets rather than assuming proportional scaling.

- **Desktop:** approximately `1024px+` viewport/content width.
  - Horizontal composition.
  - Large product image on the left.
  - Text block on the right.
  - Heading and body are left-aligned.
- **Tablet:** approximately `768px–1023px`.
  - Stacked centered layout.
  - Product image above text.
  - Banner becomes taller to preserve breathing room.
  - Text block remains around `349px` wide.
- **Mobile:** approximately below `768px`.
  - Stacked centered layout.
  - Banner width follows container width, with the Figma target at `327px`.
  - Heading size decreases from `56px` to `36px`.
  - Text width is reduced to around `280px`.

The component should generally use `width: 100%` inside the page content container, with max widths controlled by the parent layout. Heights appear fixed per breakpoint in the reference: `560px` desktop, `720px` tablet, and `600px` mobile.

### Responsive content behavior

- Heading wrapping should be intentional. The reference heading breaks into two lines: product code/name on line one and product category on line two.
- If a product name does not naturally split well, content should still remain visually balanced and centered/left-aligned according to breakpoint.
- Supporting copy should wrap within the fixed text block width and preserve the vertical rhythm.
- Product image replacement should not force the banner height to grow. Instead, images should be art-directed or constrained per breakpoint.

## Typography

Font family: **Manrope**.

### Heading

- Content source: `productName`.
- Reference content: `ZX9 SPEAKER`.
- Weight: `700` / Bold.
- Transform: uppercase.
- Color: `#FFFFFF`.
- Desktop/tablet:
  - Font size: `56px`.
  - Line height: `58px`.
  - Letter spacing: `2px`.
- Mobile:
  - Font size: `36px`.
  - Line height: `40px`.
  - Letter spacing: approximately `1.29px`.
- Alignment:
  - Desktop: left.
  - Tablet/mobile: center.

### Body copy

- Content source: `supportingCopy`.
- Weight: `500` / Medium.
- Font size: `15px`.
- Line height: `25px`.
- Color: `#FFFFFF` at approximately `75%` opacity.
- Alignment:
  - Desktop: left.
  - Tablet/mobile: center.

### CTA label

- Content source: `ctaLabel`.
- Reference content: `See Product`.
- Weight: `700` / Bold.
- Font size: `13px`.
- Letter spacing: `1px`.
- Transform: uppercase.
- Color: `#FFFFFF`.
- Reference visual text: `SEE PRODUCT`.

## Colors

- Brand orange background: `#D87D4A`.
- CTA background: `#000000`.
- Heading and CTA text: `#FFFFFF`.
- Body text: `#FFFFFF` with `0.75` opacity.
- Decorative ring strokes: assumed `#FFFFFF` with low opacity, approximately `0.15–0.25`.

Accessibility note: white text on `#D87D4A` is visually consistent with the supplied design, but contrast is limited. Full white on this orange is approximately a `3:1` contrast ratio, which is acceptable only for large text. The `15px` body copy at `75%` opacity likely fails WCAG AA contrast for normal text. If strict accessibility compliance is required, body copy color/opacity or the background treatment should be revisited.

## Spacing

Key spacing values inferred from Figma:

- Banner border radius: `8px`.
- CTA size: `160px × 48px`.
- Desktop:
  - Product left offset: about `117px`.
  - Product top offset: about `96px`.
  - Text block left offset: about `666px`.
  - Text block top offset: about `133px`.
  - Heading-to-body gap: about `24px`.
  - Body-to-CTA gap: about `40px`.
- Tablet:
  - Product top offset: about `52px`.
  - Text block top offset: about `353px`.
  - Text block width: `349px`.
  - CTA centered within the text block.
- Mobile:
  - Product top offset: about `55px`.
  - Product-to-heading gap: about `32px`.
  - Heading-to-body gap: about `24px`.
  - Body-to-CTA gap: about `24px`.
  - Horizontal text inset: about `23px`.

## Imagery, icons, and decorative elements

- Product image should be a transparent PNG/WebP cutout supplied by the component consumer.
- Image should not be distorted; preserve original aspect ratio.
- Desktop image is intentionally oversized and may be clipped at the bottom for dramatic effect.
- Tablet/mobile image is smaller and fully contained in the reference.
- Decorative circles should be rendered behind all foreground content.
- No icons are present.
- No additional shadows or gradients are visible in the reference.
- The Figma layer includes duplicated mask rectangles; these appear to be implementation artifacts, not additional visual layers.

### Product image replacement guidance

Because the component is reusable, product images may vary in silhouette, height, width, and focal point.

- The default image placement should preserve the reference composition.
- The image asset should be prepared with transparent background and clean edges.
- If a product is much wider, shorter, taller, or less symmetrical than the ZX9 example, the image may need breakpoint-specific positioning values or an art-directed image crop.
- Image replacement should not require changing heading, copy, or CTA layout.

## Interaction states

Only the CTA appears interactive.

### Default

- Background: `#000000`.
- Text: `#FFFFFF`.
- Size: `160px × 48px`.
- Cursor should indicate click/tap behavior.

### Hover

Not shown in the supplied Figma node. Recommended assumption, consistent with common Audiophile button behavior:

- Background changes from `#000000` to a lighter dark gray, approximately `#4C4C4C`.
- Text remains `#FFFFFF`.

### Focus-visible

Not shown in the supplied Figma node. Recommended behavior:

- Preserve the default/hover visual state.
- Add a clear focus outline with sufficient contrast, for example a `2px` white or black outline with offset.
- Do not remove the browser focus indicator unless replaced with an accessible custom one.

### Active / pressed

Not shown in the supplied Figma node. Recommended behavior:

- Use the hover dark gray or a slightly darker pressed state.
- Avoid layout shift.

### Disabled

No disabled state is implied. Since this CTA navigates to a product page, a disabled state is probably unnecessary.

## Accessibility considerations

- The CTA should be implemented as a link when it navigates to a product detail page.
- The CTA accessible name should adapt to the current product, for example `See ZX9 Speaker product`, `See XX99 Mark II Headphones product`, etc.
- Product image alt text should adapt to the current image and product.
  - Use descriptive alt text when the image communicates product identity or appearance.
  - Use empty alt text only if the image is intentionally decorative and the same product information is already provided by nearby text.
- Decorative circular rings must be hidden from assistive technologies.
- Keyboard users must be able to reach and activate the CTA.
- Hit area is acceptable at `160px × 48px`.
- Body copy contrast should be reviewed because `15px` semi-transparent white text over orange may not pass WCAG AA.
- The component should not rely on animation or motion. If decorative motion is ever added, respect `prefers-reduced-motion`.
- The heading level should fit the page outline. This component likely uses an `h2` on the home page, unless it is the primary page hero.

## Assumptions and uncertainties

- The component name should be **Primary Banner**. `ZX9 Speaker` is only the inspected content instance.
- The Figma node does not expose formal component properties; editable content requirements are inferred from the product-agnostic use case described by the user.
- Exact responsive breakpoints are not specified in the Figma node; proposed breakpoints are inferred from common desktop/tablet/mobile targets.
- Exact decorative circle stroke opacity is not exposed by the available metadata; `15–25%` white opacity is an approximation from the screenshot.
- Hover, focus, active, and disabled states are not shown in the Figma node; recommendations are based on expected e-commerce behavior and the broader Audiophile visual language.
- Exact product image asset format and final optimized dimensions are not defined here.
- The destination of the CTA is assumed to be a product detail page controlled by the current content instance.
- The dark gray background visible around the frames in the screenshot is the Figma canvas, not part of the component.
- This document defines the visual and UX contract only. Implementation details, component API, file structure, and CSS strategy should be covered in a separate `SPEC.md` or implementation plan.
