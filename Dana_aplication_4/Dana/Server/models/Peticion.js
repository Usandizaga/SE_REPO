/*const mongoose = require('mongoose');

const peticionSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: false },
  cantidadNecesaria: { type: Number, required: true },
  ubicacion: { type: String, required: true },
  descripcion: { type: String },
  status: { type: String, default: 'abierta', enum: ['abierta', 'completada'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Peticion', peticionSchema);
*/