const Usuario = require('../models/Usuario');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Generar código
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Transporter Gmail
const transporterGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// Enviar código
async function enviarCodigo(req, res) {
  const { correo } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: "Correo no registrado" });

    const codigo = generarCodigo();
    usuario.codigoRecuperacion = codigo;
    usuario.expiraEn = new Date(Date.now() + 10 * 60000);
    await usuario.save();

    await transporterGmail.sendMail({
      from: `"MiJa Salud" <${process.env.MAIL_USER}>`,
      to: correo,
      subject: 'Recuperación de contraseña',
      html: `<p>Tu código es: <strong>${codigo}</strong> (válido por 10 minutos)</p>`
    });

    res.json({ mensaje: "Código enviado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno", error: error.message });
  }
}

// Verificar código
async function verificarCodigo(req, res) {
  const { correo, codigo } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || usuario.codigoRecuperacion !== codigo || new Date() > usuario.expiraEn) {
      return res.status(400).json({ mensaje: "Código inválido o expirado" });
    }

    res.json({ mensaje: "Código verificado correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno", error: error.message });
  }
}

// Cambiar clave
async function cambiarClave(req, res) {
  const { correo, codigo, nuevaClave } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario || usuario.codigoRecuperacion !== codigo || new Date() > usuario.expiraEn) {
      return res.status(400).json({ mensaje: "Código inválido o expirado" });
    }

    usuario.password = nuevaClave; // 🔐 Se encripta automáticamente por el modelo
    usuario.codigoRecuperacion = undefined;
    usuario.expiraEn = undefined;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada correctamente" });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno", error: error.message });
  }
}

module.exports = { enviarCodigo, verificarCodigo, cambiarClave };
