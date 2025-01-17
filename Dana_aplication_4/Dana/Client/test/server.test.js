const request = require('supertest');
const mongoose = require('mongoose');
const app = require('C:/Users/andon/OneDrive/Desktop/se_repo/Dana_aplication_4/Dana/Server/index.js'); // Asegúrate de importar solo la app sin la llamada a `listen`

beforeAll(async () => {
  // Conectar a una base de datos de prueba
  await mongoose.connect('mongodb://127.0.0.1:27017/ayudaDB_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Limpiar la base de datos después de las pruebas
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
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
        '4': 'No' 
      },
      ubicacion: 'Andoain' // Añadir el campo 'ubicacion' que es obligatorio
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
      ubicacion: '' // ubicación vacía, debería ser un campo requerido
    };

    // Hacer la petición con datos incompletos
    const response = await request(app).post('/api/formulario').send(data);

    // Verificar el resultado
    expect(response.status).toBe(400); // Ajusta según la validación en tu controlador
    expect(response.body.mensaje).toBe('Faltan datos requeridos');
  });
});