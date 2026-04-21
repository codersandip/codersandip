

## Add Open Source / GitHub Repos Section

Add a new "Open Source" section showcasing 7 GitHub repos by `codersandip`, plus an individual detail page per repo.

### Section on Home (between Projects and Contact)

A new `OpenSource.tsx` component renders a responsive grid of repo cards. Each card shows:

- Repo name (with GitHub icon)
- Short description (from GitHub API, with curated fallback for repos missing one)
- Primary language badge + topic chips
- Stars / forks / last-updated
- Two actions: **View on GitHub** (external) and **Details** (internal route `/repo/:name`)

Cards use the existing glass-card / gradient-border styling with hover lift, magnetic effect, and ScrollReveal entrance — matching the rest of the site.

The 7 repos:
1. react-qr-code
2. cheque-printing-software
3. laravel-api-toolkit
4. laravel-dynamic-settings
5. laravel-audit-pro
6. laravel-multi-payment-gateway
7. Laravel-QR-Auth

### Detail Page (`/repo/:name`)

A new `RepoDetail.tsx` page route showing a deep view of one repo:

- Sticky header (reuses `Header`) with back-to-portfolio link
- Hero band: repo name, description, language, stars/forks/watchers, created/updated dates
- Topic chips
- **Rendered README** (fetched live from `https://api.github.com/repos/codersandip/{name}/readme`, base64-decoded, rendered as Markdown via `react-markdown` + `remark-gfm` with Tailwind typography styling and syntax-highlighted code blocks)
- Quick stats card: open issues, default branch, license, size
- CTAs: View on GitHub, Clone URL (copy to clipboard), Live homepage (if present)
- Loading skeletons while fetching, error fallback if API rate-limited

Data is fetched client-side via `@tanstack/react-query` (already installed) for caching.

### Curated Fallback Metadata

Since most repos have null descriptions on GitHub, a small `repos.ts` data file provides:
- Polished `title`, `tagline`, `description`, `tech[]`, `highlights[]`, `category` for each of the 7 repos
- Used on cards and the detail hero so the page looks complete even before the README loads

### Routing & Files

```text
src/
  pages/
    RepoDetail.tsx          NEW  — /repo/:name route
  components/portfolio/
    OpenSource.tsx          NEW  — grid section on home
    RepoCard.tsx            NEW  — single card
  data/
    repos.ts                NEW  — curated metadata for 7 repos
  App.tsx                   EDIT — add <Route path="/repo/:name" />
  pages/Index.tsx           EDIT — insert <OpenSource /> before <Contact />
  components/portfolio/Header.tsx  EDIT — add "Open Source" nav link (#opensource)
```

### Technical Details

- Packages to install: `react-markdown`, `remark-gfm`, `rehype-highlight`, `highlight.js` (for README rendering & code syntax highlighting). `@tanstack/react-query` is already in the project.
- GitHub API calls are unauthenticated (60 req/hr per IP). Responses are cached via React Query with `staleTime: 1000 * 60 * 10`.
- Markdown styles: use `@tailwindcss/typography` `prose prose-invert` classes scoped to README container; install `@tailwindcss/typography` plugin and add to `tailwind.config.ts`.
- Animations: `framer-motion` entrance, magnetic buttons reused from existing components, consistent with portfolio styling.
- SEO: detail page sets `<title>` and meta description dynamically via `document.title` effect.
- Accessibility: cards are `<article>` with proper heading hierarchy; links have `aria-label`; back button is keyboard-focusable.

