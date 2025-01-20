const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/index'); // Importa tu aplicación sin la llamada a `listen`
const Donacion = require('../models/Donacion'); // Asegúrate de importar correctamente el modelo
//const app = require('../path/to/app'); // Asegúrate de que la ruta de tu app sea correcta

// Establecer un tiempo de espera global más largo para las pruebas
jest.setTimeout(20000); // 10 segundos
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

beforeAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ayudaDB';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
});

afterAll(async () => {
  // Asegúrate de que la conexión está activa antes de intentar limpiar la base de datos
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect(); // Desconecta de la base de datos
  }
});

describe('POST /api/formulario', () => {
  
  it('debería guardar un formulario correctamente si todos los datos son válidos', async () => {
    const data = {
      tipoAyuda: 'alimentos',
      cantidad: 3,
      respuestas: {
        '1': 'Comida',
        '2': 'Urgente',
        '3': '55 personas',
        '4': 'No',
      },
      ubicacion: 'Andoain',
    };

    const response = await request(app).post('/api/formulario').send(data);

    expect(response.status).toBe(201);
    expect(response.body.mensaje).toBe('Formulario guardado exitosamente');
    expect(response.body.resultado).toHaveProperty('_id');
  });
  it('debería devolver un error 400 si falta algún dato requerido (backend)', async () => {
    const data = {
      tipoAyuda: '',  // Este campo está vacío
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

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Datos no válidos');
  });

  it('debería devolver un error 400 si cantidad no es un número válido', async () => {
    const data = {
      tipoAyuda: 'alimentos',
      cantidad: 'no es un número',  // Tipo incorrecto
      respuestas: {},
      ubicacion: 'Andoain',
    };

    const response = await request(app).post('/api/formulario').send(data);

    expect(response.status).toBe(400);
    expect(response.body.mensaje).toBe('Datos no válidos');
    expect(response.body.errores).toHaveProperty('cantidad'); // Verifica el error en 'cantidad'
  });

  
  it('debería devolver un error 500 si ocurre un fallo inesperado en el servidor', async () => {
    // Fuerza un error al eliminar la conexión activa con la base de datos
    await mongoose.disconnect();
  
    const data = {
      tipoAyuda: 'alimentos',
      cantidad: 5,
      respuestas: { '1': 'Comida' },
      ubicacion: 'Andoain',
    };
  
    const response = await request(app).post('/api/formulario').send(data);
  
    expect(response.status).toBe(500);
    expect(response.body.mensaje).toBe('Error al guardar el formulario');
  
    // Reconectar para que otras pruebas no fallen
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ayudaDB');
  });
  
});

describe('POST /api/donacion', () => {

  it('debería guardar una donación correctamente', async () => {
    const data = {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      tipoAyuda: 'voluntariado',
      cantidad: 12,
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
