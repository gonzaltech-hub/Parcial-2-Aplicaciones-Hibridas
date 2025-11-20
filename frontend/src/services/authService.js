import api from './api';

  const authService = {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Inicio de sesión
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener datos actualizados del usuario desde el backend
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Recuperar usuario guardado en localStorage
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  },

  // Verificar si hay una sesión activa
  isAuthenticated() {
    return !!this.getToken();
  }
};

export default authService;