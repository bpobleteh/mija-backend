const mongoose = require('mongoose');

const HistorialSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { type: String, enum: ['receta', 'consulta', 'examen'], required: true },
  detalle: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Historial', HistorialSchema);
