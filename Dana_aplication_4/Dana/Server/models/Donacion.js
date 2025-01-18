
/*const mongoose = require('mongoose');

const donacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  tipoAyuda: { type: String, required: true },
  descripcion: { type: String, required: false },
  cantidad: { type: Number, required: true, min: 1 },
  ubicacion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Aquí prevenimos la sobrescritura del modelo Donacion
const Donacion = mongoose.models.Donacion || mongoose.model('Donacion', donacionSchema);

module.exports = Donacion;
*/