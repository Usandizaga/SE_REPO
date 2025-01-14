const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Para trabajar con rutas de archivos

const app = express();
const PORT = 5001; // Cambia el puerto si es necesario

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB (sin useNewUrlParser y useUnifiedTopology)
mongoose
  .connect('mongodb://127.0.0.1:27017/ayudaDB')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de MongoDB
const formularioSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: false }, // No obligatorio
  ubicacion: { type: String, required: true },  // Ubicación
  respuestas: {type: Object,required: false,},
});

const Formulario = mongoose.model('Formulario', formularioSchema);

// Ruta para manejar solicitudes POST
app.post('/api/formulario', async (req, res) => {
  console.log('Datos recibidos:', req.body); // Muestra los datos recibidos en la consola

  // Validación de los campos requeridos
  const { tipoAyuda, cantidad, ubicacion } = req.body;
  if (!tipoAyuda || !cantidad || !ubicacion) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' }); //si falla tiene que dar este tipo de error
  }

  try {
    // Crea el nuevo formulario
    const nuevoFormulario = new Formulario(req.body);
    // Guarda el formulario en la base de datos
    const resultado = await nuevoFormulario.save();
    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Formulario guardado exitosamente', resultado });
  } catch (error) {
    // Si ocurre un error de validación (por ejemplo, un campo no válido), maneja el error
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Datos no válidos', errores: error.errors });
    }
    // Si ocurre un error inesperado
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario' });
  }
});

// === Sirve el frontend ===
// Asegúrate de actualizar la ruta de la carpeta `dist` según la ubicación correcta
app.use(express.static(path.join(__dirname, 'dist')));

// Para cualquier ruta que no coincida con las API, devuelve el `index.html` del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Solo iniciar el servidor si NO estamos en entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

  });
}

// Exportar la app para las pruebas
module.exports = app;
