import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [100, 'El título no puede exceder los 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
  },
  location: {
    type: String,
    required: [true, 'La ubicación es obligatoria'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['Baja', 'Media', 'Alta'],
    default: 'Media'
  },
  status: {
    type: String,
    enum: ['Reportado', 'En Progreso', 'Resuelto'],
    default: 'Reportado'
  },
  photo: {         // NOTA: Este campo queda como placeholder para la V2.0, 
    type: String,  // donde se integrará Multer/Cloudinary para subir archivos.
    default: null     
  },
  adminNotes: {
    type: String,
    default: '',
    maxlength: [300, 'Las notas del administrador no pueden exceder los 300 caracteres']
  },
  // Relación con el Usuario que creó el reclamo
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Relación con el Usuario que actualizó el reclamo (Admin)
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

// Índices para mejorar la velocidad de las búsquedas por estado, prioridad y creador
incidentSchema.index({ status: 1, priority: 1 });
incidentSchema.index({ createdBy: 1 });

export default mongoose.model('Incident', incidentSchema);