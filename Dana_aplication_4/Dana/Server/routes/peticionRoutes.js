const express = require('express');
const Peticion = require('../models/Peticion');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nuevaPeticion = new Peticion(req.body);
    const resultado = await nuevaPeticion.save();
    res.status(201).json({ mensaje: 'Petición registrada', resultado });
  } catch (error) {
    console.error('Error al guardar la petición:', error);
    res.status(500).json({ mensaje: 'Error al guardar la petición' });
  }
});

module.exports = router;
