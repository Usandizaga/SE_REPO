const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001; // Cambia el puerto si es necesario

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/ayudaDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Esquema y modelo de MongoDB
const formularioSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: true },
  cantidad: { type: Number, required: true },
  respuestas: { type: Object, required: true }, // Guardará las preguntas y respuestas del cuestionario
});

const Formulario = mongoose.model('Formulario', formularioSchema);

// Ruta para manejar solicitudes POST
app.post('/api/formulario', async (req, res) => {
  console.log('Datos recibidos:', req.body); // Muestra los datos recibidos en la consola

  try {
    const nuevoFormulario = new Formulario(req.body);
    const resultado = await nuevoFormulario.save();
    res.status(201).json({ mensaje: 'Formulario guardado exitosamente', resultado });
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario' });
  }
});

// Solo iniciar el servidor si NO estamos en entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

// Exportar la app para las pruebas
module.exports = app;