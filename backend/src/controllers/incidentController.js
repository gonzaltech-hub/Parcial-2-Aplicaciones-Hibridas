import incidentService from '../services/incidentService.js';

// @desc    Crear un nuevo reclamo
// @route   POST /api/incidents
// @access  Privado
export const createIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.createIncident(req.body, req.user._id);
    res.status(201).json(incident);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// @desc    Obtener todos los reclamos (con filtros)
// @route   GET /api/incidents
// @access  Privado (Inquilino ve los suyos, Admin ve todos)
export const getIncidents = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (priority) filters.priority = priority;

    const incidents = await incidentService.getAllIncidents(
      filters,
      req.user.role,
      req.user._id
    );
    
    res.json(incidents);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// @desc    Obtener un reclamo por ID
// @route   GET /api/incidents/:id
// @access  Privado
export const getIncidentById = async (req, res, next) => {
  try {
    const incident = await incidentService.getIncidentById(
      req.params.id,
      req.user.role,
      req.user._id
    );
    res.json(incident);
  } catch (error) {
    // Si el servicio dice que no existe, devolvemos 404. Si es otro error, 403.
    res.status(error.message === 'Reclamo no encontrado' ? 404 : 403);
    next(error);
  }
};

// @desc    Actualizar un reclamo
// @route   PUT /api/incidents/:id
// @access  Privado
export const updateIncident = async (req, res, next) => {
  try {
    const incident = await incidentService.updateIncident(
      req.params.id,
      req.body,
      req.user.role,
      req.user._id
    );
    res.json(incident);
  } catch (error) {
    res.status(error.message === 'Reclamo no encontrado' ? 404 : 403);
    next(error);
  }
};

// @desc    Eliminar un reclamo
// @route   DELETE /api/incidents/:id
// @access  Privado (Admin o Dueño)
export const deleteIncident = async (req, res, next) => {
  try {
    const result = await incidentService.deleteIncident(
      req.params.id,
      req.user.role,
      req.user._id
    );
    res.json(result);
  } catch (error) {
    res.status(error.message === 'Reclamo no encontrado' ? 404 : 403);
    next(error);
  }
};

// @desc    Obtener estadísticas
// @route   GET /api/incidents/stats
// @access  Privado (Admin)
export const getStats = async (req, res, next) => {
  try {
    const stats = await incidentService.getIncidentStats();
    res.json(stats);
  } catch (error) {
    res.status(500);
    next(error);
  }
};