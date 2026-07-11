# Footer Design Specification

The footer is the site-wide closing landmark for Audiophile. It repeats the primary product navigation, briefly describes the company, exposes social destinations, and carries the copyright notice. Its visual identity is a full-width dark surface capped by a short orange rule.

This specification extends the foundations in the repository-level [`DESIGN.md`](../../../../DESIGN.md). It describes one responsive component, not separate desktop, tablet, and mobile implementations.

## Reference Images

| Reference | Canvas | Purpose |
| --- | --- | --- |
| [`Desktop.jpg`](Desktop.jpg) | 1440 × 365px | Default desktop composition |
| [`Desktop-Active.jpg`](Desktop-Active.jpg) | 1440 × 365px | Representative active link and social-icon colors |
| [`Tablet.jpg`](Tablet.jpg) | 768 × 400px | Left-aligned compact composition |
| [`Mobile.jpg`](Mobile.jpg) | 375 × 654px | Centered single-column composition |

The canvas dimensions are exact dimensions of the supplied footer crops. They are validation targets, not CSS breakpoint definitions.

`Desktop-Active.jpg` retains the complete default footer and changes only the **Headphones** navigation item and **Facebook** icon to orange. Because those two controls cannot both be hovered by one pointer at the same time, the image should be read as a state reference containing representative examples, not as a required simultaneous application state.

## Role

- End every storefront page with a consistent site landmark.
- Repeat the four primary navigation destinations without introducing a second content hierarchy.
- Communicate the Audiophile brand statement and copyright notice.
- Provide access to Facebook, Twitter, and Instagram.
- Preserve the same content and asset sizes at every breakpoint while changing composition responsively.

## Anatomy

The component contains:

1. A decorative orange rule at the top edge.
2. The Audiophile logo linked to the home page.
3. A footer navigation list with Home, Headphones, Speakers, and Earphones.
4. One company-description paragraph.
5. A copyright notice.
6. A social-navigation list with Facebook, Twitter, and Instagram links.

There are no headings, form controls, background images, dividers, shadows, or rounded corners in the supplied component.

## Content

### Primary navigation

The visible order is fixed across all layouts:

1. Home
2. Headphones
3. Speakers
4. Earphones

### Company description

> Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.

Preserve the source wording and punctuation unless editorial content is intentionally updated. Do not insert hard line breaks into the paragraph; its line wrapping is produced by the responsive text measure.

### Copyright

The supplied text is:

> Copyright 2021. All Rights Reserved

Treat this as authored content. Do not silently replace `2021` with the current year during implementation; a dynamic year is a separate product decision.

### Social destinations

The displayed order is Facebook, Twitter, then Instagram at every breakpoint. URLs must come from component data or site configuration because the mock does not define destinations.

## Asset Inventory

| Asset | Intrinsic size | Use |
| --- | --- | --- |
| [`logo.svg`](../../../design-code/assets/shared/desktop/logo.svg) | 143 × 25px | Brand/home link |
| [`icon-facebook.svg`](../../../design-code/assets/shared/desktop/icon-facebook.svg) | 24 × 24px | Facebook link |
| [`icon-twitter.svg`](../../../design-code/assets/shared/desktop/icon-twitter.svg) | 24 × 20px | Twitter link |
| [`icon-instagram.svg`](../../../design-code/assets/shared/desktop/icon-instagram.svg) | 24 × 24px | Instagram link |

The raster references use these assets at their intrinsic dimensions in all three layouts. The Twitter artwork is vertically centered within the same 24px-high visual row as the square icons. Do not rasterize, scale, or substitute the supplied vector geometry.

The social source SVGs contain hard-coded white fills. To support the orange interaction state cleanly, render their paths through an icon component that uses `currentColor`, or inline equivalent SVG geometry with `fill="currentColor"`. Do not approximate the orange state with a CSS filter.

## Visual Tokens

| Property | Token or value |
| --- | --- |
| Footer surface | `#101010` |
| Primary text, logo, and default icons | `#FFFFFF` |
| Supporting and copyright text | White at 50% opacity; composited appearance is approximately `#888888` |
| Accent rule | `#D87D4A` |
| Interactive active/hover color | `#D87D4A` |
| Corner radius | None |
| Shadow | None |

The references consistently use `#101010`, not pure black, for the footer surface. Against that surface, white is approximately 19.03:1, composited `#888888` supporting text is approximately 5.37:1, and `#D87D4A` is approximately 6.30:1. The 50%-white supporting text therefore passes normal-text contrast and must not be made dimmer.

## Typography

All text uses Manrope. Typography does not change size between the supplied breakpoints.

### Navigation

- Manrope Bold, 700.
- 13px font size.
- 25px line height.
- 2px letter spacing. Pixel comparison shows the footer navigation uses wider
  tracking than the shared 1px subtitle token.
- Uppercase.
- White by default.

### Company description

- Manrope Medium, 500.
- 15px font size.
- 25px line height.
- Normal letter spacing.
- Sentence case.
- White at 50% opacity.

### Copyright

- Manrope Bold, 700.
- 15px font size.
- 25px line height.
- Normal letter spacing.
- Sentence case.
- White at 50% opacity.

The logo remains vector artwork and must not be recreated as live text.

## Invariant Measurements

Pixel inspection confirms that the following dimensions remain unchanged across desktop, tablet, and mobile:

| Element | Measurement |
| --- | --- |
| Accent rule | 101 × 4px |
| Logo | 143 × 25px |
| Navigation line box | 25px high |
| Horizontal navigation gap | Approximately 34–36px between visible word bounds; produced by a 32px layout gap plus glyph side bearings |
| Body and copyright line box | 25px high |
| Facebook icon | 24 × 24px |
| Twitter icon | 24 × 20px |
| Instagram icon | 24 × 24px |
| Visible social-icon gap | 16px |
| Visible social group | 104 × 24px |

Responsiveness must therefore come from placement, alignment, available text width, and whitespace—not from shrinking type, the logo, icons, or the accent rule.

## Measured Responsive Layout

| Property | Desktop reference | Tablet reference | Mobile reference |
| --- | --- | --- | --- |
| Canvas / footer height | 1440 × 365px | 768 × 400px | 375 × 654px |
| Content width | 1110px | Approximately 689px | 327px |
| Side gutters | 165px | Approximately 39.5px | 24px |
| Accent alignment | Content left | Content left | Viewport center |
| Logo alignment | Left | Left | Center |
| Navigation composition | Horizontal, right-aligned beside logo | Horizontal, left-aligned below logo | Four centered rows |
| Description measure | 540px | Full content width | Full 327px content width |
| Description lines | 4 | 3 | 6 |
| Copyright alignment | Left | Left | Center |
| Social alignment | Right, beside lower description area | Right, opposite copyright | Center, below copyright |

### Desktop geometry

- Center a 1110px maximum-width container between `x = 165px` and `x = 1275px` at the 1440px target.
- Place the rule at `x = 165px`, `y = 0`, with a size of 101 × 4px.
- Place the 143 × 25px logo at `x = 165px`, `y = 75px`.
- Align the navigation to the container's right edge on the same 25px row as the logo. Its visible word bounds run approximately from `x = 846px` through `x = 1273px`.
- Start the description's 100px-tall line box at `x = 165px`, `y = 136px`. The 36px separation is measured from the end of the logo row to the start of the description line box.
- Keep the description at 540px wide so it wraps to four lines.
- Place the visible social group at `x = 1171px`, `y = 205px`. It occupies the lower portion of the right column rather than sharing the bottom copyright row.
- Start the copyright line box at `x = 165px`, `y = 292px`, 56px after the description line box ends.
- Leave 48px beneath the 25px copyright line box.

The left-column vertical equation is `75 + 25 + 36 + 100 + 56 + 25 + 48 = 365px`.

### Tablet geometry

- Use the approximately 689px centered content width, with edges near `x = 39.5px` and `x = 728.5px` at the 768px target.
- Place the rule at the content's left edge and `y = 0`.
- Place the logo at `x = 39px`, `y = 60px`.
- Start the horizontal navigation line box at `x = 39px`, `y = 117px`, 32px after the logo row.
- Start the full-width description line box at `x = 39px`, `y = 174px`, 32px after the navigation row. It is 75px tall and wraps to three lines.
- Start the bottom line box at `y = 329px`, following an 80px gap after the description. Copyright stays on the left.
- Center the 24px-tall social group vertically in that 25px bottom row and align it to the right; its visible bounds are `x = 624px` through `x = 728px` and `y = 330px` through `y = 354px`.
- Leave 46px beneath the bottom line box.

The vertical equation is `60 + 25 + 32 + 25 + 32 + 75 + 80 + 25 + 46 = 400px`.

### Mobile geometry

- Use a 327px content column with 24px side gutters.
- Center the 101px rule at `x = 137px`, `y = 0`.
- Center the logo at `x = 116px`, `y = 52px`.
- Begin the navigation line boxes at `y = 125px`, 48px after the logo. Each link uses a 25px line box with 16px between rows, producing a 148px navigation group.
- Begin the six-line description at `y = 321px`, 48px after the navigation group. Center its text within the full content width.
- Begin the copyright line box at `y = 519px`, 48px after the description.
- Place the visible social group at `x = 136px`, `y = 592px`, 48px after the copyright line box.
- Leave 38px beneath the 24px social row.

The vertical equation is `52 + 25 + 48 + 148 + 48 + 150 + 48 + 25 + 48 + 24 + 38 = 654px`.

## Reference Text Wrapping

The following wraps are visual checks, not authored `<br>` elements.

### Desktop, 540px measure

```text
Audiophile is an all in one stop to fulfill your audio needs. We're a small team
of music lovers and sound specialists who are devoted to helping you get the
most out of personal audio. Come and visit our demo facility - we’re open 7
days a week.
```

### Tablet, approximately 689px measure

```text
Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and
sound specialists who are devoted to helping you get the most out of personal audio. Come and
visit our demo facility - we’re open 7 days a week.
```

### Mobile, 327px measure

```text
Audiophile is an all in one stop to fulfill your
audio needs. We're a small team of music
lovers and sound specialists who are devoted
to helping you get the most out of personal
audio. Come and visit our demo facility - we’re
open 7 days a week.
```

If these wraps differ materially at the reference widths, verify that Manrope is loaded, that the correct weight is applied, and that the measured content width is not being reduced by unintended padding.

## Responsive Rules

- Mobile is the default centered, single-column composition.
- At the shared tablet breakpoint, switch to left alignment, keep navigation on one horizontal row, expand the description to the content width, and place copyright and social links at opposite ends of the bottom row.
- At the shared desktop breakpoint, move navigation beside the logo, constrain the description to 540px, and move the social group into the right side of the description region.
- Keep the inner container fluid between reference widths and cap it at 1110px.
- Derive breakpoint thresholds from shared layout tokens and the point where each composition fits; do not treat the supplied image filenames as user-agent categories.
- Do not hide, truncate, or reorder navigation destinations at narrow widths.
- Allow text growth to increase footer height. The measured heights are exact English-reference targets, not fixed-height clipping constraints.
- Preserve natural DOM and keyboard order even when CSS Grid changes visual placement.

## Interaction Contract

- The logo is one link to the home page.
- Every primary-navigation label is one semantic link.
- Every social icon is one semantic link with the platform name as its accessible name.
- Default navigation text and social icons are white.
- Hover, active, and keyboard-focus color changes use `#D87D4A`. `Desktop-Active.jpg` demonstrates this on Headphones and Facebook.
- Color changes must not move, resize, or otherwise shift the control.
- Keyboard focus must also include a visible non-color indicator, such as a 2–3px outline with adequate offset on the dark surface.
- When a footer destination represents the current page, expose `aria-current="page"`. A persistent orange current-page treatment is appropriate if it is adopted consistently with the site header.
- Any optional color transition should be brief and should not be required to understand state. No animation is necessary.

## Semantic Structure

Recommended structure:

- One `<footer>` landmark.
- One home link containing the logo.
- A `<nav aria-label="Footer">` containing an unordered list of primary links.
- A paragraph for the company description.
- A paragraph for the copyright notice.
- A separate `<nav aria-label="Social">` containing an unordered list of social links.

Use native links for every destination; do not use buttons or generic elements with link roles. The social SVGs are decorative within already-named links and should use `aria-hidden="true"`. If the logo is rendered as an `<img>`, use `alt="Audiophile"`; if it is inline SVG, provide the home link an equivalent accessible name.

The two navigation landmarks need distinct short names. Avoid labels such as “Footer navigation,” which can be announced redundantly as “Footer navigation navigation.”

## Data Contract

| Field | Purpose |
| --- | --- |
| `logoHref` | Home destination for the brand link |
| `navigation[].label` | Visible and accessible primary-link text |
| `navigation[].href` | Primary-link destination |
| `navigation[].current` | Optional current-page state |
| `description` | Localizable company statement |
| `copyright` | Localizable authored copyright string |
| `socialLinks[].platform` | Visible-to-assistive-technology platform name |
| `socialLinks[].href` | Social destination |
| `socialLinks[].icon` | Supplied vector icon identifier |

Keep content and URLs outside component markup so the same component can accept Astro data now and WordPress navigation or theme data later.

## Accessibility Requirements

- Preserve the footer and navigation landmarks so assistive-technology users can jump directly to them.
- Preserve list semantics for both link collections and keep their DOM order consistent with the visible order.
- Do not rely on the orange color change alone for keyboard focus or current-page state.
- Ensure focus outlines are not clipped by the footer container or icon wrappers.
- Keep supporting text at 50% white or stronger; reducing its opacity would risk failing normal-text contrast.
- The mocks show 24px icons and 25px navigation line boxes. Do not make an interactive target smaller than 24 × 24px. Prefer unobtrusive padding that increases touch targets toward 40–44px without overlapping adjacent links or changing the measured icon centers.
- Give icon-only links explicit accessible names such as “Facebook,” “Twitter,” and “Instagram.” Do not rely on filenames, `title`, or SVG path content.
- If a social link opens a new tab, communicate that behavior and use the appropriate `rel` value; opening a new tab is not required by this design.
- Support browser text enlargement and localized copy by using minimum spacing and content-driven height instead of fixed clipping.
- Maintain logical focus order without positive `tabindex` values or CSS reverse-order layouts.

## Implementation Notes

- Use a full-width `<footer>` with the `#101010` background and a centered inner container.
- Use CSS Grid for the desktop and tablet placement and a normal block/flex flow for the mobile stack.
- Implement the orange rule as a decorative pseudo-element on the inner container or as an `aria-hidden` element. It is flush with the footer's top edge.
- Keep the logo and icon `width`/`height` dimensions explicit to prevent layout shifts.
- Use `gap` for navigation and social spacing rather than margins attached to particular list items.
- Keep the paragraph as one text node and control wrapping with `max-inline-size`.
- Use `currentColor` for interactive icon fills so text and icon states share one color rule.
- Do not add JavaScript; the footer is fully server-renderable.
- Do not use fixed `height` in production. Use the documented padding and gaps so longer content can expand safely while the English reference still matches the supplied canvas heights.

## Acceptance Criteria

- The default footer matches `Desktop.jpg` at 1440 × 365px, `Tablet.jpg` at 768 × 400px, and `Mobile.jpg` at 375 × 654px with the documented English content.
- The footer surface is `#101010`, with no gap at the page edge, radius, border, or shadow.
- The accent rule is exactly 101 × 4px and changes from left-aligned to centered only in the mobile composition.
- The logo and all three social assets render at intrinsic size at every breakpoint.
- Navigation is right-aligned on desktop, left-aligned on tablet, and vertically centered on mobile.
- The description wraps to 4, 3, and 6 lines at the respective reference widths without authored line breaks.
- Desktop social links occupy the right side of the description region; tablet social links share the copyright row; mobile social links follow copyright with a 48px gap.
- Navigation labels and social icons change to `#D87D4A` without layout shift for hover, active, and keyboard interaction.
- Every link is keyboard reachable, visibly focused, and correctly named.
- The component has no client-side JavaScript and introduces no horizontal overflow.
- Longer or localized content increases footer height instead of being clipped.

## Open Implementation Decisions

- Exact shared tablet and desktop breakpoint thresholds.
- The site-wide focus-ring treatment on dark surfaces.
- Whether `aria-current="page"` uses the same persistent orange visual treatment as hover/active state.
- Final social-network URLs and whether they open in the same or a new browsing context.
- Whether the copyright year remains authored content or is supplied dynamically by the CMS.

Resolve these decisions during implementation and validate them against the shared header/navigation conventions rather than introducing footer-only behavior.
