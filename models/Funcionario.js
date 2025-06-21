const mongoose = require('mongoose');

const funcionarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  centroSalud: { type: String, required: true },
  rol: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Funcionario', funcionarioSchema);
