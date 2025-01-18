/*const express = require('express');
const Donacion = require('../models/Donacion.js');
const Peticion = require('../models/Peticion.js');

const router = express.Router();

router.post('/api/donaciones', async (req, res) => {
  const { tipoAyuda, cantidadDonada, ubicacion, peticionId } = req.body;

  try {
    const peticion = await Peticion.findById(peticionId);

    if (!peticion || peticion.status === 'completada') {
      return res.status(404).json({ mensaje: 'Petición no encontrada o ya completada' });
    }

    peticion.cantidadNecesaria -= cantidadDonada;

    if (peticion.cantidadNecesaria <= 0) {
      peticion.status = 'completada';
      peticion.cantidadNecesaria = 0;
    }

    await peticion.save();

    const nuevaDonacion = new Donacion({ tipoAyuda, cantidadDonada, ubicacion, peticionId });
    const resultado = await nuevaDonacion.save();

    res.status(201).json({ mensaje: 'Donación registrada', resultado });
  } catch (error) {
    console.error('Error al guardar la donación:', error);
    res.status(500).json({ mensaje: 'Error al guardar la donación' });
  }
});

module.exports = router;
*/