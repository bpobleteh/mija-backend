const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  centroSalud: { type: String }
});

module.exports = mongoose.model('Noticia', noticiaSchema);
