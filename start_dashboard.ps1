# SecurePipeline One-Click Startup Script for Windows
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Starting SecurePipeline Platform...     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Kill any existing instances on port 8000 and 5173
Write-Host "[1/3] Clearing ports 8000 and 5173..." -ForegroundColor Yellow
$connections = Get-NetTCPConnection -LocalPort 8000, 5173 -ErrorAction SilentlyContinue
foreach ($conn in $connections) {
    if ($conn.OwningProcess -gt 0) {
        Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}
Start-Sleep -Seconds 1

# 2. Start Backend in a new window
Write-Host "[2/3] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", "cd 'C:\Users\venna\.gemini\antigravity\scratch\securepipeline\dashboard\backend'; Write-Host 'FastAPI Backend Running on http://127.0.0.1:8000' -ForegroundColor Green; python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

# 3. Start Frontend in a new window (using cmd /c npm.cmd to bypass PowerShell execution policy)
Write-Host "[3/3] Starting React Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process cmd.exe -ArgumentList "/k", "cd /d C:\Users\venna\.gemini\antigravity\scratch\securepipeline\dashboard\frontend && echo React Frontend Running on http://localhost:5173 && npm.cmd run dev -- --host 127.0.0.1"

Start-Sleep -Seconds 3

# 4. Open in browser
Write-Host "Opening Dashboard in default browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  SecurePipeline is running!              " -ForegroundColor Green
Write-Host "  Backend:  http://127.0.0.1:8000/docs    " -ForegroundColor Gray
Write-Host "  Frontend: http://localhost:5173         " -ForegroundColor Gray
Write-Host "==========================================" -ForegroundColor Cyan
