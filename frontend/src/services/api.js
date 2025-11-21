import axios from 'axios';

// Creamos una instancia de Axios configurada
const api = axios.create({
  // Usamos la variable de entorno o la IP directa como respaldo
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api'
});

// Interceptor de Solicitud:
// Se ejecuta antes de enviar cualquier petición al backend.
// Inyectamos el token JWT automáticamente en los headers si el usuario está logueado.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de Respuesta:
// Monitorea las respuestas del servidor. Si recibimos un error 401 (No Autorizado),
// significa que el token venció o es inválido, asique cerramos la sesión de manera forzada.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirección forzada al login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;