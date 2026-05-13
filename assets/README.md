# Kinlore — Logo Assets

The chosen mark is the **Branching Y** from the Kin Lineage direction: three
nodes (one ancestor above, two descendants below) joined by two lines. One
ink color on transparent — no gradients, no shadows, survives every required
size from 16×16 to 256×256.

## Files

### Primary mark (vector)
- `kinlore-mark-ink.svg` — for cream / light backgrounds
- `kinlore-mark-cream.svg` — for ink / dark backgrounds

Primary stroke (4.8 of 100) and node radius (7.5). Use anywhere you have
≥48px of room.

### Icon variant (vector)
- `kinlore-icon-ink.svg`
- `kinlore-icon-cream.svg`

Thicker strokes (11) and larger nodes (12). Use under ~48px and as the
source for raster icon builds.

### Wordmark
"Kinlore" set in **Inter 600**, letter-spacing **−0.035em**.

- `kinlore-wordmark-ink.svg`
- `kinlore-wordmark-cream.svg`

SVGs use `<text>` — outline to paths in your vector tool for production so
there's no font dependency.

### Lockups
- `kinlore-lockup-horizontal-{ink,cream}.svg` — for app top-bars and headers
- `kinlore-lockup-stacked-{ink,cream}.svg` — for splash screens and About dialogs

### Windows application icon
- `kinlore.ico` — multi-resolution .ico with PNG-embedded entries at
  16, 20, 24, 32, 40, 48, 64, and 256 px. Point your `.csproj`,
  `.wxs` (WiX), or installer manifest at this. Windows Vista and later.
- `icon/kinlore-{size}.png` — individual rasters at every size, for
  installer banners, store listings, taskbar overrides, etc.

## Palette

| name        | hex      | role                       |
|-------------|----------|----------------------------|
| cream       | `#f4ead5` | primary background         |
| ink         | `#1a1611` | text & mark                |
| sepia       | `#c8924e` | accent (sparingly)         |
| paper dark  | `#ebe0c5` | secondary surface          |

## Mark geometry

Three nodes on a 100×100 canvas, **Branching Y**:

| node          | x  | y  |
|---------------|----|----|
| top           | 50 | 22 |
| bottom-left   | 22 | 72 |
| bottom-right  | 78 | 72 |

Edges: top → bottom-left, top → bottom-right.

| variant   | stroke width | node radius | stroke caps |
|-----------|--------------|-------------|-------------|
| primary   | 4.8          | 7.5         | round       |
| icon      | 11           | 12          | round       |

## Building the .ico from scratch (if you ever need to)

```sh
# ImageMagick
magick icon/kinlore-{16,20,24,32,40,48,64,256}.png kinlore.ico
```

This produces an equivalent file to the bundled `kinlore.ico`.
