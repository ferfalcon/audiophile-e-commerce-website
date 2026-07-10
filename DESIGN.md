# Audiophile Design System

This document captures the design patterns required to build the responsive home page. It is an implementation reference only; it does not define component code.

## Reference Files

The home page was reviewed at the three supplied target widths:

- [`docs/design-mocks/Mobile - Home.jpg`](docs/design-mocks/Mobile%20-%20Home.jpg) — 375px wide
- [`docs/design-mocks/Tablet - Home.jpg`](docs/design-mocks/Tablet%20-%20Home.jpg) — 768px wide
- [`docs/design-mocks/Desktop - Home.jpg`](docs/design-mocks/Desktop%20-%20Home.jpg) — 1440px wide

The following files provide the system foundations and interaction states:

- [`docs/design-mocks/Design System.jpg`](docs/design-mocks/Design%20System.jpg)
- [`docs/design-mocks/Desktop - Home - Desktop - Active.jpg`](docs/design-mocks/Desktop%20-%20Home%20-%20Desktop%20-%20Active.jpg)

The three home mocks describe one responsive component system. They should not be implemented as separate device-specific pages.

## Design Principles

- Preserve the same content hierarchy at every viewport width.
- Change composition, alignment, image crop, and scale responsively instead of removing content.
- Build the page from reusable site-wide modules and a small number of home-specific promotional variants.
- Keep all text in semantic HTML rather than embedding it in image assets.
- Use responsive image art direction because the supplied assets contain purpose-built crops for each layout.
- Keep modules portable so they can later be moved from the Astro prototype into WordPress theme partials.

## Foundations

### Colors

| Token | Value | Intended role |
| --- | --- | --- |
| Primary accent | `#D87D4A` | Primary actions, accent words, active links, and decorative details |
| Primary hover | `#FBAF85` | Hover state for primary actions |
| Dark surface | `#101010` | Header, footer, and other dark surfaces |
| Black | `#000000` | Strong text, dark actions, and high-contrast elements |
| Light component surface | `#F1F1F1` | Category cards and light promotional panels |
| Page background | `#FAFAFA` | Main page surface |
| White | `#FFFFFF` | Text and controls on dark surfaces |
| Dark-button hover | Approximately `#4C4C4C` | Hover state for black actions |

Secondary text is generally produced with reduced opacity against black or white rather than with additional gray palette entries.

### Typography

The interface uses **Manrope** throughout.

| Style | Weight | Size / line height | Letter spacing | Case |
| --- | --- | --- | --- | --- |
| H1 | Bold | 56px / 58px | 2px | Uppercase |
| H2 | Bold | 40px / 44px | 1.5px | Uppercase |
| H3 | Bold | 32px / 36px | 1.15px | Uppercase |
| H4 | Bold | 28px / 38px | 2px | Uppercase |
| H5 | Bold | 24px / 33px | 1.7px | Uppercase |
| H6 | Bold | 18px / 24px | 1.3px | Uppercase |
| Overline | Regular | 14px / 19px | 10px | Uppercase |
| Subtitle and navigation | Bold | 13px / 25px | 1px | Uppercase |
| Body | Medium | 15px / 25px | Normal | Sentence case |

The home hero and ZX9 feature use a smaller display treatment on mobile, visually around 36px / 40px. This should be documented as a responsive display variant rather than changing the global H1 definition.

### Layout

| Reference viewport | Content behavior |
| --- | --- |
| Mobile, 375px | Approximately 24px side gutters and a 327px content width |
| Tablet, 768px | Approximately 39px side gutters and a 690px content width |
| Desktop, 1440px | Centered content with a 1110px maximum width |

Additional layout characteristics:

- Primary cards and media use an approximately 8px corner radius.
- Buttons are approximately 48px high and retain square corners.
- Spacing follows an apparent 8px rhythm, with common module gaps around 24px, 32px, and 48px.
- The mock widths are visual test targets, not confirmed CSS breakpoint thresholds.
- Breakpoints should be chosen around where the composition requires them and verified against all three references.

## Controls and Interaction States

### Buttons

The system contains three main action patterns:

1. **Primary button** — orange background with white text; changes to light orange on hover.
2. **Dark or outlined button** — used in dark-fill and outlined contexts; its hover treatment increases contrast by changing the fill and text colors.
3. **Tertiary link** — uppercase text followed by a right arrow; text changes to orange on hover.

Button labels use the subtitle typography style. The primary and secondary button treatments should share dimensions, spacing, and focus behavior even when their colors differ.

### Links and icons

- Header and footer navigation links change to the primary accent color on hover.
- Category “Shop” links use the tertiary action pattern.
- Social icons change to the primary accent color on hover.
- Cart, hamburger, and social icon controls require accessible names.
- Visible keyboard focus, pressed, current-page, and disabled states are not fully shown in the mocks and must be defined during implementation.
- Hover must not be the only way an interactive state is communicated.

## Component Inventory

### Shared primitives

- Container
- Logo
- Heading and eyebrow text
- Navigation list
- Button and tertiary action link
- Icon button
- Responsive picture
- Media panel

### SiteHeader

The header sits on the same dark surface as the hero and includes a subtle bottom divider.

- **Desktop:** logo on the left, horizontal navigation, and cart action on the right.
- **Tablet and mobile:** hamburger action, logo, and cart action.
- The compact header depends on the menu pattern documented in the separate mobile and tablet menu mocks.
- The current page and keyboard focus state should be exposed semantically as well as visually.

### Hero

Content consists of an overline, display heading, supporting copy, and primary CTA.

- **Desktop:** left-aligned content inside the main container with the product image occupying the right side.
- **Tablet:** centered content over a centered product image.
- **Mobile:** the tablet composition is retained with smaller display type and tighter horizontal space.
- The desktop and compact compositions use different source images and crops.

### CategoryNavigation

This is a repeated set of three `CategoryCard` items for headphones, speakers, and earphones.

- Each transparent product cutout overlaps the top of a light-gray card surface.
- Each card contains a category heading and tertiary “Shop” action.
- Desktop and tablet display all three cards in a row.
- Mobile stacks the cards vertically.
- The category collection is a shared site-navigation module and should not be home-page-specific.

### ZX9Feature

This is the primary home-page promotional feature.

- Orange background with rounded corners and clipped overflow.
- Decorative `pattern-circles.svg` behind the product.
- Breakpoint-specific transparent product artwork.
- Heading, supporting copy, and dark CTA.
- Desktop uses a horizontal split with an oversized, bottom-cropped product image.
- Tablet and mobile stack the product above centered copy.

### ZX7Banner

- Full-width responsive background image.
- Left-positioned heading and outlined CTA.
- The content placement remains stable while the image crop changes by breakpoint.
- The module remains approximately 320px high in the supplied artwork.

### YX1Feature

- Composed from an image panel and a light-gray content panel.
- Desktop and tablet use two equal side-by-side columns.
- Mobile stacks the image above the content panel.
- The content panel contains a heading and outlined CTA.

### BrandStory

- Heading with the word “best” in the primary accent color.
- Supporting body copy and a responsive lifestyle image.
- Desktop places text on the left and a portrait image on the right.
- Tablet and mobile place the image above centered text.
- The copy is shared content and should be reusable on other storefront pages.

### SiteFooter

The footer uses the dark surface and a short orange rule along its top edge.

It contains:

- Logo
- Repeated primary navigation
- Company description
- Copyright text
- Social links

Responsive behavior:

- **Desktop:** two-sided grid, with brand content on the left and navigation/social content aligned to the right.
- **Tablet:** multi-row layout with left-aligned brand content, horizontal navigation, and separated copyright/social areas.
- **Mobile:** centered vertical stack with vertical navigation.

## Responsive Composition Matrix

| Section | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Header | Full navigation | Hamburger navigation | Hamburger navigation |
| Hero | Left copy and right product | Centered overlay | Centered overlay with smaller type |
| Categories | Three columns | Three columns | One column |
| ZX9 feature | Horizontal split | Vertical and centered | Vertical and centered |
| ZX7 banner | Full-width banner | Full-width banner | Full-width banner |
| YX1 feature | Two columns | Two columns | Stacked panels |
| Brand story | Text and image columns | Image above text | Image above text |
| Footer | Two-sided grid | Multi-row layout | Centered vertical stack |

## Image Art Direction

The provided assets establish intentional image changes between breakpoints. Implement these with `<picture>` and appropriate `source` elements rather than a single image with arbitrary cropping.

| Module | Desktop asset behavior | Tablet asset behavior | Mobile asset behavior |
| --- | --- | --- | --- |
| Hero | 1440 × 729 landscape scene | 1536 × 1458 source displayed as a centered compact composition | 750 × 1200 source displayed at approximately 375 × 600 |
| ZX9 | Large 756 × 918 transparent product art | 366 × 444 transparent product art | 320 × 388 transparent product art |
| ZX7 | 1110 × 320 landscape crop | 689 × 320 landscape crop | 654 × 640 compact crop |
| YX1 | 540 × 320 landscape crop | 678 × 640 source for a half-width panel | 654 × 400 wide mobile crop |
| Brand story | 540 × 588 portrait crop | 1378 × 600 landscape crop | 654 × 600 compact crop |

Category images are transparent product cutouts and can be reused across viewport sizes. All meaningful images need useful alternative text; purely decorative layers such as the ZX9 circle pattern should be hidden from assistive technology.

## Content Model

The home page can be driven by the following structured content:

- Primary navigation items
- Three category cards
- Hero product promotion
- ZX9 feature promotion
- ZX7 banner promotion
- YX1 split promotion
- Shared brand-story content
- Footer navigation and social links

Each promotion should keep content separate from presentation. Suggested fields include label, heading, description, destination, action label, responsive image sources, image alternative text, and visual variant.

## Page Composition

The home page follows this content order:

1. Site header
2. Hero
3. Category navigation
4. ZX9 feature
5. ZX7 banner
6. YX1 feature
7. Brand story
8. Site footer

This order remains consistent across breakpoints even when the internal layout of a section changes.

## Accessibility Requirements

- Use semantic landmarks for the header, navigation, main content, sections, and footer.
- Preserve a logical heading hierarchy independent of visual font size.
- Ensure every interactive control is keyboard accessible.
- Provide visible focus styles that work on light, orange, and dark surfaces.
- Expose the current navigation destination with `aria-current` where appropriate.
- Keep body copy contrast readable when opacity is used.
- Give meaningful product and brand imagery appropriate alternative text.
- Hide decorative imagery from assistive technology.
- Ensure responsive visual reordering does not produce a confusing reading or focus order.
- Respect minimum touch-target sizes for compact-header actions and category links.

## Implementation Boundaries

The home-page design analysis does not yet define:

- Exact CSS breakpoint thresholds
- Final measured vertical spacing for every section
- Complete focus, pressed, and disabled state specifications
- Mobile menu animation and behavior
- Cart modal behavior
- WordPress content-field mapping

Those details should be resolved during the relevant module implementation and checked against the additional menu, cart, and page mocks. Form controls in the design-system sheet are outside the home-page scope.

## Visual Acceptance Checklist

- Validate at 375px, 768px, and 1440px widths.
- Confirm the centered container and expected side gutters.
- Confirm the correct responsive asset is selected for every art-directed image.
- Check that product artwork scale and crop match the reference.
- Check heading wraps, line lengths, and text alignment at each target width.
- Check card radii, overflow clipping, and the ZX9 decorative-circle placement.
- Verify all default, hover, active, and keyboard-focus states.
- Confirm header, category navigation, brand story, and footer remain reusable outside the home page.
- Run the Astro production build after implementation changes.
