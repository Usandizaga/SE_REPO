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

  const [formData, setFormData] = useState({
    tipoAyuda: '',
    cantidad: '' // Añadir 'cantidad' al estado
  });

  // Función para manejar el cambio en tipo de ayuda y cantidad
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData, respuestas); // Añadí respuestas para que también se guarden
  };

  return (
    <div>
      <h2>Bienvenido a la página de ayuda</h2>

      {preguntas.map((pregunta) => (
        <Cuestionario
          key={pregunta.id}
          pregunta={pregunta.pregunta}
          respuesta={respuestas[pregunta.id]}
          onChange={(value) => handleChange(pregunta.id, value)}
        />
      ))}

      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo de ayuda:
            <select
              name="tipoAyuda"
              value={formData.tipoAyuda}
              onChange={handleChange2}
              required
            >
              <option value="">Seleccionar...</option>
              <option value="alimentos">Alimentos</option>
              <option value="ropa">Ropa</option>
              <option value="dinero">Dinero</option>
              <option value="voluntariado">Voluntariado</option>
            </select>
          </label>
          <br />

          <label>
            Cantidad:
            <input
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange2} // Usamos el mismo manejador para tipo de ayuda y cantidad
              required
            />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>

      <h2 className='mapa'>Seleccione un punto en el mapa</h2>
      <img src="https://www.emprenemjunts.es/fotos/68583_foto.gif" alt="Mapa de Paiporta" />
    </div>
  );
};

export default Home;
