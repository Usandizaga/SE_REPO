const request = require('supertest');
const mongoose = require('mongoose');
const app = require('C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Server/index.js'); // Ruta al archivo de tu servidor

beforeAll(async () => {
  const mongoUri = 'mongodb://127.0.0.1:27017/testDB';
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API /api/formulario', () => {
  it('debería guardar un formulario exitosamente', async () => {
    const datosFormulario = {
      tipoAyuda: 'Comida',
      cantidad: 5,
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
  });

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

    expect(response.body.mensaje).toBe('Faltan datos requeridos');
  });
});