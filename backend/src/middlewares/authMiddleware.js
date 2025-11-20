import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware para proteger rutas privadas
// Verifica que la petición traiga un Token JWT válido
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Separamos la palabra "Bearer" del token real
      token = req.headers.authorization.split(' ')[1];

      // Verificamos la firma del token con nuestra clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscamos al usuario dueño del token y lo guardamos en req.user
      // (Excluimos la contraseña para no pasarla por seguridad)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Usuario no encontrado o eliminado' });
      }

      next();
    } catch (error) {
      console.error('Error en la verificación del token:', error.message);
      return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

// Middleware para acceso exclusivo de Administradores
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Administrador') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de Administrador.' });
  }
};