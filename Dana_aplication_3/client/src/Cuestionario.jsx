import React from 'react';

export function Cuestionario ({pregunta, respuesta, onChange}) {
  
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

export default Cuestionario;