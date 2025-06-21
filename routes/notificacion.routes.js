const express = require('express');
const router = express.Router();
const Notificacion = require('../models/Notificacion');
const Usuario = require('../models/Usuario');

// POST /api/notificacion/llegada
router.post('/llegada', async (req, res) => {
  try {
    const { usuarioId, categoria, centroSalud } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const nueva = new Notificacion({
      usuarioId,
      nombreUsuario: usuario.nombre,
      categoria,
      centroSalud,
      tipo: 'llegada',
      estado: 'pendiente'
    });

    const guardada = await nueva.save();
    res.status(201).json({ mensaje: 'Notificación de llegada creada', notificacion: guardada });
  } catch (error) {
    console.error('Error al registrar notificación:', error);
    res.status(500).json({ mensaje: 'Error al registrar notificación' });
  }
});

// GET /api/notificacion → obtener todas
router.get('/', async (req, res) => {
  try {
    const lista = await Notificacion.find().sort({ fecha: -1 });
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener notificaciones' });
  }
});

// PATCH /api/notificacion/:id/aceptar
router.patch('/:id/aceptar', async (req, res) => {
  try {
    const { estado, funcionarioAsignado } = req.body;

    const actualizada = await Notificacion.findByIdAndUpdate(
      req.params.id,
      { estado, funcionarioAsignado },
      { new: true }
    );

    if (!actualizada) {
      return res.status(404).json({ mensaje: 'Notificación no encontrada' });
    }

    res.json({ mensaje: 'Notificación aceptada', notificacion: actualizada });
  } catch (error) {
    console.error('❌ Error al aceptar notificación:', error);
    res.status(500).json({ mensaje: 'Error al aceptar notificación' });
  }
});


module.exports = router;
