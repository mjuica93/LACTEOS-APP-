#!/bin/bash

echo "========================================"
echo "Instalacion de Lácteos App"
echo "========================================"
echo

echo "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado."
    echo "Por favor, instala Node.js desde https://nodejs.org/"
    echo "Luego ejecuta este script nuevamente."
    exit 1
fi

echo "Node.js encontrado: $(node --version)"
echo

echo "Instalando dependencias del proyecto principal..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Fallo al instalar dependencias del proyecto principal."
    exit 1
fi

echo
echo "Instalando dependencias del backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Fallo al instalar dependencias del backend."
    exit 1
fi

echo
echo "Instalando dependencias del frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Fallo al instalar dependencias del frontend."
    exit 1
fi

cd ..

echo
echo "Creando archivo de configuración del backend..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "Archivo .env creado en backend/"
fi

echo
echo "Creando archivo de configuración del frontend..."
if [ ! -f "frontend/.env" ]; then
    cp frontend/env.example frontend/.env
    echo "Archivo .env creado en frontend/"
fi

echo
echo "Inicializando base de datos..."
cd backend
npm run db:init
if [ $? -ne 0 ]; then
    echo "ERROR: Fallo al inicializar la base de datos."
    exit 1
fi

cd ..

echo
echo "========================================"
echo "¡Instalación completada exitosamente!"
echo "========================================"
echo
echo "Para ejecutar la aplicación:"
echo "1. Ejecuta: npm run dev"
echo "2. Abre: http://localhost:3000"
echo
echo "Credenciales por defecto:"
echo "Usuario: admin"
echo "Contraseña: admin123"
echo 