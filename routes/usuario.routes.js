const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { crearUsuario } = require('../controllers/usuario.controller'); // ✅ Aseguramos que exista esta función

//////////////////////////
// ✅ Crear usuario (registro)
//////////////////////////
router.post('/', crearUsuario);

//////////////////////////
// ✅ Obtener usuario por ID (para perfil)
//////////////////////////
router.get('/id/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//////////////////////////
// ✅ Actualizar usuario por ID
//////////////////////////
router.put('/id/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Perfil actualizado correctamente', usuario });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//////////////////////////
// ✅ Eliminar usuario por ID
//////////////////////////
router.delete('/id/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//////////////////////////
// ✅ Buscar usuario por RUT
//////////////////////////
router.get('/rut/:rut', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ rut: req.params.rut });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    console.error('Error al buscar usuario por RUT:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

//////////////////////////
// ✅ Confirmar llegada del usuario
//////////////////////////
router.post('/llego', async (req, res) => {
  try {
    const { rut, funcionario } = req.body;
    const usuario = await Usuario.findOneAndUpdate(
      { rut },
      { estado: 'en_servicio', funcionarioAsignado: funcionario },
      { new: true }
    );
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario ingresado al centro', usuario });
  } catch (error) {
    console.error('Error al confirmar llegada:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//////////////////////////
// ✅ Obtener usuarios en servicio
//////////////////////////
router.get('/en-servicio', async (req, res) => {
  try {
    const usuarios = await Usuario.find({ estado: 'en_servicio' });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios en servicio:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

//////////////////////////
// ✅ Notificación automática (simulada)
//////////////////////////
let mensajeAlerta = ''; // Variable simulada temporal

router.get('/notificacion', (req, res) => {
  res.send(mensajeAlerta || '');
});
// PUT /api/usuario/:id/estado
router.put('/:id/estado', async (req, res) => {
  try {
    const { estado, funcionarioAsignado } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      { estado, funcionarioAsignado },
      { new: true }
    );

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    res.json({ mensaje: 'Estado actualizado', usuario });
  } catch (error) {
    console.error('Error al actualizar estado del usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});


module.exports = router;
