@echo off
echo ========================================
echo Instalacion de Lácteos App
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo Por favor, instala Node.js desde https://nodejs.org/
    echo Luego ejecuta este script nuevamente.
    pause
    exit /b 1
)

echo Node.js encontrado.
echo.

echo Instalando dependencias del proyecto principal...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias del proyecto principal.
    pause
    exit /b 1
)

echo.
echo Instalando dependencias del backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias del backend.
    pause
    exit /b 1
)

echo.
echo Instalando dependencias del frontend...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias del frontend.
    pause
    exit /b 1
)

cd ..

echo.
echo Creando archivo de configuración del backend...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo Archivo .env creado en backend/
)

echo.
echo Inicializando base de datos...
cd backend
call npm run db:init
if %errorlevel% neq 0 (
    echo ERROR: Fallo al inicializar la base de datos.
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo ¡Instalación completada exitosamente!
echo ========================================
echo.
echo Para ejecutar la aplicación:
echo 1. Ejecuta: npm run dev
echo 2. Abre: http://localhost:3000
echo.
echo Credenciales por defecto:
echo Usuario: admin
echo Contraseña: admin123
echo.
pause 