# ShirtFinder

Aplicación web para buscar y explorar camisetas de fútbol. Permite a los usuarios descubrir equipaciones icónicas de diferentes equipos y temporadas, con sistema de filtros avanzado, comentarios y valoraciones.

**Proyecto de 2º DAW - CEI Sevilla (2025/2026)**

## Tecnologías utilizadas

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL 8
- **Autenticación:** JWT
- **Almacenamiento:** Cloudinary

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- Node.js v18 o superior
- MySQL 8 o superior
- Git

## Instalación

### Paso 1: Clonar el repositorio

git clone https://github.com/CesarMed06/ShirtFinder.git
cd ShirtFinder

### Paso 2: Importar la base de datos

Tienes dos opciones:

**Opción A: Desde MySQL Workbench**

1. Abre MySQL Workbench
2. Ve a `Server` → `Data Import`
3. Selecciona `Import from Self-Contained File`
4. Busca el archivo `database/shirtfinder_backup.sql`
5. Ejecuta la importación

**Opción B: Desde terminal**

mysql -u root -p < database/shirtfinder_backup.sql

### Paso 3: Configurar el backend

cd backend
npm install

Crea un archivo `.env` en la carpeta `backend` con este contenido:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=shirtfinder
DB_PORT=3306
JWT_SECRET=shirtfinder_secret_2026
PORT=5000

Arranca el servidor backend:

npm start

El backend estará corriendo en `http://localhost:5000`

### Paso 4: Configurar el frontend

Abre una nueva terminal y ejecuta:

cd frontend
npm install
npm run dev

La aplicación se abrirá automáticamente en `http://localhost:5173`

## Credenciales de prueba

Para probar la aplicación puedes usar estas credenciales:

- **Usuario:** cesar_test
- **Contraseña:** test123

## Funcionalidades actuales

- **Autenticación:** Login y registro de usuarios con JWT.
- **Catálogo:** Visualización de camisetas con filtros por marca, tipo, versión y valoración.
- **Detalle:** Vista detallada de cada camiseta con galería de imágenes e información completa.
- **Comentarios:** Sistema de comentarios con valoración por estrellas (0-5).
- **Valoraciones:** Media de ratings calculada y mostrada en tiempo real.
- **Búsqueda:** Filtros avanzados para encontrar camisetas específicas.

## Próximas funcionalidades (MVP II)

- Sistema de favoritos.
- Foro de discusión.
- Perfil de usuario completo con estadísticas.
- Historial de valoraciones.
- Sistema de notificaciones.

## Autor

**César Medina Gago**
2º Desarrollo de Aplicaciones Web
CEI Sevilla - Curso 2025/2026


