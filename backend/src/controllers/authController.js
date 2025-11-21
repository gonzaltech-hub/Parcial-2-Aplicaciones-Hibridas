import authService from '../services/authService.js';

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Público
export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    // 201 Created: Indica que el recurso se creó con éxito
    res.status(201).json(result);
  } catch (error) {
    // Si falla (ej: email duplicado), pasamos el error al middleware
    res.status(400);
    next(error);
  }
};

// @desc    Autenticar usuario y obtener token
// @route   POST /api/auth/login
// @access  Público
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401);
    next(error);
  }
};

// @desc    Obtener datos del usuario actual (Perfil)
// @route   GET /api/auth/me
// @access  Privado
export const getCurrentUser = async (req, res, next) => {
  try {
    // req.user viene del middleware de autenticación
    const user = await authService.getCurrentUser(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(404);
    next(error);
  }
};