const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); // Importa solo la app sin la llamada a `listen`

beforeAll(async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ayudaDB'; // Selecciona la URI adecuada
  // Cierra cualquier conexión activa antes de abrir una nueva
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // Conecta a la base de datos
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Conectado a la base de datos: ${uri}`);
});

afterAll(async () => {
  // Verifica si la conexión está activa antes de limpiar la base de datos
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
    console.log('Desconectado de la base de datos');
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
