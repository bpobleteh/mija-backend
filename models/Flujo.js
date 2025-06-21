const mongoose = require('mongoose');

const FlujoSchema = new mongoose.Schema({
  nombreCentro: { type: String, required: true },
  tipoCentro: { type: String, required: true },     // CESFAM, SAPU, SAR, etc.
  comuna: { type: String, required: true },
  estadoColor: { type: String, required: true },     // verde, amarillo, naranjo, rojo
  afluencia: { type: Number, required: true },       // personas aproximadas
  tiempoEspera: { type: Number, required: true },    // minutos
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flujo', FlujoSchema);
