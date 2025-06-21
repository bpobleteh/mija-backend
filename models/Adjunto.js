const mongoose = require('mongoose');

const AdjuntoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombreArchivo: { type: String, required: true },
  url: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Adjunto', AdjuntoSchema);
