import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import incidentService from '../services/incidentService';
import './IncidentDetail.css';

const IncidentDetail = () => {
  const [incident, setIncident] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    status: '',
    adminNotes: ''
  });
  
  const { id } = useParams();
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIncidentData();
  }, [id]);

  const fetchIncidentData = async () => {
    try {
      // Cargamos Reclamo y Comentarios en paralelo
      const [incidentData, commentsData] = await Promise.all([
        incidentService.getIncidentById(id),
        incidentService.getComments(id)
      ]);

      setIncident(incidentData);
      setComments(commentsData);

      setFormData({
        status: incidentData.status,
        adminNotes: incidentData.adminNotes || ''
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // --- LÓGICA PARA ENVIAR COMENTARIO NUEVO ---
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await incidentService.addComment(id, newComment);
      setNewComment('');
      
      // Recargar solo los comentarios para ver el nuevo
      const updatedComments = await incidentService.getComments(id);
      setComments(updatedComments);
    } catch (error) {
      alert('No se pudo añadir el comentario.');
    }
  };

  // Lógica para que el admin actualice el estado
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await incidentService.updateIncident(id, formData);
      setEditing(false);
      fetchIncidentData();
    } catch (error) {
      alert('No se pudo actualizar el reclamo.');
    }
  };

  if (loading) {
    return <div className="loading">Cargando detalles...</div>;
  }

  if (!incident) {
    return <div className="loading">Reclamo no encontrado</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="incident-detail-page">
      <div className="container">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          ← Volver al Panel
        </button>

        <div className="incident-detail card">
          <div className="incident-detail-header">
            <div>
              <h1>{incident.title}</h1>
              <div className="badges">
                <span className={`badge badge-${incident.priority}`}>
                  {incident.priority}
                </span>
                <span className={`badge badge-${incident.status.replace(' ', '_')}`}>
                  {incident.status}
                </span>
              </div>
            </div>
          </div>

          <div className="incident-detail-content">
            <div className="detail-section">
              <h3>Descripción</h3>
              <p>{incident.description}</p>
            </div>
            <div className="detail-section">
              <h3>Información</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Ubicación:</span>
                  <span className="info-value">{incident.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Reportado por:</span>
                  <span className="info-value">
                    {incident.createdBy.name} (Depto {incident.createdBy.apartment})
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Creado:</span>
                  <span className="info-value">{formatDate(incident.createdAt)}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Última actualización:</span>
                  <span className="info-value">{formatDate(incident.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* --- ADMINISTRADOR --- */}
            {isAdmin() && (
              <div className="detail-section admin-section">
                <h3>Acciones del Administrador</h3>
                {!editing ? (
                  <div>
                    <button onClick={() => setEditing(true)} className="btn btn-primary">
                      Cambiar Estado
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleUpdate} className="admin-form">
                    <div className="form-group">
                      <label>Nuevo Estado</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <option value="Reportado">Reportado</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Resuelto">Resuelto</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="btn btn-secondary"
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* --- COMENTARIOS --- */}
            <div className="detail-section comments-section">
              <h3>Actividad y Comentarios</h3>
              
              {/* Lista de Comentarios */}
              <div className="comments-list" style={{ marginBottom: '20px' }}>
                {comments.length === 0 ? (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>Aún no hay comentarios.</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment._id} className="comment-item" style={{ 
                      background: '#f8f9fa', 
                      padding: '10px', 
                      borderRadius: '8px', 
                      marginBottom: '10px',
                      borderLeft: comment.author._id === user?._id ? '4px solid #007bff' : '4px solid #ccc'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555' }}>
                        <strong>{comment.author.name}</strong>
                        <span>{formatDate(comment.createdAt)}</span>
                      </div>
                      <p style={{ margin: '5px 0 0 0' }}>{comment.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Formulario para Agregar Comentario */}
              <form onSubmit={handleCommentSubmit} className="comment-form">
                <div className="form-group">
                  <textarea
                    className="form-control"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe una actualización o comentario..."
                    rows="3"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={!newComment.trim()}
                  style={{ marginTop: '10px' }}
                >
                  Publicar Comentario
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;