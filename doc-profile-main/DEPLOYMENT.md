# Deploy to Vercel

This project uses **Next.js 16**, **Prisma**, and **PostgreSQL**. SQLite is not supported on Vercel (serverless filesystem is ephemeral).

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Vercel account](https://vercel.com/signup)
- [GitHub](https://github.com/) account (recommended)
- **PostgreSQL database** — [Neon](https://neon.tech) (free tier) or [Vercel Postgres](https://vercel.com/storage/postgres)

## 1. Create a PostgreSQL database

### Option A — Neon (recommended, free)

1. Go to [https://neon.tech](https://neon.tech) and create a project.
2. Copy the **connection string** (must include `?sslmode=require`).

### Option B — Vercel Postgres

1. In the Vercel dashboard, add **Storage → Postgres** to your project after linking the repo.
2. Connect `DATABASE_URL` automatically via the integration.

## 2. Push code to GitHub

From the project folder:

```powershell
cd "c:\Users\LENOVO\Desktop\mwenya"

git add .
git commit -m "Prepare portfolio for Vercel production deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub details.

## 3. Install Vercel CLI (one time)

```powershell
npm install -g vercel
```

## 4. Deploy from the CLI

```powershell
cd "c:\Users\LENOVO\Desktop\mwenya"

# Log in to Vercel (opens browser)
vercel login

# Link project (first time)
vercel link

# Set production environment variables (run each command; paste values when prompted)
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add ADMIN_EMAIL production
vercel env add ADMIN_PASSWORD production
vercel env add ADMIN_NAME production
vercel env add MAX_UPLOAD_SIZE production

# Deploy to production
vercel --prod
```

### Generate `AUTH_SECRET` (PowerShell)

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

After the first deploy, set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your real URL (e.g. `https://mwenya-portfolio.vercel.app`), then redeploy:

```powershell
vercel env rm NEXTAUTH_URL production
vercel env add NEXTAUTH_URL production
vercel env rm NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod
```

## 5. Seed the production database (one time)

After the first successful deploy, run seed against your **production** `DATABASE_URL`:

```powershell
# Temporarily point local env to production DB (use with care)
$env:DATABASE_URL="postgresql://..."
npm run db:seed
```

Or use Neon’s SQL editor / `psql` if you prefer not to seed from your machine.

**Important:** Change the default admin password in `/admin` immediately after seeding.

## 6. Deploy via Vercel Dashboard (alternative)

1. Go to [https://vercel.com/new](https://vercel.com/new).
2. **Import** your GitHub repository.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run vercel-build` (set in `vercel.json`).
5. Add environment variables (see table below).
6. Click **Deploy**.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (`?sslmode=require` for Neon) |
| `AUTH_SECRET` | Yes | Random 32+ character secret for session encryption |
| `NEXTAUTH_URL` | Yes | Full site URL, e.g. `https://your-app.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Same as `NEXTAUTH_URL` (used for SEO/metadata) |
| `ADMIN_EMAIL` | Seed only | Admin login email (for `npm run db:seed`) |
| `ADMIN_PASSWORD` | Seed only | Initial admin password — change after first login |
| `ADMIN_NAME` | Seed only | Display name for admin user |
| `MAX_UPLOAD_SIZE` | No | Max upload bytes (default `5242880` = 5MB) |

## Production build (verify locally)

```powershell
npm install
npm run build
```

Vercel runs `npm run vercel-build`, which executes:

1. `prisma generate`
2. `prisma migrate deploy`
3. `next build`

## Known production limitations

1. **File uploads** (`/admin` media, photos) are stored in `public/uploads/`. On Vercel this filesystem is **ephemeral** — uploads may disappear after redeploys. For persistent media, integrate [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) or S3 later.
2. **Database** must be PostgreSQL; local SQLite (`prisma/dev.db`) is no longer used by the schema.
3. Run `npm run db:seed` once per new database environment.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on `prisma migrate deploy` | Ensure `DATABASE_URL` is set in Vercel and migrations exist in `prisma/migrations/` |
| Admin login fails | Run `db:seed` on production DB; verify `AUTH_SECRET` and `NEXTAUTH_URL` |
| 500 on homepage | Check Vercel **Functions** logs; usually missing or invalid `DATABASE_URL` |
| Images/uploads 404 | Re-upload via admin or move to blob storage |
