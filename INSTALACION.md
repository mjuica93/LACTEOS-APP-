# Guía de Instalación - Aplicación de Presentaciones de Ventas para Lácteos

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)

### Verificar instalaciones

```bash
node --version
npm --version
git --version
```

## Paso 1: Clonar el Proyecto

```bash
git clone [URL_DEL_REPOSITORIO]
cd creador-catalogos-yogures
```

## Paso 2: Instalar Dependencias

### Instalar dependencias del proyecto principal
```bash
npm install
```

### Instalar dependencias del backend
```bash
cd backend
npm install
```

### Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

## Paso 3: Configurar Variables de Entorno

### Backend
```bash
cd backend
cp env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
PORT=3001
NODE_ENV=development
DATABASE_URL=./database/lacteos.db
JWT_SECRET=tu_secreto_jwt_super_seguro_aqui
FRONTEND_URL=http://localhost:3000
```

## Paso 4: Inicializar la Base de Datos

```bash
cd backend
npm run db:init
```

Esto creará:
- Todas las tablas necesarias
- Usuario administrador por defecto
- Categorías básicas de productos
- Plantilla de presentación por defecto

### Credenciales por defecto:
- **Usuario**: admin
- **Contraseña**: admin123

## Paso 5: Ejecutar la Aplicación

### Opción 1: Ejecutar todo desde la raíz
```bash
# Desde la raíz del proyecto
npm run dev
```

### Opción 2: Ejecutar por separado

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

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## Estructura de Directorios

```
creador-catalogos-yogures/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── models/          # Modelos
│   │   ├── routes/          # Rutas API
│   │   ├── middleware/      # Middleware
│   │   ├── database/        # Scripts de BD
│   │   └── utils/           # Utilidades
│   ├── database/            # Base de datos SQLite
│   ├── uploads/             # Archivos subidos
│   └── package.json
├── frontend/                # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes
│   │   ├── pages/           # Páginas
│   │   ├── contexts/        # Contextos
│   │   └── utils/           # Utilidades
│   └── package.json
├── docs/                    # Documentación
└── package.json
```

## Comandos Útiles

### Desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev

# Solo backend
npm run dev:backend

# Solo frontend
npm run dev:frontend
```

### Base de Datos
```bash
# Inicializar base de datos
npm run db:init

# Ejecutar migraciones
npm run db:migrate

# Poblar con datos de ejemplo
cd backend && npm run db:seed
```

### Testing
```bash
# Ejecutar tests
npm test

# Tests del backend
npm run test:backend

# Tests del frontend
npm run test:frontend
```

### Producción
```bash
# Construir frontend
npm run build

# Ejecutar en producción
npm start
```

## Solución de Problemas

### Error: Puerto ya en uso
Si el puerto 3000 o 3001 está ocupado:

```bash
# Cambiar puerto del frontend
cd frontend
echo "PORT=3002" > .env
npm start

# Cambiar puerto del backend
cd backend
# Editar .env y cambiar PORT=3002
npm run dev
```

### Error: Módulos no encontrados
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: Base de datos
```bash
# Recrear base de datos
cd backend
rm -rf database/lacteos.db
npm run db:init
```

## Configuración de Desarrollo

### VS Code Extensions Recomendadas
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- SQLite

### Configuración de Prettier
Crear `.prettierrc` en la raíz:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Próximos Pasos

1. **Personalizar configuración**: Ajustar variables de entorno según tu entorno
2. **Agregar productos**: Comenzar a cargar tu catálogo de productos lácteos
3. **Configurar clientes**: Agregar tu base de datos de clientes
4. **Personalizar plantillas**: Adaptar las plantillas de presentación a tu marca
5. **Configurar email**: Configurar el envío de emails si es necesario

## Soporte

Si encuentras problemas durante la instalación:

1. Revisa que todas las versiones de Node.js y npm sean correctas
2. Verifica que no haya conflictos de puertos
3. Revisa los logs de error en la consola
4. Consulta la documentación técnica en `docs/ESQUEMA_TECNICO.md`

---

¡Tu aplicación de presentaciones de ventas para lácteos está lista para usar! 🥛📊 