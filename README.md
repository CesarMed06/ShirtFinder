# ShirtFinder 

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)

Buscador de camisetas de fútbol. Puedes explorar equipaciones de diferentes equipos y temporadas, ver su historia, valorarlas, guardarlas en favoritos y hablar sobre ellas en el foro.

**Proyecto de 2º DAW — CEI Sevilla (2025/2026)**

## Tecnologías

**Frontend**

- React 19 + Vite 7
- React Router DOM
- SweetAlert2
- React Icons
- jsPDF
- react-easy-crop
- Vitest + React Testing Library

**Backend**

- Node.js + Express
- MySQL 8
- JWT (autenticación)
- Bcrypt (contraseñas)
- Nodemailer (recuperación de contraseña)
- Google Generative AI (@google/generative-ai)
- Jest + Supertest (tests)

**Otros**

- Cloudinary (imágenes)
- Postman (pruebas de API)

## Instalación

### 1. Clonar el repo

```bash
git clone https://github.com/CesarMed06/ShirtFinder.git
cd ShirtFinder
```

### 2. Importar la base de datos

**Desde MySQL Workbench (recomendado):**
1. `Server` → `Data Import`
2. Selecciona `Import from Self-Contained File`
3. Elige `database/shirtfinder_backup.sql`
4. Ejecuta

**Desde terminal** (solo si MySQL está en el PATH del sistema):
```bash
mysql -u root -p < database/shirtfinder_backup.sql
```

### 3. Configurar el backend

```bash
cd backend
npm install
```

Crea un `.env` dentro de `backend/`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=shirtfinder
DB_PORT=3306
JWT_SECRET=shirtfinder_secret_2026
PORT=5000
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_app
GEMINI_API_KEY=tu_api_key_de_gemini
```

> ⚠️ **Chatbot con IA:** El chatbot usa la API de Google Gemini. Para que funcione necesitas una API key gratuita — consíguela en [aistudio.google.com](https://aistudio.google.com). Sin ella el resto de la app funciona con normalidad.

Arranca el servidor:
```bash
npm start
```

Backend corriendo en `http://localhost:5000`

### 4. Configurar el frontend

Abre una **nueva terminal** y ejecuta:

```bash
cd frontend
npm install --legacy-peer-deps
npm install jspdf react-easy-crop --legacy-peer-deps
```

> ℹ️ Si aparecen advertencias de vulnerabilidades tras la instalación, ignóralas — son de herramientas de desarrollo y no afectan al funcionamiento de la app. No ejecutes `npm audit fix`.

Crea un `.env` dentro de `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

Arranca el frontend:
```bash
npm run dev
```

Frontend en `http://localhost:5173`

## Credenciales de prueba

- **Email:** prueba@shirtfinder.com
- **Contraseña:** prueba123

> ℹ️ Este usuario ya viene incluido en el backup de la base de datos.

## Tests

**Backend** (Jest + Supertest):

```bash
cd backend
npm test
```

Cubre: auth, camisetas, posts, favoritos y comentarios.

**Frontend** (Vitest + React Testing Library):

```bash
cd frontend
npm test
```

Cubre: Header, Footer, Login, Register, ShirtCard, PostCard, Home, Forum y CreatePost.

## Funcionalidades

- Registro, login y recuperación de contraseña por email.
- Catálogo con filtros por marca, tipo, versión y valoración.
- Buscador de camisetas en tiempo real.
- Vista de detalle con galería de imágenes e historia de la equipación.
- Links de compra a la tienda oficial del club y de la marca.
- Comentarios y valoraciones por estrellas.
- Sistema de favoritos.
- Foro con creación, lectura y eliminación de posts.
- Perfil de usuario con edición de datos y avatar.
- Página 404 y rutas protegidas para usuarios no logueados.
- Chatbot con IA (Gemini) integrado en todas las páginas para ayudar al usuario a navegar la web y resolver dudas sobre camisetas.

## Mejoras futuras

- Sistema de notificaciones en tiempo real.
- Historial de valoraciones por usuario.
- Modo oscuro.
- Integración con API de ventas para mostrar camisetas destacadas en tiempo real según popularidad.

## Autor

**César Medina Gago**

2º Desarrollo de Aplicaciones Web — CEI Sevilla (2025/2026)

[https://github.com/CesarMed06](https://github.com/CesarMed06)