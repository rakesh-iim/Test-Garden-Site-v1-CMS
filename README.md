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
