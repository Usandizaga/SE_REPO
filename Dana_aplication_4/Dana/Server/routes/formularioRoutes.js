/*const express = require('express');
const Formulario = require('../models/Formulario');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nuevoFormulario = new Formulario(req.body);
    const resultado = await nuevoFormulario.save();
    res.status(201).json({ mensaje: 'Formulario guardado', resultado });
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario' });
  }
});

module.exports = router;
*/