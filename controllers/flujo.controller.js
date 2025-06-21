// ✅ backend-api/controllers/flujo.controller.js
const Flujo = require('../models/Flujo');

// Obtener todos los registros (para el administrador)
async function obtenerFlujo(req, res) {
  try {
    const flujo = await Flujo.find().sort({ fecha: -1 });
    res.json(flujo);
  } catch (error) {
    console.error('❌ Error al obtener flujo:', error);
    res.status(500).json({ mensaje: 'Error al obtener flujo', error });
  }
}

// Crear nuevo registro (noticia o información desde panel admin)
async function crearFlujo(req, res) {
  try {
    const nuevo = new Flujo(req.body);
    const guardado = await nuevo.save();
    res.status(201).json({ mensaje: 'Flujo creado correctamente', flujo: guardado });
  } catch (error) {
    console.error('❌ Error al crear flujo:', error);
    res.status(500).json({ mensaje: 'Error al crear flujo', error });
  }
}

// Actualizar por ID
async function actualizarFlujo(req, res) {
  try {
    const actualizado = await Flujo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensaje: 'Registro actualizado', flujo: actualizado });
  } catch (error) {
    console.error('❌ Error al actualizar flujo:', error);
    res.status(500).json({ mensaje: 'Error al actualizar flujo', error });
  }
}

// Eliminar por ID
async function eliminarFlujo(req, res) {
  try {
    await Flujo.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar flujo:', error);
    res.status(500).json({ mensaje: 'Error al eliminar flujo', error });
  }
}

module.exports = {
  obtenerFlujo,
  crearFlujo,
  actualizarFlujo,
  eliminarFlujo
};
