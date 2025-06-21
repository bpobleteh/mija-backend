const express = require('express');
const router = express.Router();
const flujoController = require('../controllers/flujo.controller');

// Ruta para obtener todos los flujos
router.get('/flujo', flujoController.obtenerFlujo);

// Ruta para crear un nuevo flujo
router.post('/flujo', flujoController.crearFlujo);

// Ruta para actualizar un flujo existente
router.put('/flujo/:id', flujoController.actualizarFlujo);

// Ruta para eliminar un flujo
router.delete('/flujo/:id', flujoController.eliminarFlujo);

module.exports = router;
