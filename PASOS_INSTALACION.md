# Pasos de Instalación - Lácteos App

## Paso 1: Instalar Node.js

### Opción A: Descarga Manual
1. Ve a https://nodejs.org/es/
2. Descarga la versión LTS (recomendada)
3. Ejecuta el instalador y sigue las instrucciones
4. Reinicia tu terminal/PowerShell

### Opción B: Verificar si ya está instalado
```bash
node --version
npm --version
```

Si ves versiones como `v18.x.x` y `9.x.x`, ya tienes Node.js instalado.

## Paso 2: Instalar Dependencias

### Opción A: Script Automatizado (Recomendado)
```bash
# En Windows
setup.bat

# En macOS/Linux
chmod +x setup.sh
./setup.sh
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
```

## Paso 3: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
copy backend\env.example backend\.env
```

El archivo `.env` se creará automáticamente con configuraciones por defecto.

## Paso 4: Inicializar Base de Datos

```bash
cd backend
npm run db:init
cd ..
```

Esto creará:
- ✅ Todas las tablas necesarias
- ✅ Usuario administrador
- ✅ Categorías básicas
- ✅ Plantilla por defecto

## Paso 5: Ejecutar la Aplicación

### Opción A: Ejecutar Todo Junto
```bash
npm run dev
```

### Opción B: Ejecutar por Separado

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## Paso 6: Acceder a la Aplicación

- 🌐 **Frontend**: http://localhost:3000
- 🔧 **Backend API**: http://localhost:3001/api
- 🏥 **Health Check**: http://localhost:3001/api/health

## Credenciales por Defecto

- **Usuario**: `admin`
- **Contraseña**: `admin123`

## Solución de Problemas

### Error: "npm no se reconoce"
- Instala Node.js desde https://nodejs.org/
- Reinicia tu terminal

### Error: Puerto ya en uso
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

### Error: Módulos no encontrados
```bash
# Limpiar cache
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: Base de datos
```bash
cd backend
rm -rf database/lacteos.db
npm run db:init
```

## Verificación de Instalación

1. ✅ Node.js instalado
2. ✅ Dependencias instaladas
3. ✅ Base de datos inicializada
4. ✅ Servidor backend corriendo
5. ✅ Frontend corriendo
6. ✅ Acceso a la aplicación

## Próximos Pasos

Una vez que la aplicación esté funcionando:

1. **Cambiar credenciales**: Modifica la contraseña del usuario admin
2. **Agregar productos**: Comienza a cargar tu catálogo
3. **Configurar clientes**: Agrega tu base de datos de clientes
4. **Personalizar**: Adapta las plantillas a tu marca

## Comandos Útiles

```bash
# Desarrollo
npm run dev              # Ejecutar todo
npm run dev:backend      # Solo backend
npm run dev:frontend     # Solo frontend

# Base de datos
npm run db:init          # Inicializar BD
npm run db:migrate       # Migraciones

# Testing
npm test                 # Ejecutar tests

# Producción
npm run build           # Construir frontend
npm start               # Ejecutar en producción
```

---

¡Tu aplicación de presentaciones de ventas para lácteos está lista! 🥛📊 