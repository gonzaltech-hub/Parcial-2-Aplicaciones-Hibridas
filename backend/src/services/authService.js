import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthService {
  // Generar Token JWT que expira según lo configurado en .env
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  }

  async register(userData) {
    const { name, email, password, apartment, role } = userData;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Ya existe un usuario registrado con este correo electrónico');
    }

    // Crear usuario en la base de datos
    const user = await User.create({
      name,
      email,
      password,
      apartment,
      role: role || 'Inquilino'
    });

    // Generamos el token para que quede logueado
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        apartment: user.apartment
      },
      token
    };
  }

  async login(email, password) {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña usando el método del modelo
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        apartment: user.apartment
      },
      token
    };
  }

  async getCurrentUser(userId) {
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  }
}

export default new AuthService();