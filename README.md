# ShirtFinder 

Buscador de camisetas de fútbol. Puedes explorar equipaciones de diferentes equipos y temporadas, ver su historia, valorarlas, guardarlas en favoritos y hablar sobre ellas en el foro.

**Proyecto de 2º DAW — CEI Sevilla (2025/2026)**

## Tecnologías

**Frontend**

- React 19 + Vite 7
- React Router DOM
- SweetAlert2
- React Icons
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

**Desde MySQL Workbench:**
1. `Server` ---> `Data Import`
2. Selecciona `Import from Self-Contained File`
3. Elige `database/shirtfinder_backup.sql`
4. Ejecuta

**Desde terminal:**
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

Arranca el servidor:
```bash
npm start
```

Backend corriendo en `http://localhost:5000`

### 4. Configurar el frontend

```bash
cd frontend
npm install
```

Crea un `.env` dentro de `frontend/`:

VITE_API_URL=http://localhost:5000

Arranca el frontend:
```bash
npm run dev
```

Frontend en `http://localhost:5173`

## Credenciales de prueba

Usuari: cesar_test 
Contraseña: test123

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

https://github.com/CesarMed06