# Cloudless.gr

The official website and e-commerce store for **Cloudless** — a startup specializing in cloud computing, serverless architecture, data analytics, and AI-powered digital marketing.

Built with [Next.js 16](https://nextjs.org/) (App Router), TypeScript, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 with `@tailwindcss/postcss`
- **Payments:** Stripe SDK v21 (Checkout Sessions)
- **Testing:** Vitest 4 + React Testing Library
- **Package Manager:** pnpm
- **CI/CD:** GitHub Actions → AWS Amplify Hosting

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Stripe account (for payments)

### Installation

```bash
git clone https://github.com/Themis128/cloudless-gr.git
cd cloudless-gr
pnpm install
```

### Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.local.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID for the contact form |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-side) |

### Development

```bash
pnpm dev         # Start dev server (Turbopack)
pnpm build       # Production build
pnpm start       # Start production server
pnpm lint        # Run ESLint
pnpm test        # Run tests once
pnpm test:watch  # Run tests in watch mode
```

## Project Structure

```
src/
├── app/
│   ├── api/checkout/     # Stripe Checkout API route
│   ├── blog/             # Blog pages with [slug] routes
│   ├── contact/          # Contact form page
│   ├── services/         # Services overview page
│   ├── store/            # E-commerce store
│   │   ├── [id]/         # Product detail pages
│   │   └── success/      # Order confirmation
│   ├── layout.tsx        # Root layout with CartProvider
│   └── page.tsx          # Homepage
├── components/
│   ├── store/            # Store components (StoreGrid, CartButton, CartSlideOver, AddToCartButton)
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ScrollReveal.tsx
├── context/
│   └── CartContext.tsx    # Shopping cart state (React Context + useReducer)
└── lib/
    ├── blog.ts           # Blog data utilities
    ├── store-products.ts # Product catalog and helpers
    └── stripe.ts         # Stripe SDK initialization
__tests__/                # Vitest unit tests
.github/
├── workflows/
│   ├── ci.yml            # Lint, type check, test, build
│   ├── deploy.yml        # AWS Amplify deployment
│   ├── lighthouse.yml    # Performance audit on PRs
│   ├── pr-labeler.yml    # Auto-label PRs by file path
│   └── stale.yml         # Close stale issues/PRs
├── dependabot.yml        # Weekly dependency updates
└── labeler.yml           # Label rules config
```

## Services

Cloudless offers four core services:

1. **Cloud Architecture Audit** — Infrastructure review with cost optimization and security assessment
2. **Serverless Application Development** — Event-driven apps with CI/CD and monitoring
3. **Data Analytics & Dashboards** — KPI dashboards, real-time pipelines, and data modeling
4. **AI-Powered Digital Marketing** — SEO, content strategy, paid ads, and performance reporting

Plus a bundled **Cloudless Growth Package** combining all four.

## E-Commerce Store

The store supports three product categories:

- **Services** — Cloud audit, serverless starter, AI growth engine (subscription)
- **Digital Products** — Playbooks, templates, video courses
- **Physical Products** — Developer swag (dev kit, t-shirts)

Payments are handled via Stripe Checkout Sessions. The cart uses React Context with `useReducer` for state management, rendered as a slide-over panel.

## Testing

32 unit tests across 4 test suites:

- `store-products.test.ts` — Product data integrity, helpers, category coverage
- `format-price.test.ts` — Price formatting (cents → EUR display)
- `cart-context.test.tsx` — Cart operations (add, remove, update, clear, toggle)
- `store-grid.test.tsx` — Component rendering and category filtering

## Deployment

The app deploys to **AWS Amplify Hosting**, which internally uses S3 + CloudFront for static assets and Lambda for API routes. The `deploy.yml` workflow runs on pushes to `main`.

Required GitHub Secrets for deployment:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AMPLIFY_APP_ID` | Amplify app identifier |
| `STRIPE_SECRET_KEY` | Stripe secret key for build |

## License

Private — All rights reserved.
