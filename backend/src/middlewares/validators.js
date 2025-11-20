import { body, validationResult } from 'express-validator';

// Middleware para verificar si hubo errores en las validaciones anteriores
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si hay errores, respondemos con 400 y la lista de fallos
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validaciones para Registro
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Por favor ingrese un correo válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('apartment')
    .trim()
    .notEmpty().withMessage('El número de departamento es obligatorio')
];

// Validaciones para Login
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio')
    .isEmail().withMessage('Por favor ingrese un correo válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

// Validaciones para Crear/Editar Reclamo
export const incidentValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 3, max: 100 }).withMessage('El título debe tener entre 3 y 100 caracteres'),
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres'),
  body('location')
    .trim()
    .notEmpty().withMessage('La ubicación es obligatoria'),
  body('priority')
    .optional()
    .isIn(['Baja', 'Media', 'Alta']).withMessage('La prioridad debe ser Baja, Media o Alta')
];