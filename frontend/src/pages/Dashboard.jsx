import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import incidentService from '../services/incidentService';
import IncidentList from '../components/IncidentList';
import './Dashboard.css';

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  // Estado para los filtros
  const [filter, setFilter] = useState({ status: '', priority: '' });
  
  const { user, isAdmin } = useAuth();

  // Cada vez que cambia un filtro, volvemos a pedir los datos al backend
  useEffect(() => {
    fetchIncidents();
  }, [filter]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const data = await incidentService.getAllIncidents(filter);
      setIncidents(data);
    } catch (error) {
      console.error('Error al cargar reclamos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  // Callback para recargar la lista si se borra un elemento
  const handleIncidentDeleted = () => {
    fetchIncidents();
  };

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>¡Hola, {user?.name}!</h1>
            <p className="subtitle">
              {isAdmin() ? 'Panel de Administración del Consorcio' : 'Tus reportes y estado del edificio'}
            </p>
          </div>
          <Link to="/incidents/new" className="btn btn-primary">
            Reportar Nuevo Reclamo
          </Link>
        </div>

        <div className="dashboard-filters card">
          <h3>Filtros de Búsqueda</h3>
          <div className="filters-grid">
            <div className="form-group">
              <label>Estado</label>
              <select name="status" value={filter.status} onChange={handleFilterChange}>
                <option value="">Todos los estados</option>
                <option value="Reportado">Reportado</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Resuelto">Resuelto</option>
              </select>
            </div>

            <div className="form-group">
              <label>Prioridad</label>
              <select name="priority" value={filter.priority} onChange={handleFilterChange}>
                <option value="">Todas las prioridades</option>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Cargando reclamos...</div>
          ) : (
            <IncidentList 
              incidents={incidents} 
              onIncidentDeleted={handleIncidentDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;