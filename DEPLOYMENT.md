# MrGardenr CMS Deployment

## Backend API

Deploy `backend/` as a Node.js web service.

Required environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`

Recommended Render settings:

- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/health`

After the first deployment, create the first admin from a trusted machine:

```bash
cd backend
npm run seed:admin
```

Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` before running the seed command.

## CMS Frontend

Deploy `frontend/` as a Vite static app.

Required environment variable:

- `VITE_API_URL=https://your-api-host.example.com/api`

The CMS frontend includes `vercel.json` and `netlify.toml` for SPA routing.

## Main Website

The main website should consume only the public content namespace:

- `GET https://your-api-host.example.com/api/public/content/homepage`
- `GET https://your-api-host.example.com/api/public/content/services`
- `GET https://your-api-host.example.com/api/public/content/contact`

Use a main-site environment variable such as:

```bash
VITE_CMS_API_URL=https://your-api-host.example.com/api/public
```

Keep write endpoints under `/api/content` and media management under `/api/upload`; those require CMS authentication and should not be called by the public website.
