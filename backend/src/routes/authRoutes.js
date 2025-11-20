import express from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { registerValidation, loginValidation, validateRequest } from '../middlewares/validators.js';

const router = express.Router();

// --- Rutas Públicas de Autenticación ---
router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

// --- Rutas Privadas ---
router.get('/me', protect, getCurrentUser);

export default router;