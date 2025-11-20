import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Incident from './src/models/Incident.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Conectado a MongoDB...');

    // Limpiamos la base de datos
    await User.deleteMany({});
    await Incident.deleteMany({});
    console.log('🗑️  Base de datos limpia.');

    // Crear usuario ADMIN
    const admin = await User.create({
      name: 'Administración',
      email: 'admin@fixit.com',
      password: 'admin123',
      role: 'Administrador',
      apartment: 'Oficina PB'
    });

    // Crear usuario INQUILINO
    const user1 = await User.create({
      name: 'Agustín González',
      email: 'agustin@inquilino.com',
      password: 'user123',
      role: 'Inquilino',
      apartment: '11H'
    });

    // Crear otro inquilino de relleno
    const user2 = await User.create({
      name: 'María Gómez',
      email: 'maria@inquilino.com',
      password: 'user123',
      role: 'Inquilino',
      apartment: '5A'
    });

    console.log('✔️  Usuarios creados correctamente.');

    // Crear reclamos de prueba
    const incidents = [
      {
        title: 'Ascensor trabado en piso 5',
        description: 'El ascensor principal hace ruido extraño y se trabó entre el 5to y 6to piso.',
        location: 'Ascensor Principal',
        priority: 'Alta',
        status: 'Reportado',
        createdBy: user1._id
      },
      {
        title: 'Filtración de agua en cochera',
        description: 'Hay una mancha de humedad que gotea sobre la cochera 12.',
        location: 'Subsuelo - Cochera 12',
        priority: 'Media',
        status: 'En Progreso',
        adminNotes: 'El plomero pasa mañana a las 9am.',
        createdBy: user2._id,
        updatedBy: admin._id
      },
      {
        title: 'Luz de pasillo quemada',
        description: 'Está muy oscuro al salir del ascensor.',
        location: 'Pasillo Piso 11',
        priority: 'Baja',
        status: 'Resuelto',
        adminNotes: 'Bombilla cambiada por LED.',
        createdBy: user1._id,
        updatedBy: admin._id
      },
      {
        title: 'Vidrio roto en el Gimnasio',
        description: 'Alguien golpeó la ventana del gimnasio y tiene una rajadura peligrosa.',
        location: 'SUM / Gimnasio',
        priority: 'Media',
        status: 'Reportado',
        createdBy: user2._id
      },
      {
        title: 'Portón automático no abre',
        description: 'El control remoto no funciona para abrir el portón de entrada.',
        location: 'Entrada Vehicular',
        priority: 'Alta',
        status: 'En Progreso',
        adminNotes: 'Técnico revisando el motor.',
        createdBy: user1._id,
        updatedBy: admin._id
      }
    ];

    await Incident.insertMany(incidents);
    console.log('✔️  Reclamos de prueba creados.');

    console.log('\n🔽 Carga de datos completada 🔽');
    console.log('\n🔓 Cuentas de prueba para ingresar:');
    console.log('👤 Admin:     admin@fixit.com       | admin123');
    console.log('👥 Inquilino: agustin@inquilino.com | user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar datos (Seed):', error);
    process.exit(1);
  }
};

seedDatabase();