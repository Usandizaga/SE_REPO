import React, { useState } from 'react';
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Server/test/index.test.js'); // Ruta al archivo de tu servidor
import { render, fireEvent } from '@testing-library/react';
import Home from '../src/Home.jsx';
require('dotenv').config(); // Asegúrate de cargar las variables de entorno
const mongoUri = 'mongodb+srv://Andoni:Alik1525.@cluster-web.feh2j.mongodb.net/?retryWrites=true&w=majority';

beforeAll(async () => {
  // Usamos process.env.MONGO_URI para obtener la URI de MongoDB Atlas
  //const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testDB'; // Si no está definida, usa la local por defecto
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API /api/formulario', () => {
  
});

describe('Componente Home', () => {
  test('debería actualizar las respuestas cuando se cambia una entrada', () => {
    const { getByLabelText } = render(<Home />);

    // Encuentra el input correspondiente a la primera pregunta
    const inputPregunta1 = getByLabelText('¿Qué necesidades tienes?');

    // Simula un cambio en el input
    fireEvent.change(inputPregunta1, { target: { value: 'Necesito comida' } });

    // Verifica que el estado se haya actualizado correctamente
    expect(inputPregunta1.value).toBe('Necesito comida');
  });

  test('debería manejar errores de conexión al enviar el formulario', async () => {
    // Espía las funciones `console.error` y `alert`
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Simula un fallo en `fetch`
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Error al conectar con el servidor'))
    );

    const { getByText, getByLabelText } = render(<Home />);

    // Completa el formulario
    fireEvent.change(getByLabelText('Tipo de ayuda:'), { target: { value: 'alimentos' } });
    fireEvent.change(getByLabelText('Cantidad:'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Ubicación:'), { target: { value: 'Madrid' } });

    // Envía el formulario
    fireEvent.click(getByText('Enviar'));

    // Limpia los mocks
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
    global.fetch.mockRestore();
  });

  test('debería llamar a handleChange cuando se cambia una respuesta en el cuestionario', () => {
    const { getByLabelText } = render(<Home />);

    // Encuentra el input correspondiente a una pregunta
    const inputPregunta2 = getByLabelText('¿En qué área necesitas ayuda?');

    // Simula un cambio
    fireEvent.change(inputPregunta2, { target: { value: 'Educación' } });

    // Verifica que el estado del input se haya actualizado
    expect(inputPregunta2.value).toBe('Educación');
  });
});
