import React from 'react';  // Agrega esto si aún no está
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormularioDonacion from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Donar.jsx'; // Cambia esto al nombre de tu componente

beforeAll(() => {
  // Mock de window.alert para evitar que se muestre una ventana emergente durante las pruebas
  global.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();  // Limpiar mocks después de cada prueba
});

test('debería mostrar un mensaje de error si la solicitud de envío falla', async () => {
  // Mock de fetch para simular un error en la solicitud
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Error al enviar los datos' }),
    })
  );

  render(<FormularioDonacion />);

  // Rellena los campos con datos válidos
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan.perez@example.com' } });
  fireEvent.change(screen.getByLabelText(/Tipo de ayuda/i), { target: { value: 'ropa' } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Ciudad' } });

  // Intenta enviar el formulario
  fireEvent.click(screen.getByRole('button', { name: /Enviarr/i }));

  // Verifica que se muestra el mensaje de error adecuado
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Hubo un error al enviar tus datos. Por favor, intenta nuevamente.');
  });
});



test('debería limpiar los errores al ingresar datos válidos', async () => {
  // Mock de fetch para simular una respuesta exitosa
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: 'Datos recibidos correctamente' }),
    })
  );

  render(<FormularioDonacion />);

  // Rellena los campos con datos válidos
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'juan.perez@example.com' } });
  fireEvent.change(screen.getByLabelText(/Tipo de ayuda/i), { target: { value: 'ropa' } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Ciudad' } });
  fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Ayuda con ropa para personas necesitadas' } });

  // Intenta enviar el formulario
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i })); // Corrige el nombre

  // Verifica que se muestra la alerta de éxito
  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith('Gracias por tu ayuda, hemos recibido tus datos.');
  });

 
  // Verifica que los campos del formulario han sido limpiados
  expect(screen.getByLabelText(/Nombre/i).value).toBe('');
  expect(screen.getByLabelText(/Email/i).value).toBe('');
  expect(screen.getByLabelText(/Tipo de ayuda/i).value).toBe('');
  expect(screen.getByLabelText(/Cantidad/i).value).toBe('');
  expect(screen.getByLabelText(/Ubicación/i).value).toBe('');
  expect(screen.getByLabelText(/Descripción/i).value).toBe('');
});

test('debería mostrar errores de validación si faltan campos obligatorios', () => {
  render(<FormularioDonacion />);

  // Intenta enviar el formulario con campos vacíos
  fireEvent.click(screen.getByRole('button', { name: /Enviarr/i }));

  // Verifica que se muestran los mensajes de error de validación
  expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();
  expect(screen.getByText('El email es obligatorio.')).toBeInTheDocument();
  expect(screen.getByText('Debes seleccionar un tipo de ayuda.')).toBeInTheDocument();
  expect(screen.getByText('La cantidad debe ser mayor a 0.')).toBeInTheDocument();
  expect(screen.getByText('La ubicación es obligatoria.')).toBeInTheDocument();
});

test('debería limpiar los errores cuando se corrigen los campos', () => {
  render(<FormularioDonacion />);

  // Intenta enviar el formulario con campos vacíos
  fireEvent.click(screen.getByRole('button', { name: /Enviarr/i }));

  // Verifica que los mensajes de error están presentes
  expect(screen.getByText('El nombre es obligatorio.')).toBeInTheDocument();

  // Corrige un campo
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan Pérez' } });

});