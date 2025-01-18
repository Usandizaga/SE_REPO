import React from 'react';  // Añade esta línea
import { render, screen, fireEvent } from '@testing-library/react';
import Cuestionario from '../src/Cuestionario.jsx';

describe('Cuestionario', () => {
  test('debería mostrar la pregunta y permitir al usuario escribir una respuesta', () => {
    const pregunta = '¿Qué necesidades tienes?';
    const respuesta = '';
    const mockOnChange = jest.fn();

    render(<Cuestionario pregunta={pregunta} respuesta={respuesta} onChange={mockOnChange} />);

    // Verifica que la pregunta se muestra correctamente
    expect(screen.getByText(pregunta)).toBeInTheDocument();

    // Verifica que el textarea esté vacío inicialmente
    const textarea = screen.getByPlaceholderText('Escribe tu respuesta aquí...');
    expect(textarea.value).toBe('');

    // Simula un cambio de respuesta
    fireEvent.change(textarea, { target: { value: 'Necesito ayuda con alimentos' } });

    // Verifica que el mockOnChange se llame con el valor correcto
    expect(mockOnChange).toHaveBeenCalledWith('Necesito ayuda con alimentos');
  });
});
