const mongoose = require('mongoose');

const formularioSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: true },
  cantidad: { type: Number, required: true },
  respuestas: { type: Object, required: true },
});

module.exports = mongoose.model('Formulario', formularioSchema);
