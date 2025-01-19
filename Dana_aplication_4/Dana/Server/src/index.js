const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Para trabajar con rutas de archivos
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 5001; // Configurable desde variables de entorno

app.disable('x-powered-by');

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*', // Permite configurar el origen desde variables de entorno
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
};

app.use(cors(corsOptions)); // Usar la configuración de CORS segura
app.use(bodyParser.json());

// Conexión a MongoDB usando variables de entorno
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ayudaDB';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de MongoDB
const formularioSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String, required: false },
  ubicacion: { type: String, required: true },
  respuestas: { type: Object, required: false },
});

const Formulario = mongoose.model('Formulario', formularioSchema);

// Ruta para manejar solicitudes POST de formulario
app.post('/api/formulario', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  try {
    const nuevoFormulario = new Formulario(req.body);
    const resultado = await nuevoFormulario.save();
    res.status(201).json({ mensaje: 'Formulario guardado exitosamente', resultado });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ mensaje: 'Datos no válidos', errores: error.errors });
    }
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario' });
  }
});

const DonacionSchema = new mongoose.Schema({
  tipoAyuda: String,
  cantidad: Number,
  respuestas: Object,
  ubicacion: String,
});

const Donacion = mongoose.model('Donacion', DonacionSchema);

// Ruta para manejar el endpoint '/api/donacion'
app.post('/api/donacion', async (req, res) => {
  console.log('Datos recibidos:', req.body);
  try {
    const nuevaDonacion = new Donacion({
      nombre: req.body.nombre,
      email: req.body.email,
      tipoAyuda: req.body.tipoAyuda,
      descripcion: req.body.descripcion,
      cantidad: req.body.cantidad,
      ubicacion: req.body.ubicacion,
    });
    await nuevaDonacion.save();
    res.status(201).json({ mensaje: 'Petición guardada exitosamente' });
  } catch (error) {
    console.error('Error al guardar la petición:', error);
    res.status(500).json({ mensaje: 'Error al guardar la petición', error: error.message });
  }
});

// === Sirve el frontend ===
app.use(express.static(path.join(__dirname, 'dist')));

// Para cualquier ruta que no coincida con las API, devuelve el index.html del frontend
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
