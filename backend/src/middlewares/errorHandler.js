// Middleware global para el manejo de errores
// Captura cualquier error lanzado con next(error) en los controladores
export const errorHandler = (err, req, res, next) => {
  // Si el status code es 200 (OK) pero llegó un error, lo forzamos a 500 (Error Interno)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // Solo mostramos la pila de llamadas si estamos en desarrollo.
    // En producción lo ocultamos.
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};