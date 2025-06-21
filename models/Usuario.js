const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaNacimiento: { type: Date },
  telefono: { type: String },
  direccion: { type: String },
  region: { type: String },
  comuna: { type: String },
  genero: { type: String },
  fotoPerfil: { type: String }, // URL o nombre del archivo
  sintomas: [{ type: String }],
  escalaDolor: { type: Number }, // escala EVA
  categoria: { type: String }, // C1 a C5
  centroDerivado: { type: String },
  estado: { type: String, default: 'registrado' }, // registrado | en_servicio | atendido
  funcionarioAsignado: { type: String },
  historial: [
    {
      fecha: { type: Date, default: Date.now },
      descripcion: String,
      archivos: [String] // lista de nombres de archivos PDF, imágenes, etc.
    }
  ],
  codigoRecuperacion: { type: String },
  expiraEn: { type: Date }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
