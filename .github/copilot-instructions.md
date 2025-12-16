<!-- GitHub Copilot / AI agent onboarding for this repo -->
# Repository Overview

- **Type:** Single-page React app built with Vite (ESM). Entry: `src/main.jsx` → mounts `App` into `#root` from `index.html`.
- **Build / Dev:** see `package.json` scripts (`dev`, `build`, `preview`).

# Quick Start (Windows PowerShell)

```powershell
npm install
npm run dev      # start Vite dev server (default localhost:5173)
npm run build    # create production build
npm run preview  # preview production build locally
```

# Key Architecture & Patterns (what to know)

- Entry & render: `src/main.jsx` imports `src/reset.css` then renders `<App />` into `#root`.
- Component placement: reusable UI lives in `src/components/` (example: `IntroSlider.jsx`).
- Styling: project favors inline JS styles (see `src/App.jsx` and `src/components/IntroSlider.jsx`) with a single `src/reset.css` for base rules. Prefer matching this style when adding small components; for larger sections discuss CSS strategy with the team.
- Animations: three animation systems are used together:
  - `framer-motion` (hero and simple transitions) — used in `src/App.jsx`.
  - `gsap` with `gsap.context` inside `useLayoutEffect` (complex timeline/DOM animations) — see `src/components/IntroSlider.jsx`.
  - `AOS` for scroll-triggered reveal effects (initialized in `src/App.jsx`).
  When editing animation code, keep DOM reads/writes inside effects and prefer `gsap.context` to scope mutations.
- IntersectionObserver pattern: `Reveal` component in `src/App.jsx` uses an `IntersectionObserver` to trigger in-view animations — follow this pattern for lightweight reveal behaviors.
- Data flow: local component state and props only; there is no global store or routing present.
- Assets: many images/videos are loaded directly from external CDNs (see `brandLogos` and hero video sources in `src/App.jsx`). Be mindful of CORS and offline/dev network issues.
- ESM module mode: `package.json` sets `"type": "module"` — write imports using ESM syntax.

# Developer Workflows & Tips

- Rapid dev: run `npm run dev` and open the app in a browser. Use browser DevTools for layout and animation inspection.
- Building & previewing: `npm run build` then `npm run preview` to test the production bundle locally.
- Debugging animations: disable or reduce animation durations, and use `gsap.context().revert()` cleanup in tests; prefer `useLayoutEffect` for measurement and DOM-manipulating animations.
- Adding components: place under `src/components/` and use PascalCase filenames (e.g., `MyWidget.jsx`). Import `reset.css` only in `src/main.jsx` — don't re-import globally in every file.
- Dependency updates: update `package.json` and run `npm install`. This repo uses `vite` and `@vitejs/plugin-react` for JSX/React.

# Integration Points / External Dependencies

- CDN assets (images/videos) referenced directly in `src/App.jsx` — consider local fallbacks during offline development.
- Third-party libs to be aware of: `framer-motion`, `gsap`, `aos` (scroll animations), `react`, `react-dom`, `vite`.

# What not to change lightly

- `src/reset.css` — global baseline used across app.
- Inline style shape and layout conventions — many components rely on consistent inline sizing and box-model behaviors.
- Animation initializers: `AOS.init()` is called once in `App`'s effect; avoid reinitializing unless necessary.

# Files to Inspect for Examples

- `src/App.jsx` — hero, Reveal component (IntersectionObserver), marquee, brand assets.
- `src/components/IntroSlider.jsx` — `gsap` usage, `useLayoutEffect`, forwardRef pattern for animated elements.
- `src/main.jsx`, `index.html`, `package.json`, `vite.config.js` — project wiring and scripts.

# If you need more

If any part of the app's intent or a convention isn't clear, tell me which file or area you want expanded and I will add short, targeted guidance or examples.
