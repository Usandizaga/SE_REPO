const mongoose = require('mongoose');

const donacionSchema = new mongoose.Schema({
  tipoAyuda: { type: String, required: true },
  cantidadDonada: { type: Number, required: true },
  ubicacion: { type: String, required: true },
  peticionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Peticion' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Donacion', donacionSchema);
