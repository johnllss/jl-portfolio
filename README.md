# John Lloyd Suñga: Career e-Portfolio

## Run it

```bash
npm install          # installs both workspaces
npm run dev          # API on :5001 + site on :5173
```

Open http://localhost:5173.

Production: `npm run build && npm start` serves the built site and API together from :5001.

## Structure

```
client/   React app (pages/, components/, styles/tokens.css = design tokens)
server/   Express API (src/data.ts = content, src/index.ts = routes + contact form)
```

API: `GET /api/profile · /api/projects · /api/projects/:slug · /api/work-samples · /api/references`, `POST /api/contact`.

## Contact form

Validates input, rate-limits (5 per 15 min per IP), has a honeypot field, then emails you through [Resend](https://resend.com) (`server/src/mail.ts`). No database.

1. Create a Resend account and an API key.
2. Locally: copy `server/.env.example` to `server/.env` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. On Render: add the same variables under Environment. Never commit `.env`.