const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  nombreUsuario: { type: String, required: true },
  categoria: { type: String, required: true },
  centroSalud: { type: String, required: true },
  mensaje: { type: String },
  tipo: { type: String, default: 'llegada' }, // llegada, mensaje, alerta...
  estado: { type: String, default: 'pendiente' }, // pendiente, aceptado, leído...
  leido: { type: Boolean, default: false },
  fecha: { type: Date, default: Date.now },
  funcionarioAsignado: { type: String } // opcional, se completa al aceptar
});

module.exports = mongoose.model('Notificacion', NotificacionSchema);
