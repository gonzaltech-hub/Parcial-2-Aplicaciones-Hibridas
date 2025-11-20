import { Link } from 'react-router-dom';
import IncidentCard from './IncidentCard';
import './IncidentList.css';

const IncidentList = ({ incidents, onIncidentDeleted }) => {
  // Si la lista está vacía, mostramos un mensaje invitando a crear uno
  if (incidents.length === 0) {
    return (
      <div className="empty-state card">
        <h3>No se encontraron reclamos</h3>
        <p>No hay reclamos que coincidan con los filtros seleccionados.</p>
        <Link to="/incidents/new" className="btn btn-primary">
          Reportar el primer reclamo
        </Link>
      </div>
    );
  }

  // Si hay datos, recorremos el array y renderizamos una tarjeta por cada uno
  return (
    <div className="incident-list">
      {incidents.map((incident) => (
        <IncidentCard 
          key={incident._id} 
          incident={incident}
          onDeleted={onIncidentDeleted}
        />
      ))}
    </div>
  );
};

export default IncidentList;