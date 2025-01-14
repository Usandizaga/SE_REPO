import React, { useState, useEffect } from 'react'; // Asegúrate de importar useEffect

export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', comentario: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación personalizada
    if (!formData.nombre || !formData.comentario) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setComentarios((prevComentarios) => [
      ...prevComentarios,
      { ...formData, id: Date.now() },
    ]);
    setFormData({ nombre: '', comentario: '' });
    setError('');
  };

  useEffect(() => {
    if (error) {
      console.log('Error actualizado:', error);
    }
  }, [error]);

  return (
    <div className="comentarios">
      <h2>Deja tu comentario</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="comentario">Comentario:</label>
        <textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
        />
        <br />
        {/* Mostrar el mensaje de error si existe */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Enviar</button>
      </form>

      <h3>Comentarios:</h3>
      <ul>
        {comentarios.map((comentario) => (
          <li key={comentario.id}>
            <strong>{comentario.nombre}</strong>: {comentario.comentario}
          </li>
        ))}
      </ul>
    </div>
  );
}
