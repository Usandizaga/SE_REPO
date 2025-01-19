import React, { useState } from 'react';
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../Server/test/index.test.js'); // Ruta al archivo de tu servidor
import { render, fireEvent } from '@testing-library/react';
import Home from '../src/Home.jsx';
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

beforeAll(async () => {
  // Usamos process.env.MONGO_URI para obtener la URI de MongoDB Atlas
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testDB'; // Si no está definida, usa la local por defecto
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API /api/formulario', () => {
  /*
  it('debería guardar un formulario exitosamente', async () => {
    const datosFormulario = {
      tipoAyuda: 'Comida',
      cantidad: 13,
      ubicacion: 'Lugar de prueba', // Asegúrate de incluir el campo 'ubicacion'
      respuestas: { pregunta1: 'respuesta1', pregunta2: 'respuesta2' },
    };

    const response = await request(app)
      .post('/api/formulario')
      .send(datosFormulario)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body.mensaje).toBe('Formulario guardado exitosamente');
    expect(response.body.resultado).toHaveProperty('_id');
  });*/
/*
  it('debería retornar un error si faltan datos requeridos', async () => {
    const datosFormularioIncompletos = {
      tipoAyuda: 'Comida',
      cantidad: 5,
      // Falta el campo 'ubicacion', que es obligatorio
    };

    const response = await request(app)
      .post('/api/formulario')
      .send(datosFormularioIncompletos)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.mensaje).toBe('Datos no válidos');
  });*/
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
