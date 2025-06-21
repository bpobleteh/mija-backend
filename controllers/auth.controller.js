// controllers/auth.controller.js
const Funcionario = require('../models/Funcionario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrarFuncionario = async (req, res) => {
  const { nombre, email, rut, password } = req.body;

  if (!nombre || !email || !rut || !password) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const existe = await Funcionario.findOne({ email });
    if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevo = new Funcionario({ nombre, email, rut, password: hashedPassword });
    await nuevo.save();

    res.status(201).json({ mensaje: 'Funcionario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar funcionario', error });
  }
};

const loginFuncionario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const funcionario = await Funcionario.findOne({ email });
    if (!funcionario) return res.status(404).json({ mensaje: 'Funcionario no encontrado' });

    const valido = await bcrypt.compare(password, funcionario.password);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: funcionario._id, rol: funcionario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ mensaje: 'Login exitoso', token, funcionario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

module.exports = { registrarFuncionario, loginFuncionario };
