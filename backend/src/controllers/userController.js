import User from '../models/User.js';

// @desc    Obtener todos los usuarios registrados
// @route   GET /api/users
// @access  Privado (Solo Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    // Buscamos todos los usuarios pero excluimos la contraseña por seguridad
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Obtener un usuario específico por ID
// @route   GET /api/users/:id
// @access  Privado (Solo Admin)
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      res.status(404);
      throw new Error('Usuario no encontrado');
    }
    
    res.json(user);
  } catch (error) {
    next(error);
  }
};