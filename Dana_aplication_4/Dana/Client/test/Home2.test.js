import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Home.jsx';
import fetchMock from 'jest-fetch-mock';
import { waitFor } from '@testing-library/react';

fetchMock.enableMocks();

beforeAll(() => {
  global.alert = jest.fn();  // Mockear alert
  fetchMock.enableMocks();    // Habilitar el mock de fetch
});

// Test para cuando la respuesta de la API es exitosa
test('debería enviar el formulario correctamente', async () => {
  // Simular una respuesta exitosa de la API con JSON válido
  fetchMock.mockResponseOnce(
    JSON.stringify({ mensaje: 'Formulario guardado exitosamente' })
  );

  render(<Home />);

  fireEvent.change(screen.getByLabelText(/Tipo de ayuda/i), { target: { value: 'alimentos' } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Prueba' } });
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));

  // Verificar que fetch fue llamado con los parámetros correctos
  expect(fetchMock).toHaveBeenCalledWith(
    '/api/formulario',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        tipoAyuda: 'alimentos',
        cantidad: 5,
        respuestas: { 1: '', 2: '', 3: '', 4: '' },
        ubicacion: 'Prueba',
      }),
    })
  );

  // Esperar y verificar que la alerta de éxito se haya llamado
  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Datos guardados exitosamente: Formulario guardado exitosamente');
  });
});

// Test para cuando ocurre un error al enviar el formulario
test('debería mostrar un error si el formulario no se envía correctamente', async () => {
  // Simular un error en la respuesta de la API con un código 500
  fetchMock.mockResponseOnce(
    JSON.stringify({ error: 'Error al conectar con el servidor' }), 
    { status: 500 }
  );

  render(<Home />);

  fireEvent.change(screen.getByLabelText(/Tipo de ayuda/i), { target: { value: 'alimentos' } });
  fireEvent.change(screen.getByLabelText(/Cantidad/i), { target: { value: '5' } });
  fireEvent.change(screen.getByLabelText(/Ubicación/i), { target: { value: 'Prueba' } });
  fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));


});

beforeEach(() => {
  fetchMock.resetMocks(); // Restablecer mocks antes de cada test
});
