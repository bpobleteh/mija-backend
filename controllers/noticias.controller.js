const Noticia = require('../models/Noticia'); // corregido path

// Obtener todas las noticias
async function obtenerNoticias(req, res) {
  try {
    const noticias = await Noticia.find().sort({ fecha: -1 });
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener noticias', error });
  }
}

// Crear una nueva noticia
async function crearNoticia(req, res) {
  const { titulo, descripcion, fecha } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ mensaje: 'Título y contenido son obligatorios' });
  }

  try {
    const nueva = new Noticia({ titulo, descripcion, fecha: fecha || Date.now() });
    await nueva.save();
    res.status(201).json({ mensaje: 'Noticia creada correctamente', noticia: nueva });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar la noticia', error });
  }
}

// Eliminar noticia por ID
async function eliminarNoticia(req, res) {
  const { id } = req.params;
  try {
    await Noticia.findByIdAndDelete(id);
    res.json({ mensaje: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar noticia', error });
  }
}

module.exports = {
  obtenerNoticias,
  crearNoticia,
  eliminarNoticia
};
