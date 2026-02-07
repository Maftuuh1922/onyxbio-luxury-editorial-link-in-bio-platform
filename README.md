# Onyx Bio

[cloudflarebutton]

Onyx Bio is a modern, full-stack web application built on Cloudflare Pages and Workers. It features a responsive React frontend with Tailwind CSS and shadcn/ui components, powered by a Hono-based API backend. Designed for performance, scalability, and developer experience, this template is ideal for building dynamic web apps with seamless edge deployment.

## ✨ Key Features

- **Full-Stack Architecture**: React 18 + TypeScript frontend served via Cloudflare Pages, Hono API on Cloudflare Workers
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom design system, dark/light theme support
- **State Management & Data Fetching**: TanStack Query, Zustand, React Router
- **Developer Tools**: Vite for fast HMR, ESLint, TypeScript strict mode
- **Cloudflare-Native**: Workers for API, Pages for static assets, automatic SPA routing
- **Responsive Design**: Mobile-first, sidebar layout, animations via Tailwind
- **Error Handling**: Global error boundaries, client-side error reporting to API
- **Performance Optimized**: Code splitting, lazy loading, optimized bundles

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide Icons, Framer Motion, Sonner |
| **Backend** | Hono, Cloudflare Workers, TypeScript |
| **Data & State** | TanStack React Query, Zustand, React Hook Form, Zod |
| **UI Components** | Radix UI primitives, Headless UI, React Router |
| **Utilities** | clsx, tailwind-merge, date-fns, UUID |
| **Dev Tools** | ESLint, Bun, Wrangler |

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (recommended package manager)
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/installation/)
- Cloudflare account (free tier supported)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Worker types:
   ```bash
   bun cf-typegen
   ```

### Development

Start the development server:
```bash
bun dev
```

- Frontend: http://localhost:3000
- API: http://localhost:8787/api (Worker proxy)

Hot Module Replacement (HMR) works out-of-the-box. Edit `src/` for UI, `worker/userRoutes.ts` for API routes.

### Build for Production

```bash
bun build
```

Output in `dist/` for Pages deployment.

## 📚 Usage

### Adding API Routes

Edit `worker/userRoutes.ts`:
```typescript
import { Hono } from 'hono';

export function userRoutes(app: Hono) {
  app.get('/api/users', (c) => c.json({ users: [] }));
}
```

### Frontend Pages

Update `src/main.tsx` router:
```tsx
const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/dashboard', element: <DashboardPage /> },
]);
```

### Custom Components

Leverage shadcn/ui:
```bash
# Add new component (CLI not included; copy from src/components/ui/)
```

Use hooks like `useTheme`, `useMobile`. Layouts in `src/components/layout/`.

## ☁️ Deployment

Deploy to Cloudflare Pages + Workers:

1. Login to Wrangler:
   ```bash
   wrangler login
   ```

2. One-command deploy:
   ```bash
   bun run deploy
   ```

   Or manually:
   ```bash
   bun build
   wrangler deploy
   ```

[cloudflarebutton]

**Custom Domain**: Bind via Cloudflare Dashboard > Pages > Custom Domains.

**Environment Variables**: Add to `wrangler.jsonc` under `vars`, or Dashboard > Workers > Settings > Variables.

**Preview Deployments**: Connect GitHub repo for automatic previews.

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`bun dev`)
3. Commit changes (`git commit -m 'feat: add feature'`)
4. Push and open PR

Linting runs automatically. Follow TypeScript strict mode.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Vite Docs](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

Built with ❤️ for Cloudflare Developers.