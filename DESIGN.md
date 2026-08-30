---
name: Webhook Sender
description: A browser-native webhook workbench that treats every request as a shipment and every response as its receipt.
colors:
  paper: "#f3f0e8"
  paper-raised: "#fffdf7"
  ink: "#15263b"
  ink-muted: "#526172"
  line: "#c7c4ba"
  line-strong: "#778391"
  signal: "#e0522d"
  signal-dark: "#a93418"
  success: "#176b4a"
  success-soft: "#deeee6"
  danger: "#a52f29"
  danger-soft: "#f7e3df"
  focus: "#156f9e"
  receipt-text: "#f8f6ef"
  receipt-muted: "#b9c4cf"
  receipt-code: "#0d1c2d"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.7rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    letterSpacing: "-0.02em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Arial Narrow, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    letterSpacing: "0.09em"
  mono:
    fontFamily: "Cascadia Code, SFMono-Regular, Consolas, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "8px"
  panel: "14px"
  pill: "999px"
spacing:
  label-gap: "8px"
  field-gap: "14px"
  mobile-panel: "21px"
  workbench-gap: "24px"
  panel: "28px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#c94220"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "9px 13px"
    height: "44px"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "46px"
  panel-request:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
  panel-receipt:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.receipt-text}"
    rounded: "{rounded.panel}"
---

# Design System: Webhook Sender

## Overview

**Creative North Star: "The Dispatch Desk"**

Webhook Sender treats a technical request as a physical shipment: the user addresses it, declares its contents, dispatches it, and reads the receipt. The interface feels like a precise operations desk built from warm paper, dark ink, and one unmistakable signal color—not a generic API dashboard.

The system is compact, legible, and quietly tactile. Editorial display type gives the masthead authority; manifest labels make dense controls easy to scan; the dark receipt panel creates a decisive before-and-after split between composing and inspecting. Decoration stays subordinate to the request flow.

**Key Characteristics:**

- Warm paper work surface with a faint ruled-page cue.
- Ink-blue structure and a dark receipt zone.
- Signal orange reserved for dispatch and product marking.
- Compact uppercase manifest labels paired with readable system sans-serif copy.
- A desktop request/receipt workbench that stacks cleanly on narrow screens.

## Colors

The palette behaves like a shipping desk: warm paper under ink-blue structure, with signal orange marking the single consequential action.

### Primary

- **Signal Orange** (`#e0522d`): Dispatch action and the system's clearest moment of intent.
- **Deep Signal Orange** (`#a93418`): Product mark, button edge, and grounded contrast for the primary action.

### Neutral

- **Manifest Paper** (`#f3f0e8`): Page background and the broadest visual field.
- **Raised Stock** (`#fffdf7`): Request-panel surface and runtime badge.
- **Receipt Ink** (`#15263b`): Primary text, strong rules, and the entire receipt panel.
- **Muted Ink** (`#526172`): Supporting copy and field labels on paper surfaces.
- **Ledger Line** (`#c7c4ba`): Quiet separators between related form regions.
- **Strong Ledger Line** (`#778391`): Input and badge boundaries that must remain obvious.
- **Receipt White** (`#f8f6ef`): High-priority text on the dark receipt panel.
- **Receipt Mist** (`#b9c4cf`): Supporting receipt copy.
- **Code Well** (`#0d1c2d`): Recessed response-body surface.

### Tertiary

- **Delivered Green** (`#176b4a`) with **Delivered Wash** (`#deeee6`): Positive runtime and response states.
- **Failure Red** (`#a52f29`) with **Failure Wash** (`#f7e3df`): Validation, remove actions, and failed delivery states.
- **Focus Blue** (`#156f9e`): Keyboard focus only; it is functional, not decorative.

### Named Rules

**The One Signal Rule.** Signal orange belongs to dispatch and the small product mark; it does not become a general decoration color.

**The Receipt Reversal Rule.** Request construction lives on light paper; response inspection lives in dark ink so the task transition is visible before any text is read.

## Typography

**Display Font:** Georgia (with Times New Roman and serif fallbacks)  
**Body Font:** UI system sans-serif (with Segoe UI and sans-serif fallbacks)  
**Label Font:** Arial Narrow (with sans-serif fallback)  
**Mono Font:** Cascadia Code (with SFMono-Regular, Consolas, and monospace fallbacks)

**Character:** Editorial authority meets operational clarity. The serif display makes the small utility memorable, while compressed uppercase labels and monospace response data make the interface feel like a working manifest rather than marketing.

### Hierarchy

- **Display** (700, `clamp(2.5rem, 5vw, 4.7rem)`, 0.96): Product title only, tightly set with negative tracking.
- **Headline** (700, `1.35rem`): Request and receipt section headings.
- **Body** (400, `1rem`, 1.6): Introduction and general explanatory copy, held to compact readable measures.
- **Label** (800, `0.75rem`, `0.09em`, uppercase): Fields, legends, status stamps, metadata, and manifest codes.
- **Mono** (400, `0.82rem`, 1.6): Response bodies and technical values.

### Named Rules

**The Four Voices Rule.** Serif names the product, system sans explains, narrow uppercase labels organize, and monospace reports machine output. Do not blur those jobs.

## Layout

The shell is capped at `1180px`, leaves `40px` of total viewport breathing room, and uses a `1.18fr / 0.82fr` workbench so request construction receives slightly more space than receipt inspection. A `24px` gutter separates the two panels; both begin directly beneath the ruled masthead.

At `860px` and below, the workbench becomes one column while preserving request-before-receipt reading order. At `600px` and below, the shell inset reduces to `12px` per side, panel padding becomes `21px`, destination and payload grids become single columns, and the dispatch action expands to full width. The interface must remain usable at the established `320px` minimum.

**The Request-Then-Receipt Rule.** Spatial hierarchy must preserve the three-step story: configure, dispatch, inspect. Responsive changes may stack the stations but never reorder them.

## Elevation & Depth

The system is lifted, but restrained. Both principal panels use one diffuse ambient shadow (`0 18px 44px rgba(21, 38, 59, 0.1)`) to feel placed on the paper surface; the primary button uses a smaller signal-colored lift (`0 7px 18px rgba(169, 52, 24, 0.24)`). Inside the receipt panel, depth comes from tonal layering and fine translucent rules rather than additional shadows.

### Shadow Vocabulary

- **Workbench Lift** (`0 18px 44px rgba(21, 38, 59, 0.1)`): Request and receipt panels only.
- **Dispatch Lift** (`0 7px 18px rgba(169, 52, 24, 0.24)`): Primary send action only.

**The Two-Lift Rule.** Shadows identify the workbench and the dispatch action; all secondary controls remain flat.

## Shapes

Panels use gently rounded `14px` corners, while controls, errors, code wells, and row actions use a tighter `8px` radius. Runtime and response-state badges are full pills (`999px`), and the runtime indicator is circular. Fine borders do most of the structural work; the form never becomes a collection of floating rounded cards.

**The Nested Radius Rule.** Broad stations receive the larger panel radius; anything held inside them uses the smaller control radius or a semantic pill.

## Components

### Buttons

- **Shape:** Compact, firm controls with `8px` corners and a `44px` minimum height.
- **Primary:** Signal orange with white text, a dark orange border, `11px 18px` padding, and a minimum width of `164px`.
- **Hover / Focus:** Hover deepens to `#c94220`; keyboard focus uses a `3px` translucent Focus Blue outline with `2px` offset. Loading reveals an inline spinner; disabled state reduces opacity to `0.7`.
- **Secondary:** Transparent paper control with ink text and a strong ledger border; hover fills with a quiet warm-paper tint.
- **Remove:** Text-first danger action that gains Failure Wash on hover; it does not compete with dispatch.

### Chips

- **Style:** Runtime and response-state pills use compact uppercase Label typography and `999px` rounding.
- **State:** Idle/loading remain translucent on ink; success and error switch to their semantic wash and dark text pairings.

### Cards / Containers

- **Corner Style:** Principal stations use `14px` corners.
- **Background:** Raised Stock for request composition; Receipt Ink for response inspection.
- **Shadow Strategy:** Workbench Lift on both panels, with tonal layering inside the receipt panel.
- **Internal Padding:** `28px` on desktop and `21px` on narrow screens.

### Inputs / Fields

- **Style:** White fields with Strong Ledger Line borders, `8px` corners, and a `46px` minimum height.
- **Focus:** A `3px` translucent Focus Blue outline with `2px` offset; borders remain legible beneath it.
- **Error / Disabled:** Invalid fields use Failure Red and a warm near-white fill; disabled payload groups fade to `0.5` opacity and retain a not-allowed cursor where applicable.

### Delivery Receipt

The receipt is the system's signature component: a dark ink panel with stamped status, paired status/duration metadata, a recessed monospace code well, and a persistent browser-boundary note. It must read as the outcome of dispatch, not as a second generic form card.

## Do's and Don'ts

### Do:

- **Do** preserve the visible configure → dispatch → inspect sequence in layout and copy.
- **Do** reserve Signal Orange for the send action and small identity accents.
- **Do** use explicit labels, visible focus outlines, semantic state colors, and live status feedback.
- **Do** keep technical output in the dark receipt zone and monospace voice.
- **Do** stack grids and make dispatch full-width on narrow screens.

### Don't:

- **Don't** turn the interface into a generic API dashboard with navigation rails, metric cards, or unrelated developer-tool chrome.
- **Don't** introduce gradients, glass effects, or decorative shadows beyond the two established lifts.
- **Don't** over-round every region or place each field in its own card.
- **Don't** use Signal Orange for neutral controls, borders, or background decoration.
- **Don't** hide CORS constraints, loading, validation, or failed-delivery feedback.
