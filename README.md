# 🎨 Wallpaper Dials

An interactive, generative wallpaper engine and Swiss-style typographic grid canvas built with **Svelte 5** and **DialKit**.

![Wallpaper Dials Preview](https://raw.githubusercontent.com/imhalid/hii/main/static/favicon.svg)

---

## ✨ Features

- **🏷️ Swiss Typographic Grid Badge (`textBadge`)**:
  - Snaps flush to integer grid line intersections (e.g. `6x2` or `2x3` grid cell bounds).
  - Sharp 90° corners with zero border-radius for an authentic editorial design aesthetic.
  - Custom typography selection with Google Fonts (**Georgia**, **Space Grotesk**, **Inter**, **JetBrains Mono**).
  - **Reactive Color Sync**: Automatically matches the main wallpaper background color (`bgColor`), with option for custom color overrides.

- **📐 Smart SVG Interior Masking & Grid Geometry**:
  - Symmetric 4-arm plus (`+`) cross markers centered at every grid line intersection.
  - Smart SVG masking keeps grid lines and cross markers on the outer borders of the badge **100% visible and unclipped**, while masking out interior lines inside the badge text area.

- **⭕ 100% Perfect Circle Arc Geometry**:
  - Vector circles with guaranteed non-distorted aspect ratios across all monitor resolutions.
  - Controlled probability distribution (~25% hybrid solid/dashed arc segments, ~40% pure solid, ~35% pure dashed).

- **💥 4 Corner Vector Burst Rays**:
  - Independent corner burst controllers (`burstBottomLeft`, `burstBottomRight`, `burstTopLeft`, `burstTopRight`).
  - Seed-driven non-uniform random gap distribution ($w_i$) and style type selections (`mix`, `dashed`, `solid`).

- **🎬 Cinematic Vignette & SVG Film Grain Noise**:
  - Custom radial vignette overlay with coverage, softness, opacity, and CSS mix-blend-mode controls.
  - Topmost SVG turbulence & fractal noise overlay for organic film grain texture.

- **🎛️ Live DialKit Controller**:
  - Foldered, collapsed-by-default parameters for tweaking all visual properties in real time.
  - Persistence enabled with a **🔄 Reset to Defaults** action button.

---

## 🚀 Quick Start

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

```bash
# Clone the repository
git clone git@github.com:imhalid/hii.git
cd hii

# Install dependencies
pnpm install
```

### Development

Start the local development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view and interact with the wallpaper canvas and DialKit panel.

---

## 🛠️ Built With

- **[Svelte 5](https://svelte.dev)** — Runes (`$state`, `$derived`, `$effect`) & reactive rendering
- **[DialKit](https://dialkit.dev)** — Real-time interactive UI controls & parameter persistence
- **[TailwindCSS v4](https://tailwindcss.com)** — Utility styling
- **[Vite](https://vitejs.dev)** — Next-generation frontend build tooling

---

## 📄 License

MIT © [imhalid](https://github.com/imhalid)
