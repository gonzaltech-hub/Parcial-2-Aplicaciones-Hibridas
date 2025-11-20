import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    apartment: '',
    role: 'Inquilino'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación del lado del cliente
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      // Si el registro sale bien, vamos directo al panel
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Únete a la comunidad de tu edificio</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nombre Completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              placeholder="Ej: Agustín González"
            />
          </div>

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                style={{ paddingRight: '40px', width: '100%' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: '1.2rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>Unidad / Departamento</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
              placeholder="Ej: 11H, PB..."
            />
          </div>

          <div className="form-group">
            <label>Tipo de Usuario</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Inquilino">Inquilino</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aca</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;