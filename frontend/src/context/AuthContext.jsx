import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Creamos el contexto para compartir el estado del usuario en toda la app
const AuthContext = createContext();

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la página, revisamos si ya había un usuario guardado en el navegador
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Función de Login
  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
  const data = await authService.register(userData);

  return data;
  };

  // Función de Salir: Limpia el estado y el almacenamiento local
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Función auxiliar para saber si es Admin
  const isAdmin = () => {
    return user?.role === 'Administrador';
  };

  // Valores que exponemos a toda la aplicación
  const value = {
    user,
    login,
    register,
    logout,
    isAdmin,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};