import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import incidentService from '../services/incidentService';
import './IncidentForm.css';

const NewIncident = () => {
  // Inicializamos el formulario.
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    priority: 'Media'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

    // Validaciones antes de enviar
    if (formData.title.length < 3) {
      setError('El título debe tener al menos 3 caracteres.');
      setLoading(false);
      return;
    }

    if (formData.description.length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.');
      setLoading(false);
      return;
    }

    try {
      await incidentService.createIncident(formData);
      // Si sale todo bien, volvemos al panel principal
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo crear el reclamo. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incident-form-page">
      <div className="container">
        <div className="form-container">
          <h1>Reportar Nuevo Reclamo</h1>
          <p className="subtitle">Describe el problema de mantenimiento que encontraste.</p>

          <form onSubmit={handleSubmit} className="incident-form card">
            <div className="form-group">
              <label>Título *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={100}
                placeholder="Ej: Ascensor averiado piso 7"
              />
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={500}
                rows={5}
                placeholder="Proporciona detalles del problema (dónde está, qué pasó, etc)..."
              />
            </div>

            <div className="form-group">
              <label>Ubicación *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Ej: Entrada principal, Pasillo..."
              />
            </div>

            <div className="form-group">
              <label>Prioridad</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Crear Reclamo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewIncident;