# MrGardenr Localhost Setup

This project has three local surfaces:

- Public website: `http://127.0.0.1:3000`
- CMS frontend: `http://127.0.0.1:5173`
- CMS backend API: `http://127.0.0.1:5000`

## Start Everything

From `C:\Users\ADMIN\Downloads\MrGardenr_CMS`, run:

```powershell
.\start-localhost.ps1
```

That starts:

- `backend/` on port `5000`
- `frontend/` on port `5173`
- `C:\Users\ADMIN\Downloads\MrGardenr v1 Draft` on port `3000`

## Manual Commands

Backend API:

```powershell
cd backend
npm run dev
```

CMS frontend:

```powershell
cd frontend
npm run dev
```

Public website:

```powershell
cd "C:\Users\ADMIN\Downloads\MrGardenr v1 Draft"
$env:VITE_CMS_API_URL="http://127.0.0.1:5000"
npm run dev
```

## Local Config

- `backend/.env` now allows both frontend ports in `CORS_ORIGIN`
- `frontend/.env.local` points the CMS editor to `http://127.0.0.1:5000/api`
- The public website already supports `VITE_CMS_API_URL=http://127.0.0.1:5000`

## Backend Storage

The CMS backend now supports two media storage modes:

- `STORAGE_PROVIDER=local`
  Uses `backend/uploads` and keeps the current local development flow.
- `STORAGE_PROVIDER=r2`
  Stores media files in Cloudflare R2 and keeps media metadata in MongoDB.

When using Atlas + R2, set these backend env vars:

```env
USE_IN_MEMORY_DB=false
MONGO_URI=mongodb+srv://USER:PASSWORD@HOST/mrgardenr_cms?retryWrites=true&w=majority
STORAGE_PROVIDER=r2
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=mrgardenr-cms-media
R2_PUBLIC_BASE_URL=https://media.example.com
R2_KEY_PREFIX=cms
```

Notes:

- The media API now stores file metadata in MongoDB instead of scanning the local uploads directory.
- The Media Library delete action now targets a media record id rather than a filename.
- Keep `R2_PUBLIC_BASE_URL` on a public bucket or custom domain used to serve uploaded assets.
