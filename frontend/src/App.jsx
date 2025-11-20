import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewIncident from './pages/NewIncident';
import IncidentDetail from './pages/IncidentDetail';

function App() {
  return (
    // El AuthProvider envuelve toda la app para compartir el estado del usuario
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          {/* El Navbar se muestra siempre, sin importar en qué ruta estemos */}
          <Navbar />
          
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rutas Privadas (Requieren estar logueado) */}
            {/* Usamos PrivateRoute para bloquear el acceso si no hay token */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/incidents/new"
              element={
                <PrivateRoute>
                  <NewIncident />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/incidents/:id"
              element={
                <PrivateRoute>
                  <IncidentDetail />
                </PrivateRoute>
              }
            />
            
            {/* Redirecciones: Si entran a la raíz o a una ruta desconocida, van al Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;