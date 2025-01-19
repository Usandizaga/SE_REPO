const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/index'); // Importa tu aplicación sin la llamada a `listen`

// Establecer un tiempo de espera global más largo para las pruebas
jest.setTimeout(10000); // 10 segundos

beforeAll(async () => {
  // Desconecta cualquier conexión activa antes de abrir una nueva
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  // Conéctate a la base de datos de prueba
  const uri = 'mongodb://localhost:27017/mi_base_de_datos_test'; // Usa la URI correcta
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Asegúrate de que la conexión está activa antes de intentar limpiar la base de datos
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase(); // Limpia la base de datos
    await mongoose.disconnect(); // Desconecta de la base de datos
  }
});

describe('POST /api/formulario', () => {
  it('debería guardar un formulario y devolver un mensaje de éxito', async () => {
    const response = await request(app)
      .post('/api/formulario')
      .send({
        tipoAyuda: 'Donación',
        cantidadNecesaria: 1000,
        ubicacion: 'Ciudad X',
        descripcion: 'Descripción de la ayuda',
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Formulario guardado con éxito');
  });

  it('debería devolver un error si faltan datos requeridos', async () => {
    const response = await request(app)
      .post('/api/formulario')
      .send({
        tipoAyuda: 'Donación',
        ubicacion: 'Ciudad X',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Faltan datos requeridos');
  });

  it('debería manejar errores de base de datos', async () => {
    // Simula un error de base de datos
    const response = await request(app)
      .post('/api/formulario')
      .send({
        tipoAyuda: 'Donación',
        cantidadNecesaria: -1, // Esto podría causar un error en la base de datos
        ubicacion: 'Ciudad X',
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Error al guardar formulario');
  });
});

describe('POST /api/donacion', () => {
  it('debería guardar una donación correctamente', async () => {
    const response = await request(app)
      .post('/api/donacion')
      .send({
        monto: 500,
        tipo: 'Efectivo',
        descripcion: 'Descripción de la donación',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Donación guardada con éxito');
  });

  it('debería devolver un error 500 si falla al guardar la donación', async () => {
    const response = await request(app)
      .post('/api/donacion')
      .send({
        monto: -1, // Esto podría causar un error de validación o base de datos
        tipo: 'Efectivo',
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Error al guardar donación');
  });
});
