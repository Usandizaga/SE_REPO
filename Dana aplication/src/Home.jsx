import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cuestionario from './Cuestionario';

const Home = () => {

  const preguntas = [
    { id: 1, pregunta: '¿Qué necesidades tienes?' },
    { id: 2, pregunta: '¿En qué área necesitas ayuda?' },
    { id: 3, pregunta: '¿Cuántas personas necesitan asistencia?' },
    { id: 4, pregunta: '¿Tienes algún tipo de discapacidad que debamos considerar?' },
  ];


 // Estado para almacenar las respuestas
 const [respuestas, setRespuestas] = useState(
  preguntas.reduce((acc, pregunta) => {
    acc[pregunta.id] = ''; // Inicializa cada respuesta vacía
    return acc;
  }, {})
);

  // Función para manejar el cambio de respuesta
  const handleChange = (id, value) => {
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [id]: value,
    }));
  };


// Componente para manejar el clic en el mapa y actualizar la ubicación
function MapaInteractiv() {
  useMapEvents({
    click(e) {
      // Al hacer clic en el mapa, actualizamos la ubicación
      setUbicacion({
        lat: e.latlng.lat,
        lon: e.latlng.lng,
      });
    },
  });

  return (
    <Marker position={[ubicacion.lat, ubicacion.lon]}>
      <Popup>
        <span>Punto de ayuda seleccionado: {ubicacion.lat}, {ubicacion.lon}</span>
      </Popup>
    </Marker>
  );
}

  return (
    <div > 
      <h2>Bienvenido a la página de ayuda</h2>
   
      {preguntas.map((pregunta) => (
        <Cuestionario key={pregunta.id} pregunta={pregunta.pregunta} respuesta={respuestas[pregunta.id]}onChange={(value) => handleChange(pregunta.id, value)}/>
      ))}

      <Link to="/donar">
        <button style={{ marginTop: '20px' }}>Ir a Donar</button>
      </Link>

      <h2>Seleccione un punto en el mapa</h2>
    </div>
  );
};



export default Home;
