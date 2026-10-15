# Jenomics brand guide (2026 web)

Source: jenomics.de Elementor kit (measured 2026-10-15) plus the 2026 extensions used in this site.

## Colours

| Token | Hex | Use |
|---|---|---|
| `--jx-blue` | #0E78B1 | Primary: headline "Make IT possible!", buttons, links, service tags, careers band |
| `--jx-blue-k` | #0C82C0 | Kickers (small uppercase section labels) |
| `--jx-blue-d` | #0A5F8E | Hover/pressed (derived) |
| `--jx-green` | #56C657 | Secondary: product tags, trust signals ("hostet grün"), check icons |
| `--jx-navy` | #1E3D7E | Accent: shadows (rgba), deep text accents |
| `--jx-orange` | #F37123 | Only the "Fernzugriff" (TeamViewer) control |
| `--jx-ink` | #0C0C0C | Text |
| `--jx-grey` | #585858 | Body text, captions |
| `--jx-surface` | #EBEFF2 | Light surfaces (also #F1F1F1) |
| `--jx-line` | #E6E6E6 | Borders |
| `--jx-night` | #0B1A36 | 2026: the one dark section and the footer |

Blob gradients (from the baked hero blobs): green #2EE59D → #20D3C2 → #1AB8E8, blue #1A8FE0 → #3FC6F2,
royal #2A3BC8 → #1A6FE0 → #29A8EF.

## Type
Poppins only. Headlines 600 (tight letter-spacing -0.02 to -0.045em), body 400 / line-height 1.6, UI 500.
Hero 104px desktop, section H2 ~44px, panel H3 ~26px in blue (the "sub-headline next to a photo" from the old site).

## Signature elements
- **Live blobs**: the organic gradient blobs from the old hero PNGs, now morphing, drifting and reacting to the pointer
  (`<Blobs>`). Behind photos: crisp shapes. In dark/blue sections: soft blurred glows.
- **Framed photos**: real photos in a thin translucent white frame (8-10px, radius 24px) with a large soft shadow.
- **Tags**: small rectangles radius 6px, blue = service, green = product.
- **Buttons**: radius 10px (brand), 52px tall, Poppins 500, arrow icon; hover lifts 2px with a light sweep.
- **Kicker**: uppercase 13px, letter-spacing .12em, with a short blue-to-green line in front.
- **Rhythm**: light hero → white/grey sections → one dark night section (services & products) → testimonials →
  projects → blog → full blue careers band → dark footer with a giant "Make IT possible!" wordmark.

## Motion ("serious sibling of SDX")
Calm easing `cubic-bezier(.2,.7,.2,1)`, no bounce. 220ms (UI), 520ms (state), 900ms (reveals).
One thing moves at a time per element. Everything respects `prefers-reduced-motion`.

## Voice
Website: informal "du", exclamation marks, "Kund:innen" (kept from the original). EN: plain "you".
Years: write `{years}` / `{founded}` so the copy never ages.
