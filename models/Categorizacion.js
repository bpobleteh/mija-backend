const mongoose = require('mongoose');

const CategorizacionSchema = new mongoose.Schema({
  rut: { type: String, required: true },
  nombreUsuario: { type: String, required: true }, 
  sintomas: [String],
  eva: Number,
  categoria: String,
  fechaHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Categorizacion', CategorizacionSchema);
