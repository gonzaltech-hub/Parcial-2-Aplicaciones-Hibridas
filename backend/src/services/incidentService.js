import Incident from '../models/Incident.js';

class IncidentService {
  async createIncident(incidentData, userId) {
    const incident = await Incident.create({
      ...incidentData,
      createdBy: userId
    });

    return await incident.populate('createdBy', 'name email apartment');
  }

  async getAllIncidents(filters = {}, userRole, userId) {
    let query = {};

    if (userRole === 'Inquilino') {
      query.createdBy = userId;
    }

    // Filtros opcionales
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;

    const incidents = await Incident.find(query)
      .populate('createdBy', 'name email apartment')
      .populate('updatedBy', 'name email')
      .sort({ createdAt: -1 });

    return incidents;
  }

  async getIncidentById(incidentId, userRole, userId) {
    const incident = await Incident.findById(incidentId)
      .populate('createdBy', 'name email apartment')
      .populate('updatedBy', 'name email');

    if (!incident) {
      throw new Error('Reclamo no encontrado');
    }

    // Verificación de seguridad: Inquilino solo ve lo suyo
    if (userRole === 'Inquilino' && incident.createdBy._id.toString() !== userId.toString()) {
      throw new Error('No tienes permiso para ver este reclamo');
    }

    return incident;
  }

  async updateIncident(incidentId, updateData, userRole, userId) {
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      throw new Error('Reclamo no encontrado');
    }

    // Verificación de permisos
    if (userRole === 'Inquilino' && incident.createdBy.toString() !== userId.toString()) {
      throw new Error('No tienes permiso para editar este reclamo');
    }

    // Lógica de actualización según rol
    if (userRole === 'Inquilino') {
      // Inquilino solo puede actualizar datos básicos
      const { title, description, location, priority } = updateData;
      incident.title = title || incident.title;
      incident.description = description || incident.description;
      incident.location = location || incident.location;
      incident.priority = priority || incident.priority;
    } else {
      // Admin puede actualizar todo (incluyendo estado y notas)
      Object.assign(incident, updateData);
      incident.updatedBy = userId;
    }

    await incident.save();
    return await Incident.findById(incidentId)
    .populate('createdBy', 'name email apartment')
    .populate('updatedBy', 'name email');
  }

  async deleteIncident(incidentId, userRole, userId) {
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      throw new Error('Reclamo no encontrado');
    }

    // Solo el creador o admin pueden eliminar
    if (userRole === 'Inquilino' && incident.createdBy.toString() !== userId.toString()) {
      throw new Error('No tienes permiso para eliminar este reclamo');
    }

    await incident.deleteOne();
    return { message: 'Reclamo eliminado correctamente' };
  }

  async getIncidentStats() {
    // Agrupamos por estado
    const stats = await Incident.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Agrupamos por prioridad
    const priorityStats = await Incident.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    return {
      byStatus: stats,
      byPriority: priorityStats,
      total: await Incident.countDocuments()
    };
  }
}

export default new IncidentService();