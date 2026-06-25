## PageSpeed Improvement Plan

Current mobile scores from your report: **Performance 70, Accessibility 94, Best Practices 100, SEO 100, Agents Browsing 1/2**. Goal: push Performance to 90+ and clean up the remaining a11y/BP nits — without touching the visual design.

### What the report is actually flagging

| Metric | Value | Target |
|---|---|---|
| First Contentful Paint | 3.3s | < 1.8s |
| Largest Contentful Paint | 4.4s | < 2.5s |
| Total Blocking Time | 130ms | < 200ms ✓ |
| Cumulative Layout Shift | 0 | ✓ |
| Speed Index | 8.0s | < 3.4s |

TBT and CLS are fine. The pain is **paint timing** — the hero (with particles, typewriter, framer-motion, preloader) blocks first paint for too long.

### Fixes, in priority order

**1. Kill the paint-blocking preloader for the LCP**
The 3D preloader holds the page hidden until its animation finishes, which is the main reason LCP is 4.4s. Options:
- Shorten preloader to ~600ms max, OR
- Skip it on repeat visits (sessionStorage flag), OR
- Render Hero text underneath so LCP element paints behind the preloader.

**2. Code-split heavy below-the-fold sections**
Lazy-load with `React.lazy` + `Suspense`: `Projects`, `OpenSource`, `ExperienceTimeline`, `Contact`, `Footer`, and `RepoDetail` page. Keeps the initial JS bundle small (addresses "Reduce unused JavaScript — 27 KB" and "Reduce unused CSS — 13 KB").

**3. Defer / trim animation libraries on first paint**
- Lazy-load `ParticleBackground` (dynamic import after hero mounts).
- Lazy-load `CustomCursor` and `BackToTop` after idle (`requestIdleCallback`).
- Import framer-motion features only where used (`LazyMotion` + `domAnimation`) instead of the full bundle.

**4. Composite animations properly**
Report flags "non-composited animations". Audit any `animate` on `width/height/top/left/margin` and switch to `transform` + `opacity` only. Add `will-change: transform` on the parallax hero layers.

**5. Preconnect & font loading**
- `<link rel="preconnect" href="https://api.github.com">` (used by RepoCard).
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` if Google Fonts in use.
- Add `font-display: swap` to any `@font-face`.

**6. Image hygiene**
- Add `loading="lazy"` and explicit `width`/`height` to every `<img>` below the fold.
- Convert any PNG/JPG hero/project mockups to WebP via `vite-imagetools`.
- Mark the single LCP image (if any) with `fetchpriority="high"` and preload it.

**7. Accessibility nit (score 94 → 100)**
"Buttons do not have an accessible name." Audit icon-only buttons (social links in Hero/Footer, BackToTop, theme toggle, magnetic buttons wrapping icons) and add `aria-label`.

**8. Best Practices nit**
"Uses third-party cookies" — comes from any embedded widget (formsubmit? analytics?). Low priority; only fixable by removing the third-party. Safe to leave.

**9. Agents Browsing (1/2)**
"Access to page is not well-formed" — add a proper `llms.txt` at `public/llms.txt` describing the site and listing key sections.

### Expected impact

| Change | LCP gain | Score gain |
|---|---|---|
| Preloader fix | -1.5 to -2.0s | +10–15 |
| Code-splitting | -0.5 to -1.0s | +5–8 |
| Particle/cursor defer | -0.3s | +3 |
| Composited animations | — | +2 |
| Image/font hygiene | -0.2s | +2 |

Realistic target: **Performance 90–95, Accessibility 100, BP 100, SEO 100, Agents 2/2**.

### Technical notes

- All work is in `src/pages/Index.tsx`, `src/components/portfolio/*`, `index.html`, `vite.config.ts`, `public/llms.txt`.
- No design changes, no copy changes, no new dependencies except optionally `vite-imagetools`.
- Verification: run `bun run build`, check chunk sizes, then re-run PageSpeed Insights on the published URL.

Want me to start with **#1 + #2 + #7** (biggest wins, lowest risk) and ship the rest in a follow-up?
