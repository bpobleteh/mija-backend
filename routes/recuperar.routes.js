const express = require('express');
const router = express.Router();
const { enviarCodigo, verificarCodigo, cambiarClave } = require('../controllers/recuperar.controller');

router.post('/enviar-codigo', enviarCodigo);
router.post('/verificar-codigo', verificarCodigo);
router.put('/cambiar-clave', cambiarClave);

module.exports = router;
