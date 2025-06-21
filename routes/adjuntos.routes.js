const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Adjunto = require('../models/Adjunto');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Crear ruta para subir adjunto
router.post('/subir', upload.single('archivo'), async (req, res) => {
  try {
    const nuevoAdjunto = new Adjunto({
      usuarioId: req.body.usuarioId,
      nombreArchivo: req.file.originalname,
      url: `http://localhost:3000/uploads/${req.file.filename}`
    });
    await nuevoAdjunto.save();
    res.json({ mensaje: 'Archivo subido', adjunto: nuevoAdjunto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al subir archivo', error });
  }
});

// Obtener archivos adjuntos por usuario
router.get('/:usuarioId', async (req, res) => {
  try {
    const archivos = await Adjunto.find({ usuarioId: req.params.usuarioId }).sort({ fecha: -1 });
    res.json(archivos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener archivos', error });
  }
});

module.exports = router;
