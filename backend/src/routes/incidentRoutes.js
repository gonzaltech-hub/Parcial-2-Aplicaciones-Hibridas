import express from 'express';
import {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
  getStats
} from '../controllers/incidentController.js';
import { addComment, getCommentsByIncident } from '../controllers/commentController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { incidentValidation, validateRequest } from '../middlewares/validators.js';

const router = express.Router();

// --- Middleware de Protección Global ---
// Aplica la verificación de Token JWT a TODAS las rutas definidas abajo.
// Si no hay token válido, el usuario no pasa de aca.
router.use(protect);

// --- Rutas de Estadísticas (Solo Admin) ---
router.get('/stats', admin, getStats);

// --- Rutas de Reclamos (CRUD Principal) ---
router.post('/', incidentValidation, validateRequest, createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.put('/:id', updateIncident);
router.delete('/:id', deleteIncident);

// --- Rutas de Comentarios ---
// Gestión de comentarios dentro de un reclamo específico
router.post('/:id/comments', addComment);
router.get('/:id/comments', getCommentsByIncident);

export default router;