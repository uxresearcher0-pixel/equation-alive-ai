# Equation Alive AI

Equation Alive AI is a browser-based MVP for turning equations into interactive graphs, lightweight simulations, explanations, verification checks, and sonified waveforms.

## Run

Install dependencies once, then open `index.html` in a browser or use a local static server.

```sh
npm install
```

The deployed browser build uses CDN-hosted KaTeX and Math.js so GitHub Pages can serve the app without committing `node_modules`.

## Deploy

This repository is configured for GitHub Pages with the custom domain:

```txt
equationalive.shahriarshanto.online
```

The `CNAME` file must stay at the repository root. In the domain DNS dashboard, point the `equationalive` subdomain to GitHub Pages with a `CNAME` record:

```txt
equationalive -> uxresearcher0-pixel.github.io
```

Then enable GitHub Pages from the repository settings using the `main` branch and root folder.

## Test

Run the static app baseline checks:

```sh
node --check app.js
node tests/regression.test.js
```

## Current MVP

- Equation input workspace with math-keyboard shortcuts and examples
- Formula preview for common math notation such as fractions, roots, summations, cases, matrices, powers, and implicit multiplication
- KaTeX-backed math rendering with local fallback rendering
- Accessible text description for rendered math
- Math.js-backed structured parser with fallback token parser
- Rule-based equation classification
- Formula-to-Code Solver module with structured math tree, algorithm, pseudocode, solver output, and programming code
- Formula Intelligence Library with built-in higher-study topics, formulas, algorithms, theorem templates, examples, and verification notes
- Search and filter by topic, category, and difficulty, then load a stored formula directly into the workspace
- Code generation for Python, JavaScript, TypeScript, Java, C++, MATLAB, R, Dart, Swift, and Kotlin
- Solve-target support for examples such as `F = ma` and `s = ut + 1/2at²`
- 2D canvas graph rendering
- Finite series support using natural notation like `y = 6 Σ(k=1 to 12) [sin((2k + 1)x)/(2k + 1)]`
- Circle and kinematics templates
- Parameter sliders for amplitude, frequency, phase, terms, radius, initial velocity, and acceleration
- Component view for series terms and velocity overlays
- Animation overlay
- Web Audio API sonification
- Numerical verification with `epsilon = 1e-6`
- PNG, SVG, JSON, and printable report exports
- Recent projects saved in local storage
- High contrast and reduced motion toggles

## Next Build Steps

1. Replace the lightweight parser with a real symbolic parser such as Math.js or a FastAPI/SymPy backend.
2. Add Plotly/D3 views for zooming, panning, and trace inspection.
3. Add persistent users/projects through Supabase or MongoDB.
4. Add image-to-equation OCR, AI tutor explanations, and Manim export.
5. Expand the Formula Intelligence Library from the MVP seed set to 100+ fully worked templates.
