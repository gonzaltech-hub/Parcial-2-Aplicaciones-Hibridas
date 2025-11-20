# FixIt - Sistema de Gestión de Mantenimiento de Consorcios

FixIt es una aplicación FullStack MERN diseñada para agilizar el reporte y la gestión de incidentes de mantenimiento en edificios residenciales. La plataforma permite a los inquilinos reportar problemas y facilita a los administradores el seguimiento, actualización y resolución de los mismos de manera eficiente.

## Descripción del Proyecto

**¿Qué es FixIt?**

FixIt proporciona una solución digital para la gestión del mantenimiento de edificios. Los inquilinos pueden reportar fácilmente incidentes como ascensores averiados, problemas de iluminación o plomería. Los administradores del edificio pueden monitorear todos los incidentes reportados, actualizar su estado y agregar notas sobre el proceso de resolución.

**Características Principales:**

- Autenticación de usuarios con JWT (roles separados: Inquilino y Administrador).
- Reporte de incidentes con niveles de prioridad (Baja, Media, Alta).
- Seguimiento de estado (Reportado, En Progreso, Resuelto).
- Control de acceso basado en roles.
- Filtrado de incidentes por estado y prioridad.
- Funciones exclusivas de administrador para actualizar estados.
- Sistema de comentarios para comunicación entre inquilinos y administración.

## Tecnologías Utilizadas

### Backend
- **Node.js** con **Express.js** - Framework para API REST
- **MongoDB** con **Mongoose** - Base de datos y ODM
- **JWT (jsonwebtoken)** - Autenticación segura
- **bcryptjs** - Encriptación de contraseñas
- **express-validator** - Validación de datos

### Frontend
- **React** - Librería de interfaz de usuario (UI)
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP con interceptores
- **Context API** - Gestión del estado global (Auth)
- **Vite** - Entorno de desarrollo rápido

## Modelos de Base de Datos

### 1. Modelo de Usuario (User)
```javascript
{
  name: String (requerido),
  email: String (requerido, único),
  password: String (requerido, encriptada),
  role: String (enum: ['Inquilino', 'Administrador'], default: 'Inquilino'),
  apartment: String (requerido)
}
```

### 2. Modelo de Reclamo (Incident)
```javascript
{
  title: String (requerido),
  description: String (requerido),
  location: String (requerido),
  priority: String (enum: ['Baja', 'Media', 'Alta'], default: 'Media'),
  status: String (enum: ['Reportado', 'En Progreso', 'Resuelto'], default: 'Reportado'),
  adminNotes: String (opcional),
  createdBy: ObjectId (ref: User),
  updatedBy: ObjectId (ref: User),
  timestamps: true
}
```

### 3. Modelo de Comentario (Comment)
```javascript
{
  text: String (requerido),
  incident: ObjectId (ref: Incident),
  author: ObjectId (ref: User),
  createdAt: Date
}
```

## Endpoints de la API

### Autenticación (`/api/auth`)
- `POST /login` - Iniciar sesión
- `POST /register` - Registrar nuevo usuario
- `GET /me` - Obtener usuario actual

### Usuarios (`/api/users`)
- `GET /` - Obtener lista de todos los usuarios (Solo Admin)
- `GET /:id` - Obtener detalle de un usuario por ID (Solo Admin)

### Reclamos (`/api/incidents`)
- `GET /` - Obtener reclamos (Inquilino ve los suyos, Admin ve todos)
- `GET /stats` - Obtener estadísticas (Solo Admin)
- `GET /:id` - Obtener detalle de un reclamo
- `POST /` - Crear nuevo reclamo
- `PUT /:id` - Actualizar reclamo (Admin cambia estado, Inquilino edita datos)
- `DELETE /:id` - Eliminar reclamo

### Comentarios (`/api/incidents/:id/comments`)
- `GET /` - Obtener comentarios de un reclamo
- `POST /` - Agregar nuevo comentario

## Instalación y Configuración

### Requisitos Previos
- **Node.js**
- **MongoDB**
- **npm**

### Configuración del Backend

1. Navegar al directorio del backend e instalar dependencias:
```bash
cd backend
npm install
```

2. Crear un archivo `.env` en la carpeta backend:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/fixit
JWT_SECRET=palabra_secreta_segura
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Cargar datos de prueba (Opcional):
```bash
npm run seed
```

4. Iniciar el servidor backend:
```bash
npm start
```

La API correrá en `http://localhost:5000`

### Configuración del Frontend

1. Navegar al directorio del frontend e instalar dependencias:
```bash
cd frontend
npm install
```

2. Crear un archivo `.env` en la carpeta frontend:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Iniciar el cliente:
```bash
npm run dev
```

El frontend correrá en `http://localhost:3000`

## Guía de Uso

### Para Inquilinos

1. **Registrar una cuenta:** Crea una cuenta ingresando tu nombre, email, contraseña y número de departamento.
2. **Ingresar:** Accede al panel principal con tus credenciales.
3. **Reportar:** Haz clic en "Reportar Nuevo Reclamo" para describir problemas de mantenimiento.
4. **Seguimiento:** Visualiza todos tus reclamos enviados y su estado actual (Reportado, En Progreso, Resuelto).
5. **Ver detalles:** Haz clic en "Ver detalles" para leer las notas del administrador o dejar comentarios.

### Para Administradores

1. **Registrarse como Admin:** Crea una cuenta y selecciona "Administrador" en el desplegable de roles.
2. **Gestión:** Visualiza los reclamos de todos los inquilinos del edificio en un solo lugar.
3. **Filtrar:** Usa los filtros de Estado y Prioridad para organizar el trabajo.
4. **Actualizar estado:** Entra al detalle y cambia el estado a "En Progreso" o "Resuelto" según corresponda.
5. **Interactuar:** Usa la sección de comentarios para avisar a los inquilinos sobre novedades.

### Cuentas de Prueba (Seed)

Si ejecutaste el comando `npm run seed`, podes usar estas credenciales:

**Cuenta Inquilino:**
- **Email:** agustin@inquilino.com
- **Password:** user123
- **Rol:** Inquilino (Depto 11H)

**Cuenta Admin:**
- **Email:** admin@fixit.com
- **Password:** admin123
- **Rol:** Administrador

## Licencia

Este proyecto fue desarrollado como parte de una asignación académica para la materia "Aplicaciones Híbridas".

## Autor

**González Agustín** - Parcial 2.