import React, { useState } from 'react';

export default function Donar() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoAyuda: '',
    descripcion: '',
    cantidad: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí enviarás los datos a la base de datos (por ejemplo, con fetch o Axios)
    console.log('Formulario enviado:', formData);
    alert('Gracias por tu ayuda, hemos recibido tus datos.');
    setFormData({
      nombre: '',
      email: '',
      tipoAyuda: '',
      descripcion: '',
      cantidad: '',
    });
  };

  return (
    <div className="donar">
      <h1>Formulario de Donación</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Tipo de ayuda:
          <select
            name="tipoAyuda"
            value={formData.tipoAyuda}
            onChange={handleChange}
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
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Cantidad:
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}