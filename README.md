# BDTAT · BD Travel and Tours

This Next.js App Router package contains the public BDTAT website from Site version 60, saved on 12 November 2026 at 9:06 AM Malaysia time. It is based on source commit `0860b6f88a7349194ab758d9531788d2cec52b84`.

## Deploy on Hostinger

1. In hPanel, add a **Node.js Web App** and select **Upload your website files**.
2. Upload `BDTAT-Hostinger-NextJS-v60.zip`. The project files are at the ZIP root.
3. Select **Next.js**, **Node.js 24**, and **npm**. Use `npm run build` for the build command and `npm start` for the start command if Hostinger asks.
4. Open the deployed site and check `/`, `/blog` and `/api/health` before connecting your domain.

[Hostinger Node.js deployment guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)

## Run locally

```sh
npm ci
npm run build
npm start
```

Use `npm run dev` for development. The default local URL is `http://localhost:3000`.

## Source layout

| Path | Purpose |
| --- | --- |
| `app/layout.tsx` | Shared HTML layout and browser icons |
| `app/page.tsx` | Home page and trip planner |
| `app/blog/page.tsx` | Travel blog |
| `app/api/health/route.ts` | JSON health check |
| `components/site-content.tsx` | Renders the checked-in page markup and loads its scripts |
| `content/home.html` and `content/blog.html` | Bilingual public website content |
| `public/` | Photos, icons, CSS, and browser scripts |
| `next.config.ts` | Next.js settings and redirects for legacy HTML URLs |
| `package.json` and `package-lock.json` | Commands and locked dependencies |

The trip planner and enquiry forms prepare WhatsApp messages. The snapshot has no database, payment integration, or guest sign-in to configure. Daily blog publishing on the ChatGPT-hosted BDTAT site is tied to that deployment. To update the Hostinger blog, edit `content/blog.html`, add any photos to `public/assets/`, and redeploy.
