# Dr. Mwenya Mubanga — Portfolio with CMS

A premium personal brand portfolio website with a built-in content management system. Non-technical users can update all site content through a secure admin dashboard — no code required.

## Features

### Public Website
- Hero section with photo, stats, and CV download
- About Me with rich text and research pillars
- Services showcase
- Portfolio / projects grid
- Experience timeline and skills
- Publications with category filters
- Testimonials
- Contact section with social links
- Blog / news updates (optional)
- Fully responsive, premium earth-tone design
- SEO metadata from CMS

### Admin CMS (`/admin`)
- Secure login (NextAuth credentials)
- Mobile-responsive dashboard
- Rich text editor (TipTap) for content
- Media library for image/PDF uploads
- Activity logs for all changes
- Profile and password settings
- Manage: homepage, about, services, projects, experience, skills, testimonials, publications, contact, social links, resume, blog, site settings

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Key variables:
- `AUTH_SECRET` — random string for session encryption
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — initial admin login (used during seed)
- `DATABASE_URL` — SQLite path for development

### 3. Set up database

```bash
npm run db:setup
```

This creates the SQLite database and seeds it with Dr. Mwenya Mubanga's portfolio content from the original site.

### 4. Run development server

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin CMS:** http://localhost:3000/admin
- **Default login:** `admin@mwenya.com` / `Admin123!` (change after first login)

## Production Deployment

### Vercel (recommended)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for step-by-step commands, environment variables, and PostgreSQL setup (required — SQLite does not work on Vercel).

Quick summary:

```bash
npm install -g vercel
vercel login
vercel link
# Add env vars (DATABASE_URL, AUTH_SECRET, NEXTAUTH_URL, etc.)
vercel --prod
npm run db:seed   # once, against production DATABASE_URL
```

Build on Vercel runs: `prisma generate` → `prisma migrate deploy` → `next build`

### File uploads

Uploaded files are stored in `public/uploads/`. For production:
- Ensure the directory is writable
- Consider cloud storage (S3, Cloudinary) for multi-instance deployments

### Security checklist

- [ ] Change default admin password immediately
- [ ] Set a strong `AUTH_SECRET` (32+ random characters)
- [ ] Use HTTPS in production
- [ ] Do not commit `.env` to version control

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Public portfolio (dynamic from DB)
│   ├── blog/                 # Blog listing and posts
│   ├── admin/                # CMS dashboard pages
│   └── api/                  # REST API for CMS operations
├── components/
│   ├── portfolio/            # Public site sections
│   └── admin/                # CMS UI components
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── content.ts            # Site content fetcher
│   └── prisma.ts             # Database client
prisma/
├── schema.prisma             # Database schema
└── seed.ts                   # Initial content seeder
public/uploads/               # Uploaded media files
reference/original-portfolio.html  # Original static site
```

## CMS Guide (for site owners)

1. Go to `/admin` and sign in
2. Use the sidebar to navigate sections
3. Edit content and click **Save Changes**
4. Changes appear on the live site immediately
5. Upload images via **Media Library** or inline pickers
6. Upload your CV in **Resume / CV**
7. Check **Activity Log** to see change history

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run db:setup` | Create DB + seed content |
| `npm run db:seed` | Re-run content seeder |

## Tech Stack

- **Next.js 16** (App Router)
- **Prisma 5** + SQLite (PostgreSQL-ready)
- **NextAuth v5** (credentials auth)
- **TipTap** (rich text editor)
- **Tailwind CSS 4**
- **TypeScript**
