const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index.js'); // Importa solo la app sin la llamada a `listen`

// URI para la base de datos de pruebas
const dbURI = 'mongodb://127.0.0.1:27017/ayudaDB_test';

beforeAll(async () => {
  // Cierra cualquier conexión activa antes de abrir una nueva
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // Conecta a la base de datos de pruebas
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
  });
  console.log(`Conectado a la base de datos de pruebas: ${dbURI}`);
});

afterAll(async () => {
  // Verifica si la conexión está activa antes de limpiar la base de datos
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos de pruebas');
  }
});

describe('POST /api/formulario', () => {
  it('debería guardar un formulario y devolver un mensaje de éxito', async () => {
    const data = {
      tipoAyuda: 'alimentos', // Asegúrate de que tipoAyuda no esté vacío
      cantidad: 3, // Asegúrate de que cantidad no esté vacío
      respuestas: {
        '1': 'Comida',
        '2': 'Urgente',
        '3': '5 personas',
        '4': 'No',
      },
      ubicacion: 'Andoain', // Añadir el campo 'ubicacion' que es obligatorio
    };

    // Hacer la petición POST
    const response = await request(app).post('/api/formulario').send(data);

    // Verificar el resultado
    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Formulario guardado exitosamente');
    expect(response.body.resultado).toHaveProperty('_id');
  });

  it('debería devolver un error si faltan datos requeridos', async () => {
    const data = {
      tipoAyuda: '', // tipoAyuda vacío, debería ser un campo requerido
      cantidad: '', // cantidad vacía, debería ser un campo requerido
      respuestas: {}, // respuestas vacías, puede no ser obligatorio dependiendo del esquema
      ubicacion: '', // ubicación vacía, debería ser un campo requerido
    };

    // Hacer la petición con datos incompletos
    const response = await request(app).post('/api/formulario').send(data);

    // Verificar el resultado
    expect(response.status).toBe(400); // Ajusta según la validación en tu controlador
    expect(response.body.mensaje).toBe('Datos no válidos');
  });
});
