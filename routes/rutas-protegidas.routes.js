const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

// Ruta de prueba protegida
router.get('/privado', verifyToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido ✅',
    datosUsuario: req.user // <- Viene del token
  });
});

module.exports = router;
