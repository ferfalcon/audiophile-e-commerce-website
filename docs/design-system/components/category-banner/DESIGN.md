# Category Banner Design Specification

The category banner is a reusable navigation component that promotes the three primary product categories: headphones, speakers, and earphones. It appears as a horizontal row at tablet and desktop widths and as a vertical stack on mobile.

This specification extends the foundations in the repository-level [`DESIGN.md`](../../../../DESIGN.md). The component is also referred to as `CategoryNavigation` in the page-level design inventory.

## Reference Images

| Reference | Canvas | Purpose |
| --- | --- | --- |
| [`mobile.jpg`](mobile.jpg) | 327 × 683px | Single-column compact composition |
| [`tablet.jpg`](tablet.jpg) | 689 × 217px | Three-column compact composition |
| [`desktop.jpg`](desktop.jpg) | 1110 × 284px | Three-column expanded composition |

These dimensions describe the supplied reference crops. They are visual validation targets, not CSS breakpoint definitions.

## Role

- Provide direct navigation to the three top-level product categories.
- Give each category equal visual priority.
- Reuse the same content, assets, and interaction pattern at every viewport width.
- Act as a shared storefront module rather than home-page-specific promotional content.

## Anatomy

The component contains one category list with three repeated category items.

Each item contains:

1. A transparent product image with its existing soft shadow.
2. A category name.
3. A tertiary “Shop” action.
4. A right-arrow icon.

The product image overlaps the top edge of the light-gray card surface. All item content is centered horizontally.

## Content

| Position | Category name | Action label | Asset |
| --- | --- | --- | --- |
| 1 | Headphones | Shop | `image-category-thumbnail-headphones.png` |
| 2 | Speakers | Shop | `image-category-thumbnail-speakers.png` |
| 3 | Earphones | Shop | `image-category-thumbnail-earphones.png` |

Source assets:

- [`docs/design-code/assets/shared/desktop/image-category-thumbnail-headphones.png`](../../../design-code/assets/shared/desktop/image-category-thumbnail-headphones.png)
- [`docs/design-code/assets/shared/desktop/image-category-thumbnail-speakers.png`](../../../design-code/assets/shared/desktop/image-category-thumbnail-speakers.png)
- [`docs/design-code/assets/shared/desktop/image-category-thumbnail-earphones.png`](../../../design-code/assets/shared/desktop/image-category-thumbnail-earphones.png)
- [`docs/design-code/assets/shared/desktop/icon-arrow-right.svg`](../../../design-code/assets/shared/desktop/icon-arrow-right.svg)

The supplied category thumbnails are transparent PNGs and are shared across breakpoints. They should not be placed inside an additional opaque image wrapper.

## Visual Tokens

| Property | Token or value |
| --- | --- |
| Card surface | `#F1F1F1` |
| Category name | `#000000` |
| Action label | Black at reduced opacity |
| Arrow | `#D87D4A` |
| Action hover and focus color | `#D87D4A` |
| Card radius | Approximately 8px |
| Text alignment | Center |

The image shadows are part of the supplied product artwork. Do not add a generic CSS drop shadow over the complete transparent image canvas.

## Typography

### Category name

- Uses the H6 system style.
- Manrope Bold.
- 18px font size.
- 24px line height.
- 1.3px letter spacing.
- Uppercase.

### Action label

- Uses the subtitle/action system style.
- Manrope Bold.
- 13px font size.
- 25px line height.
- 1px letter spacing.
- Uppercase.

The arrow is visually separated from the action label but remains part of the same accessible action.

## Measured Responsive Layout

| Property | Desktop reference | Tablet reference | Mobile reference |
| --- | --- | --- | --- |
| Component width | 1110px | 689px | 327px |
| Column count | 3 | 3 | 1 |
| Card width | 350px | 223px | 327px |
| Horizontal gap | 30px | 10px | Not applicable |
| Item frame height | 284px | 217px | 217px |
| Gray surface height | 204px | 165px | 165px |
| Gray surface top offset | 80px | 52px | 52px |
| Vertical item gap | Not applicable | Not applicable | 16px |
| Total component height | 284px | 217px | 683px |

The transparent product artwork occupies the space above the card and overlaps into the gray surface. Its horizontal center must align with the center of the category name and action.

### Desktop

- Use three equal 350px columns within the 1110px site container.
- Use 30px gaps between columns.
- Use the expanded 204px gray surface.
- Allow 80px above the surface for the product overlap.
- Product artwork is larger than in the compact treatment.

### Tablet

- Retain all three categories in a single row.
- Use three equal 223px columns with 10px gaps.
- Use the compact 165px gray surface.
- Allow 52px above the surface for the product overlap.
- Reduce product artwork proportionally without changing its crop.

### Mobile

- Stack the three category items in their established content order.
- Use the available 327px container width for every card.
- Reuse the compact 217px item frame and 165px gray surface.
- Place 16px between item frames.
- Do not collapse the stack into a carousel or horizontal scroller.

## Responsive Rules

- Mobile is the default one-column composition.
- Switch to three columns when the compact cards and their minimum gaps fit without clipping or compressing their content.
- Switch from the compact to expanded card treatment at the desktop layout breakpoint.
- Breakpoint thresholds must come from the shared layout-token layer; this component should not introduce unrelated one-off media queries.
- Between reference widths, the component should remain centered and fill its parent container without exceeding 1110px.

## Interaction Contract

- Each category exposes one destination and should use one semantic link rather than nested links.
- The image, category name, and visible action may be included in the same link to provide a generous pointer and touch target.
- Hovering or focusing the item changes the “Shop” label to the primary accent color.
- The arrow remains the primary accent color in the default state.
- Keyboard focus must be clearly visible around the actionable item on the light-gray and page backgrounds.
- The active category should expose `aria-current="page"` when this component appears on a category page.
- Motion, if added, should be subtle, must not shift surrounding layout, and must respect reduced-motion preferences.

## Semantic Structure

Recommended structure:

- A `nav` landmark labeled “Product categories”.
- An unordered list for the category collection.
- One list item and one link per category.
- A heading-level element or appropriately styled text for each category name, selected according to the surrounding page hierarchy.

Because the product image repeats the category name already present in the link, it should normally use empty alternative text. This avoids announcing the same destination twice. The category link text supplies the accessible name.

## Data Contract

Each category item requires:

| Field | Purpose |
| --- | --- |
| `name` | Visible category name and accessible link text |
| `href` | Category destination |
| `image.src` | Transparent product artwork |
| `image.width` | Intrinsic asset width for stable layout |
| `image.height` | Intrinsic asset height for stable layout |
| `image.alt` | Empty by default because the image is redundant |
| `actionLabel` | Localizable action text; defaults to “Shop” |

The order is headphones, speakers, then earphones unless the product taxonomy or editorial requirements explicitly change it.

## Accessibility Requirements

- Maintain a minimum 44 × 44px effective interactive target.
- Do not rely only on color to indicate keyboard focus.
- Preserve logical DOM order when the layout changes.
- Prevent transparent artwork from intercepting pointer events separately from its category link.
- Ensure text remains readable if the browser increases text size.
- Avoid clipping focus outlines when the component or card uses rounded corners or overflow handling.
- Keep the reduced-opacity action label at an accessible contrast level against `#F1F1F1`.

## Implementation Notes

- Use CSS Grid for the category list and component-level positioning for the overlapping product artwork.
- Reserve the full item frame height so the absolute or translated image does not cause layout overlap with adjacent sections.
- Apply rounded corners to the gray surface, not to the transparent product artwork.
- Preserve intrinsic image dimensions to reduce layout shift.
- Use the existing SVG arrow rather than recreating it with a text glyph.
- Keep category data separate from component markup so the same module can be rendered by Astro and later mapped into WordPress content or navigation data.

## Acceptance Criteria

- The component matches `mobile.jpg` at a 327px content width.
- The component matches `tablet.jpg` at a 689px content width.
- The component matches `desktop.jpg` at a 1110px content width.
- All three product images are centered and overlap their card surfaces by the expected amount.
- Column widths, gaps, surface heights, and total component heights match the measured reference values.
- Category names and action labels match the system typography.
- Hover and keyboard-focus states are available for every category destination.
- The component works with keyboard, pointer, and touch input.
- The component introduces no horizontal overflow between the documented reference widths.
- No category text is embedded in an image.

## Open Implementation Decisions

- Exact shared CSS breakpoint thresholds.
- Final rendered product-image dimensions for each category and breakpoint.
- The precise non-color focus-ring treatment used across the wider site.
- Whether the current category receives an additional persistent visual state beyond `aria-current`.

These decisions should be resolved when the component is implemented and visually compared against all three reference images.
