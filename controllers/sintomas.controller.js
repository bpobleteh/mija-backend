const fs = require('fs');
const path = require('path');

function obtenerSintomas(req, res) {
  const ruta = path.join(__dirname, '../data/sintomas.json');
  fs.readFile(ruta, 'utf8', (err, data) => {
    if (err) {
      console.error("❌ Error al leer síntomas:", err);
      return res.status(500).json({ mensaje: "Error al leer lista de síntomas" });
    }

    try {
      const sintomas = JSON.parse(data);
      res.json(sintomas);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al procesar archivo de síntomas", error });
    }
  });
}

module.exports = { obtenerSintomas };
