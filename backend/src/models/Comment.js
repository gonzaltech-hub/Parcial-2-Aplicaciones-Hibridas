import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'El contenido del comentario es obligatorio'] 
  },
  // Relación: Un comentario pertenece a un Incidente específico
  incident: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Incident', 
    required: true 
  },
  // Relación: Un comentario fue escrito por un Usuario
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('Comment', commentSchema);