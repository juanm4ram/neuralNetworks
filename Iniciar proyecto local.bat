@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
set "PORT=8765"

echo ============================================================
echo   AgentsEvolution - servidor local
echo   http://localhost:%PORT%/
echo   Para detenerlo, cierra esta ventana o pulsa Ctrl+C.
echo ============================================================
echo.

start "" /b cmd /c "timeout /t 2 >nul & start "" http://localhost:%PORT%/"

where py >nul 2>&1
if %errorlevel%==0 (
  py -m http.server %PORT%
  goto fin
)

where python >nul 2>&1
if %errorlevel%==0 (
  python -m http.server %PORT%
  goto fin
)

echo.
echo No se encontro Python en este equipo.
echo Instala Python y vuelve a ejecutar este acceso directo.
echo.
pause

:fin
endlocal
