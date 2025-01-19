const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); // Importa solo la app sin la llamada a `listen`

beforeAll(async () => {
  // Desconecta cualquier conexión activa antes de abrir una nueva
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ayudaDB';
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Asegúrate de que la conexión está activa antes de intentar limpiar la base de datos
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }
});

describe('POST /api/formulario', () => {
  it('debería guardar un formulario y devolver un mensaje de éxito', async () => {
    const data = {
      tipoAyuda: 'alimentos',
      cantidad: 3,
      respuestas: {
        '1': 'Comida',
        '2': 'Urgente',
        '3': '5 personas',
        '4': 'No',
      },
      ubicacion: 'Andoain',
    };

    const response = await request(app).post('/api/formulario').send(data);

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Formulario guardado exitosamente');
    expect(response.body.resultado).toHaveProperty('_id');
  });

  it('debería devolver un error si faltan datos requeridos', async () => {
    const data = {
      tipoAyuda: '',
      cantidad: '',
      respuestas: {},
      ubicacion: '',
    };

    const response = await request(app).post('/api/formulario').send(data);

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Datos no válidos');
  });
});
