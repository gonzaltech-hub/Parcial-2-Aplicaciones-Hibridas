import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import incidentService from '../services/incidentService';
import './IncidentCard.css';

const IncidentCard = ({ incident, onDeleted }) => {
  const { user } = useAuth();
  
  // Permiso para borrar: Admin o el dueño del incidente
  const canDelete = user?.role === 'Administrador' || incident.createdBy._id === user?.id;

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que querés eliminar este reclamo?')) {
      try {
        await incidentService.deleteIncident(incident._id);
        onDeleted();
      } catch (error) {
        alert('Error al eliminar el reclamo.');
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="incident-card card">
      <div className="incident-header">
        <div className="badges">
          <span className={`badge badge-${incident.priority}`}>
            {incident.priority}
          </span>
          <span className={`badge badge-${incident.status.replace(' ', '_')}`}>
            {incident.status}
          </span>
        </div>
      </div>

      <h3 className="incident-title">{incident.title}</h3>
      <p className="incident-description">{incident.description}</p>

      <div className="incident-details">
        <div className="detail-item">
          <span className="detail-label">Ubicación:</span>
          <span className="detail-value">{incident.location}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Reportado por:</span>
          <span className="detail-value">
            {incident.createdBy.name} ({incident.createdBy.apartment})
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Fecha:</span>
          <span className="detail-value">{formatDate(incident.createdAt)}</span>
        </div>
      </div>

      {incident.adminNotes && (
        <div className="admin-notes">
          <strong>Notas del administrador:</strong>
          <p>{incident.adminNotes}</p>
        </div>
      )}

      <div className="incident-actions">
        <Link to={`/incidents/${incident._id}`} className="btn btn-secondary btn-sm">
          Ver detalles
        </Link>
        
        {canDelete && (
          <button onClick={handleDelete} className="btn btn-danger btn-sm">
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default IncidentCard;