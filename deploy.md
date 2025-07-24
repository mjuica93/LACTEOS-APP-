# 🚀 Guía de Despliegue - Soprole Catálogos

## 📋 Prerrequisitos

Antes de comenzar, necesitas tener:

1. **Cuenta de GitHub** (gratuita)
2. **Cuenta de Railway** (gratuita)
3. **Git instalado** en tu computadora
4. **Node.js instalado** (versión 16 o superior)

## 🔧 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear un nuevo repositorio en GitHub

1. Ve a [github.com](https://github.com) y inicia sesión
2. Haz clic en el botón verde "New" o "Nuevo"
3. Configura el repositorio:
   - **Repository name**: `soprole-catalogos`
   - **Description**: `Aplicación de gestión de catálogos y presentaciones para Soprole`
   - **Visibility**: Public (o Private si prefieres)
   - **NO** marques "Add a README file" (ya tenemos uno)
4. Haz clic en "Create repository"

### 1.2 Subir el código a GitHub

Ejecuta estos comandos en tu terminal:

```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "🚀 Versión inicial de Soprole Catálogos App"

# Agregar el repositorio remoto (reemplaza TU_USUARIO con tu nombre de usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/soprole-catalogos.git

# Subir el código
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Desplegar en Railway

### 2.1 Conectar con Railway

1. Ve a [railway.app](https://railway.app) y inicia sesión con tu cuenta de GitHub
2. Haz clic en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Busca y selecciona tu repositorio `soprole-catalogos`
5. Haz clic en "Deploy Now"

### 2.2 Configurar Variables de Entorno

En Railway, ve a la pestaña "Variables" y agrega:

```env
NODE_ENV=production
PORT=3000
```

### 2.3 Configurar el Dominio

1. Ve a la pestaña "Settings" en Railway
2. En "Domains", haz clic en "Generate Domain"
3. Railway te dará una URL como: `https://tu-app-123456.up.railway.app`

## ✅ Paso 3: Verificar el Despliegue

1. **Health Check**: Visita `https://tu-app-123456.up.railway.app/health`
2. **Aplicación**: Visita `https://tu-app-123456.up.railway.app`

Deberías ver:
- ✅ Página de salud con mensaje "Soprole Catálogos App funcionando correctamente"
- ✅ La aplicación completa con el diseño de Soprole

## 🔄 Paso 4: Despliegue Automático

Una vez configurado, cada vez que hagas cambios:

```bash
# Hacer cambios en tu código
git add .
git commit -m "✨ Nuevas mejoras"
git push origin main
```

Railway detectará automáticamente los cambios y desplegará la nueva versión.

## 🛠️ Solución de Problemas

### Error: "Build failed"
- Verifica que `package.json` esté en la raíz del proyecto
- Asegúrate de que `server.js` exista y esté correcto

### Error: "Application not found"
- Verifica que la URL del dominio sea correcta
- Revisa los logs en Railway para más detalles

### Error: "Port already in use"
- Railway maneja automáticamente el puerto, no necesitas configurarlo

## 📞 Soporte

Si tienes problemas:

1. **Revisa los logs** en Railway
2. **Verifica la configuración** de variables de entorno
3. **Contacta al equipo** de desarrollo

---

**¡Tu aplicación Soprole estará en línea en minutos! 🎉** 