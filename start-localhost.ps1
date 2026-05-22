$cmsRoot = "C:\Users\ADMIN\Downloads\MrGardenr_CMS"
$publicRoot = "C:\Users\ADMIN\Downloads\MrGardenr v1 Draft"

Start-Process powershell -WindowStyle Hidden -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$cmsRoot\backend'; npm run dev"
)

Start-Process powershell -WindowStyle Hidden -ArgumentList @(
  "-NoExit",
  "-Command",
  "Set-Location '$cmsRoot\frontend'; npm run dev"
)

Start-Process powershell -WindowStyle Hidden -ArgumentList @(
  "-NoExit",
  "-Command",
  "`$env:VITE_CMS_API_URL='http://127.0.0.1:5000'; Set-Location '$publicRoot'; npm run dev"
)

Write-Host "CMS API:       http://127.0.0.1:5000"
Write-Host "CMS Frontend:  http://127.0.0.1:5173"
Write-Host "Public Site:   http://127.0.0.1:3000"
