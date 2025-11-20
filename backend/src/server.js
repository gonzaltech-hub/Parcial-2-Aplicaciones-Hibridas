import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la Base de Datos
connectDB();

// --- Middlewares Globales ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Definición de Rutas ---
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/users', userRoutes);

// Endpoint de prueba (Health check) para ver si la API responde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'La API de FixIt está funcionando correctamente' });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});