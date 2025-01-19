const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index'); // Ajusta la ruta a tu archivo de servidor
const Donacion = require('../models/Donacion'); // Importa el modelo si lo necesitas
const Formulario = require('../models/Formulario'); // Importa el modelo si lo necesitas

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

  it('debería manejar errores de base de datos', async () => {
  // Cierra la conexión a la base de datos para simular un error
  mongoose.disconnect();

  const response = await request(app)
    .post('/api/formulario')
    .send({
      tipoAyuda: 'alimentos',
      cantidad: 10,
      ubicacion: 'Madrid',
    });

  // Verifica que la respuesta sea 500
  expect(response.status).toBe(500);
  expect(response.body.mensaje).toBe('Error al guardar el formulario');
  
  // Reconecta a la base de datos para que otras pruebas no fallen
  await mongoose.connect('mongodb://127.0.0.1:27017/ayudaDB');
});
});

describe('POST /api/donacion', () => {
  it('debería guardar una donación correctamente', async () => {
    const data = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      tipoAyuda: 'voluntariado',
      cantidad: 1,
      descripcion: 'Ayuda en tareas de limpieza',
      ubicacion: 'Madrid', // Asegúrate de incluir todos los campos requeridos
    };

    const response = await request(app).post('/api/donacion').send(data);

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Petición guardada exitosamente');
  });
  it('debería devolver un error 500 si falla al guardar la donación', async () => {
    // Simulamos un error de base de datos desconectando temporalmente la base de datos
    await mongoose.disconnect();

    const data = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      tipoAyuda: 'voluntariado',
      cantidad: 1,
      descripcion: 'Ayuda en tareas de limpieza',
      ubicacion: 'Madrid',
    };

    const response = await request(app).post('/api/donacion').send(data);

    // Verificamos que la respuesta sea 500 debido al error en la base de datos
    expect(response.status).toBe(500);
    expect(response.body.mensaje).toBe('Error al guardar la petición');
    
    // Reconectamos la base de datos para futuras pruebas
    await mongoose.connect('mongodb://127.0.0.1:27017/ayudaDB');
  });
});

