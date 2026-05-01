export interface RepoMeta {
  name: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  highlights: string[];
  category: string;
}

export const GITHUB_USER = "codersandip";

export const repos: RepoMeta[] = [
  {
    name: "react-qr-code",
    title: "React QR Code",
    tagline: "Lightweight QR code generator for React",
    description:
      "A simple, customizable, and dependency-light QR code component for React applications. Generate scannable QR codes for URLs, text, vCards, and more with full styling control.",
    tech: ["React", "TypeScript", "SVG", "Vite"],
    highlights: [
      "Zero runtime dependencies",
      "Customizable colors, size, and error correction",
      "SVG output — crisp at any resolution",
      "Tree-shakeable ESM build",
    ],
    category: "React Library",
  },
  {
    name: "cheque-printing-software",
    title: "Cheque Printing Software",
    tagline: "Multi-bank cheque printing made effortless",
    description:
      "A desktop-grade cheque printing solution supporting templates for major banks. Auto-fills payee, amount in words, and date with precise alignment for direct printer output.",
    tech: ["JavaScript", "Electron", "Node.js", "PDF"],
    highlights: [
      "Pre-built templates for 20+ Indian banks",
      "Amount-in-words conversion (Indian numbering)",
      "Print preview with pixel-perfect alignment",
      "Payee history & batch printing",
    ],
    category: "Business Tool",
  },
  {
    name: "laravel-api-toolkit",
    title: "Laravel API Toolkit",
    tagline: "Production-ready API scaffolding for Laravel",
    description:
      "An opinionated toolkit that ships JSON API responses, exception handling, pagination, filtering, and rate-limiting helpers — so you can focus on business logic, not boilerplate.",
    tech: ["PHP", "Laravel", "REST", "OpenAPI"],
    highlights: [
      "Standardized JSON response envelope",
      "Built-in query filters & sorters",
      "Centralized exception → HTTP mapper",
      "Sanctum-ready auth helpers",
    ],
    category: "Laravel Package",
  },
  {
    name: "laravel-dynamic-settings",
    title: "Laravel Dynamic Settings",
    tagline: "Runtime app settings without redeploys",
    description:
      "Manage configuration values from the database with type-safe casts, caching, and an admin-friendly API. Perfect for feature flags, branding, and tenant-specific config.",
    tech: ["PHP", "Laravel", "Eloquent", "Cache"],
    highlights: [
      "Type-cast settings (bool, array, json, int)",
      "Auto-cached for zero query overhead",
      "Group & namespace support",
      "Artisan commands for seed/sync",
    ],
    category: "Laravel Package",
  },
  {
    name: "laravel-audit-pro",
    title: "Laravel Audit Pro",
    tagline: "Enterprise-grade model auditing",
    description:
      "Track every create, update, and delete on your Eloquent models with user attribution, IP logging, and a beautiful diff viewer. Compliance-ready out of the box.",
    tech: ["PHP", "Laravel", "Eloquent", "MySQL"],
    highlights: [
      "Field-level change diffs",
      "User & IP attribution per change",
      "Configurable retention policy",
      "Restore deleted records from audit log",
    ],
    category: "Laravel Package",
  },
  {
    name: "laravel-multi-payment-gateway",
    title: "Laravel Multi Payment Gateway",
    tagline: "One API. Every payment provider.",
    description:
      "A unified abstraction over Stripe, Razorpay, PayPal, and more. Switch gateways with a config change — your checkout code never changes.",
    tech: ["PHP", "Laravel", "Stripe", "Razorpay"],
    highlights: [
      "Unified charge / refund / webhook API",
      "Pluggable driver architecture",
      "Built-in webhook signature verification",
      "Multi-currency support",
    ],
    category: "Laravel Package",
  },
  {
    name: "Laravel-QR-Auth",
    title: "Laravel QR Auth",
    tagline: "Passwordless login via QR scan",
    description:
      "Drop-in QR-code authentication for Laravel apps. Users scan a QR with a trusted device to authenticate the browser session — secure, fast, and password-free.",
    tech: ["PHP", "Laravel", "WebSockets", "QR"],
    highlights: [
      "Real-time scan → auth via Pusher / Reverb",
      "Configurable token TTL",
      "Multi-device session binding",
      "Works alongside existing auth guards",
    ],
    category: "Laravel Package",
  },
  {
    name: "telescope-exporter",
    title: "Telescope Exporter",
    tagline: "Export Laravel Telescope entries with ease",
    description:
      "A handy companion package for Laravel Telescope that exports recorded entries (requests, queries, jobs, exceptions) to JSON, CSV, or shareable archives — perfect for debugging across environments.",
    tech: ["PHP", "Laravel", "Telescope", "CLI"],
    highlights: [
      "Export by type, date, or tag",
      "JSON / CSV / archive output",
      "Artisan command for CI pipelines",
      "Filter sensitive data before export",
    ],
    category: "Laravel Package",
  },
  {
    name: "role-permission-visualizer",
    title: "Role Permission Visualizer",
    tagline: "Visualize roles & permissions at a glance",
    description:
      "An interactive visualizer for Laravel role-based access control systems. Renders roles, permissions, and their relationships as a clear matrix and graph — making audits and onboarding effortless.",
    tech: ["PHP", "Laravel", "Spatie", "Blade"],
    highlights: [
      "Matrix view of roles × permissions",
      "Graph view of role inheritance",
      "Works with Spatie Laravel Permission",
      "Export visualizations as PNG / PDF",
    ],
    category: "Laravel Package",
  },
];

export const getRepoMeta = (name: string): RepoMeta | undefined =>
  repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
