const express = require('express');
const router = express.Router();
const sintomasController = require('../controllers/sintomas.controller');

// ✅ Ruta para obtener síntomas
router.get('/lista-sintomas', sintomasController.obtenerSintomas);

// (Otras rutas si deseas mantenerlas)
module.exports = router;
