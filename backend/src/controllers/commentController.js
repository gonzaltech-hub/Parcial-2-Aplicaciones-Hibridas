import Comment from '../models/Comment.js';

// @desc    Agregar un nuevo comentario a un reclamo
// @route   POST /api/incidents/:id/comments
// @access  Privado (Cualquier usuario logueado)
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: incidentId } = req.params;

    const comment = await Comment.create({
      text,
      incident: incidentId,
      author: req.user._id
    });

    // Poblamos los datos del autor (nombre/email) para que el Frontend
    // pueda mostrar "Juan Pérez" inmediatamente sin recargar la página
    await comment.populate('author', 'name email');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtener todos los comentarios de un reclamo específico
// @route   GET /api/incidents/:id/comments
// @access  Privado
export const getCommentsByIncident = async (req, res) => {
  try {
    const { id: incidentId } = req.params;
    
    const comments = await Comment.find({ incident: incidentId })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};