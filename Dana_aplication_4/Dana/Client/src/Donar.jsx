import React, { useState } from 'react';

export const validarFormulario = (datos) => {
  const errores = {};

  if (!datos.nombre) errores.nombre = 'El nombre es obligatorio.';
  if (!datos.email) {
    errores.email = 'El email es obligatorio.';
  } else if (!/^(?=[a-zA-Z0-9@._-])([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(datos.email)) {
    errores.email = 'El email no es válido.';
  }
  if (!datos.tipoAyuda) errores.tipoAyuda = 'Debes seleccionar un tipo de ayuda.';
  if (!datos.cantidad || datos.cantidad <= 0)
    errores.cantidad = 'La cantidad debe ser mayor a 0.';
  if (!datos.ubicacion) errores.ubicacion = 'La ubicación es obligatoria.';

  return errores;
};

export default function Donar() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoAyuda: '',
    descripcion: '',
    cantidad: '',
    ubicacion: '',
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario(formData);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      // Enviar los datos del formulario al backend
      const response = await fetch('/api/donacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Mensaje de éxito
      alert('Gracias por tu ayuda, hemos recibido tus datos.');

      // Limpiar el formulario
      setFormData({
        nombre: '',
        email: '',
        tipoAyuda: '',
        descripcion: '',
        cantidad: '',
        ubicacion: '',
      });
      setErrores({});
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('Hubo un error al enviar tus datos. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="donar">
      <h1 className="formula-donacion">Formulario de Donación</h1>
      <form className="datos" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}
        <br />
        
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errores.email && <p className="error">{errores.email}</p>}
        <br />
        
        <label htmlFor="tipoAyuda">Tipo de ayuda:</label>
        <select
          id="tipoAyuda"
          name="tipoAyuda"
          value={formData.tipoAyuda}
          onChange={handleChange}
        >
          <option value="">Seleccionar...</option>
          <option value="alimentos">Alimentos</option>
          <option value="ropa">Ropa</option>
          <option value="dinero">Dinero</option>
          <option value="voluntariado">Voluntariado</option>
        </select>
        {errores.tipoAyuda && <p className="error">{errores.tipoAyuda}</p>}
        <br />
        
        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <br />
        
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          id="cantidad"
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
        />
        {errores.cantidad && <p className="error">{errores.cantidad}</p>}
        <br />
        
        <label htmlFor="ubicacion">Ubicación:</label>
        <input
          id="ubicacion"
          type="text"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
    
        />
        {errores.ubicacion && <p className="error">{errores.ubicacion}</p>}
        <br />
        
        <button type="submit">Enviarr</button>
      </form>
    </div>
  );
}