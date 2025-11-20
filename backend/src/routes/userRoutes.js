import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// --- Protección Global de Rutas ---
// protect: El usuario debe tener un Token válido.
// admin: El usuario debe tener el rol 'Administrador'.
router.use(protect);
router.use(admin);

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;