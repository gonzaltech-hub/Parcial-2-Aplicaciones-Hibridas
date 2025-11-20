import api from './api';

const incidentService = {
  // Obtener todos los reclamos aplicando filtros
  async getAllIncidents(filters = {}) {
    const params = new URLSearchParams();
    // Si vienen filtros, los agregamos a la URL
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    
    const response = await api.get(`/incidents?${params.toString()}`);
    return response.data;
  },

  // Obtener detalle de un reclamo por ID
  async getIncidentById(id) {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },

  // Crear un nuevo reclamo
  async createIncident(incidentData) {
    const response = await api.post('/incidents', incidentData);
    return response.data;
  },

  // Actualizar un reclamo existente
  async updateIncident(id, incidentData) {
    const response = await api.put(`/incidents/${id}`, incidentData);
    return response.data;
  },

  // Eliminar un reclamo
  async deleteIncident(id) {
    const response = await api.delete(`/incidents/${id}`);
    return response.data;
  },

  // Obtener estadísticas (Solo para administradores)
  async getStats() {
    const response = await api.get('/incidents/stats');
    return response.data;
  },

  // Métodos para Comentarios
  async addComment(incidentId, text) {
    const response = await api.post(`/incidents/${incidentId}/comments`, { text });
    return response.data;
  },

  async getComments(incidentId) {
    const response = await api.get(`/incidents/${incidentId}/comments`);
    return response.data;
  }
};

export default incidentService;