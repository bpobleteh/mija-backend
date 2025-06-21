const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Funcionario = require('../models/Funcionario');
const jwt = require('jsonwebtoken');

console.log('✅ auth.routes.js cargado correctamente');

//////////////////////////
// 🔐 LOGIN DE USUARIO (APP)
//////////////////////////
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    if (!correo || !password) {
      return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, tipo: 'usuario' },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '2h' }
    );

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        _id: usuario._id,
        nombres: usuario.nombres,
        apellidoPaterno: usuario.apellidoPaterno,
        correo: usuario.correo,
        comuna: usuario.comuna,
        region: usuario.region
      }
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno en el login', error: error.message });
  }
});

//////////////////////////
// 🧾 REGISTRO DE FUNCIONARIO (WEB)
//////////////////////////
router.post('/registro-funcionario', async (req, res) => {
  const {
    nombre,
    email,
    rut,
    password,
    rol = 'funcionario',
    centroSalud = ''
  } = req.body;

  try {
    if (!nombre || !email || !rut || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const existe = await Funcionario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    const nuevo = new Funcionario({
      nombre,
      email,
      rut,
      password,  // sin encriptar por ahora
      rol,
      centroSalud
    });

    await nuevo.save();
    res.status(201).json({ mensaje: 'Funcionario registrado correctamente' });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar funcionario', error });
  }
});

//////////////////////////
// 🔐 LOGIN DE FUNCIONARIO (WEB)
//////////////////////////
router.post('/login-funcionario', async (req, res) => {
  const { email, password } = req.body;

  try {
    const funcionario = await Funcionario.findOne({ email });
    if (!funcionario) {
      return res.status(404).json({ mensaje: 'Funcionario no encontrado' });
    }

    if (funcionario.password !== password) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: funcionario._id, rol: funcionario.rol },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '8h' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      funcionario: {
        id: funcionario._id,
        nombre: funcionario.nombre,
        email: funcionario.email,
        rut: funcionario.rut,
        rol: funcionario.rol,
        centroSalud: funcionario.centroSalud
      }
    });

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
});

//////////////////////////
// 🔒 PERFIL FUNCIONARIO PROTEGIDO (opcional)
//////////////////////////
const verifyToken = require('../middlewares/verifyToken');

router.get('/perfil-funcionario', verifyToken, async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.user.id).select('-password');
    if (!funcionario) return res.status(404).json({ mensaje: 'Funcionario no encontrado' });

    res.json({ funcionario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error });
  }
});

module.exports = router;
