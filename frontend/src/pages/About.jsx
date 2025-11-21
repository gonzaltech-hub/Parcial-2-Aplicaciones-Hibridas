import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
    const navigate = useNavigate();
    
    const description = `FixIt proporciona una solución digital para la gestión del mantenimiento de edificios. Los inquilinos pueden reportar fácilmente incidentes como ascensores averiados, problemas de iluminación o plomería. Los administradores del edificio pueden monitorear todos los incidentes reportados, actualizar su estado y agregar notas sobre el proceso de resolución.`;

    return (
        <div className="about-page">
            <div className="container">
                <button 
                    onClick={() => navigate('/login')} 
                    className="back-btn" 
                    style={{ marginBottom: '20px', display: 'block' }}
                >
                    ← Volver a Iniciar Sesión
                </button>
                <div className="about-card">
                    <h1>Acerca de FixIt</h1>
                    <p>{description}</p>
                    <h3>Características Clave:</h3>
                    <ul>
                        <li>Autenticación y Autorización: Usuarios con roles específicos (Inquilino y Administrador).</li>
                        <li>Reporte Sencillo: Los inquilinos pueden crear nuevos reclamos rápidamente.</li>
                        <li>Gestión de Estado: Permite a los administradores actualizar el progreso (Abierto, En Proceso, Cerrado).</li>
                        <li>Seguimiento y Comentarios: Visibilidad total sobre el avance de cada incidente.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;