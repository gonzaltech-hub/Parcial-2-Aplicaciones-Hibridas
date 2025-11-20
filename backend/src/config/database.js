import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Intentamos conectar usando la URI definida en el .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error de conexión: ${error.message}`);
    
    // Si falla la conexión, detenemos el servidor
    process.exit(1);
  }
};

export default connectDB;