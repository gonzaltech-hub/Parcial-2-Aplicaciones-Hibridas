import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Mientras verificamos si el token es válido, mostramos un texto de espera
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Si terminó de cargar y no hay usuario, lo mandamos directo al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta es exclusiva para admins y el usuario NO es 'Administrador'
  if (adminOnly && user.role !== 'Administrador') {
    // Lo rebotamos al Dashboard principal
    return <Navigate to="/dashboard" replace />;
  }

  // Si pasó todas las barreras de seguridad, mostramos la página solicitada
  return children;
};

export default PrivateRoute;