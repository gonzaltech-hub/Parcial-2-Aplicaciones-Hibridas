import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTools } from 'react-icons/fa';
import './Navbar.css';

  const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Al salir, redirigimos al login
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/dashboard" className="navbar-brand">
        <FaTools size={24} />
          FixIt
        </Link>

        {/* Solo mostramos el menú si hay un usuario logueado */}
        {user && (
          <div className="navbar-menu">
            <Link to="/dashboard" className="navbar-link">
              Panel Principal
            </Link>
            <Link to="/incidents/new" className="navbar-link">
              Nuevo Reclamo
            </Link>
            
            <div className="navbar-user">
              <span className="user-name">{user.name}</span>
              <span className={`user-role badge badge-${user.role}`}>
                {user.role}
              </span>
              
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;