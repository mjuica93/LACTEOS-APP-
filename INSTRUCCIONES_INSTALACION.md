# Instrucciones de Instalación - Lácteos App

## 🚨 IMPORTANTE: Primero necesitas instalar Node.js

### Paso 1: Instalar Node.js

1. **Descarga Node.js**:
   - Abre tu navegador y ve a: https://nodejs.org/es/
   - Haz clic en el botón verde "LTS" (Long Term Support)
   - Se descargará un archivo .msi para Windows

2. **Instala Node.js**:
   - Busca el archivo descargado (normalmente en "Descargas")
   - Haz doble clic en el archivo .msi
   - Sigue las instrucciones del instalador:
     - Haz clic en "Next" en todas las pantallas
     - Acepta los términos y condiciones
     - Mantén todas las opciones por defecto
     - Haz clic en "Install"
     - Espera a que termine la instalación
     - Haz clic en "Finish"

3. **Verifica la instalación**:
   - Cierra completamente esta ventana de PowerShell
   - Abre una nueva ventana de PowerShell
   - Navega de vuelta al directorio del proyecto:
     ```bash
     cd "C:\Users\Martin\Documents\GitHub\CREADOR DE CATÁLOGOS DE YOGURES"
     ```
   - Verifica que Node.js esté instalado:
     ```bash
     node --version
     npm --version
     ```

## Paso 2: Instalar la Aplicación

Una vez que tengas Node.js instalado, puedes proceder con la instalación de la aplicación:

### Opción A: Instalación Automatizada (Recomendada)
```bash
# Ejecuta el script de instalación
setup.bat
```

### Opción B: Instalación Manual
```bash
# 1. Instalar dependencias del proyecto principal
npm install

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Instalar dependencias del frontend
cd ../frontend
npm install

# 4. Volver al directorio raíz
cd ..

# 5. Configurar variables de entorno
copy backend\env.example backend\.env
copy frontend\env.example frontend\.env

# 6. Inicializar base de datos
cd backend
npm run db:init
cd ..
```

## Paso 3: Ejecutar la Aplicación

```bash
# Ejecutar todo junto
npm run dev
```

## Paso 4: Acceder a la Aplicación

- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:3001/api

## Credenciales por Defecto

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Solución de Problemas

### Si Node.js no se instala correctamente:
1. Asegúrate de ejecutar el instalador como administrador
2. Desactiva temporalmente el antivirus
3. Reinicia tu computadora después de la instalación

### Si hay errores de permisos:
1. Ejecuta PowerShell como administrador
2. Navega al directorio del proyecto
3. Ejecuta los comandos de instalación

### Si los puertos están ocupados:
```bash
# Cambiar puerto del frontend
cd frontend
echo PORT=3002 > .env
npm start

# Cambiar puerto del backend
cd backend
# Editar .env y cambiar PORT=3002
npm run dev
```

## Verificación de Instalación

Después de completar todos los pasos, deberías ver:

1. ✅ Node.js instalado (versión 16 o superior)
2. ✅ Dependencias instaladas en todos los directorios
3. ✅ Base de datos inicializada
4. ✅ Servidor backend corriendo en puerto 3001
5. ✅ Frontend corriendo en puerto 3000
6. ✅ Acceso a la aplicación web

## Próximos Pasos

Una vez que la aplicación esté funcionando:

1. **Explorar la aplicación**: Navega por todas las secciones
2. **Cambiar credenciales**: Modifica la contraseña del usuario admin
3. **Agregar productos**: Comienza a cargar tu catálogo de lácteos
4. **Configurar clientes**: Agrega tu base de datos de clientes
5. **Crear presentaciones**: Prueba el generador de presentaciones

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Ejecutar todo
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend

# Base de datos
npm run db:init          # Inicializar BD
npm run db:seed          # Poblar con datos de ejemplo

# Testing
npm test                 # Ejecutar tests

# Producción
npm run build           # Construir frontend
npm start               # Ejecutar en producción
```

---

**¿Necesitas ayuda?** Si encuentras algún problema durante la instalación, revisa:
1. Que Node.js esté correctamente instalado
2. Que no haya conflictos de puertos
3. Que tengas permisos de administrador si es necesario

¡Tu aplicación de presentaciones de ventas para lácteos estará lista para usar! 🥛📊 