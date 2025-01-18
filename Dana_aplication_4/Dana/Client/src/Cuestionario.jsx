import React from 'react';
import PropTypes from 'prop-types';

export function Cuestionario({ pregunta, respuesta, onChange }) {
  return (
    <div className="cuestionario">
      <label>
        {pregunta}
        <textarea
          value={respuesta}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe tu respuesta aquí..."
        />
      </label>
    </div>
  );
}

// Validación de props con PropTypes
Cuestionario.propTypes = {
  pregunta: PropTypes.string.isRequired, // `pregunta` debe ser una cadena y es obligatorio
  respuesta: PropTypes.string.isRequired, // `respuesta` debe ser una cadena y es obligatorio
  onChange: PropTypes.func.isRequired, // `onChange` debe ser una función y es obligatorio
};

export default Cuestionario;