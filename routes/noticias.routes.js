const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelo de noticia
const noticiaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Noticia = mongoose.model('Noticia', noticiaSchema);

// ✅ Obtener todas las noticias
router.get('/', async (req, res) => {
  try {
    const noticias = await Noticia.find().sort({ fecha: -1 });
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener noticias' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Noticia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar noticia' });
  }
});

// ✅ Eliminar noticia
router.delete('/:id', async (req, res) => {
  try {
    await Noticia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Noticia eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar noticia' });
  }
});



router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, centroSalud } = req.body;
    const nueva = new Noticia({
      titulo,
      descripcion,
      fecha: fecha || new Date(),
      centroSalud: centroSalud || 'General' 
    });
    await nueva.save();
    res.status(201).json({ mensaje: 'Noticia creada exitosamente', noticia: nueva });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});



module.exports = router;
