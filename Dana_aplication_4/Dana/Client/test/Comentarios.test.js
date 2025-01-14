import React from 'react'; // Asegúrate de importar React si es necesario
import { render, screen, fireEvent } from '@testing-library/react';
import Comentarios from 'C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Client/src/Comentarios.jsx'; // Asegúrate de que la ruta es correcta

// Definir la función sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Muestra un error si los campos están vacíos', async () => {
  render(<Comentarios />);

  // Enviar el formulario sin rellenar los campos
  fireEvent.click(screen.getByText('Enviar'));

  // Verificar que aparece el mensaje de error
  expect(await screen.findByText(/Por favor, completa todos los campos./)).toBeInTheDocument();
});



test('Añade un comentario válido a la lista', async () => {
  render(<Comentarios />);

  // Rellenar los campos
  fireEvent.change(screen.getByLabelText(/Nombre:/), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByLabelText(/Comentario:/), { target: { value: 'Este es mi comentario' } });

  // Enviar el formulario
  fireEvent.click(screen.getByText('Enviar'));

  // Esperar 2 segundos (2000 ms) antes de verificar el resultado
  await sleep(2000);

  // Verificar que el comentario se añadió a la lista
  expect(screen.getByText(/Este es mi comentario/)).toBeInTheDocument();
});



test('Verifica que el formulario se limpia después de enviar un comentario', async () => {
  render(<Comentarios />);

  // Rellenar los campos
  fireEvent.change(screen.getByLabelText(/Nombre:/), { target: { value: 'Juan' } });
  fireEvent.change(screen.getByLabelText(/Comentario:/), { target: { value: 'Este es mi comentario' } });

  // Enviar el formulario
  fireEvent.click(screen.getByText('Enviar'));

  // Verificar que los campos están vacíos después de enviar
  expect(screen.getByLabelText(/Nombre:/).value).toBe('');
  expect(screen.getByLabelText(/Comentario:/).value).toBe('');
});

test('Verifica que no se añade un comentario vacío', async () => {
  render(<Comentarios />);

  // Intentar enviar un comentario vacío
  fireEvent.click(screen.getByText('Enviar'));

  // Verificar que no se muestra el comentario
  expect(screen.queryByText('Juan: Este es mi comentario')).not.toBeInTheDocument();
});
