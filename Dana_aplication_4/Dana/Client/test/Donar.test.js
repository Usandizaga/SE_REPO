import React from 'react';  // Agrega esto si aún no está
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormularioDonacion from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Donar.jsx'; // Cambia esto al nombre de tu componente

test('debería limpiar los errores al ingresar datos válidos', async () => {
  render(<FormularioDonacion />);

  // Intenta enviar el formulario sin rellenar campos
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));


  // Rellena los campos del formulario con datos válidos
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan.perez@example.com' } });
  fireEvent.change(screen.getByLabelText(/Tipo de ayuda/i), { target: { value: 'ropa' } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Ciudad' } });

  // Vuelve a intentar enviar el formulario
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

  // Verifica que los mensajes de error desaparecieron
  await waitFor(() => {
    expect(screen.queryByText(/El nombre es obligatorio./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/El email es obligatorio./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Debes seleccionar un tipo de ayuda./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/La cantidad debe ser mayor a 0./i)).not.toBeInTheDocument();
  });
});