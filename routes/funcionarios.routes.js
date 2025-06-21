const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');
const verifyToken = require('../middlewares/verifyToken');

// Ruta protegida para obtener los datos del funcionario logueado
router.get('/privado', verifyToken, async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.usuario.id);
    if (!funcionario) return res.status(404).json({ mensaje: 'Funcionario no encontrado' });
    res.json({ datosFuncionario: funcionario });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos del funcionario' });
  }
});
// ✅ Registrar nuevo funcionario
router.post('/', async (req, res) => {
  try {
    const nuevoFuncionario = new Funcionario(req.body);
    await nuevoFuncionario.save();
    res.status(201).json({ mensaje: 'Funcionario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar funcionario:', error);
    res.status(500).json({ mensaje: 'Error al registrar funcionario' });
  }
});

module.exports = router;
