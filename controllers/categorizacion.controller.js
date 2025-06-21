const Categorizacion = require("../models/Categorizacion");
const fs = require("fs");
const path = require("path");

exports.crearCategorizacion = async (req, res) => {
  try {
    const { rut, nombreUsuario, sintomas, eva } = req.body;

    if (!rut || !nombreUsuario || !sintomas || sintomas.length === 0 || eva === undefined) {
      return res.status(400).json({ mensaje: "Datos insuficientes" });
    }

    const filePath = path.join(__dirname, "../data/sintomas.json");
    const sintomasData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let puntaje = 0;

    sintomas.forEach((sintoma) => {
      const info = sintomasData.find((x) => x.nombre === sintoma);
      if (info) {
        switch (info.riesgo) {
          case "alto":
            puntaje += 5;
            break;
          case "moderado":
            puntaje += 3;
            break;
          case "leve":
            puntaje += 1;
            break;
        }
      }
    });

    // Evaluación EVA
    if (eva >= 7) {
      puntaje += 5;
    } else if (eva >= 4) {
      puntaje += 3;
    } else {
      puntaje += 1;
    }

    // Categorización según puntaje
    let categoria = "C5";
    let recomendacion = "Reposo en casa y monitoreo";

    if (puntaje >= 13) {
      categoria = "C1";
      recomendacion = "Acudir de inmediato a urgencias hospitalarias";
    } else if (puntaje >= 10) {
      categoria = "C2";
      recomendacion = "Atención en SAPU o SAR urgente";
    } else if (puntaje >= 7) {
      categoria = "C3";
      recomendacion = "Consulta médica en CESFAM";
    } else if (puntaje >= 4) {
      categoria = "C4";
      recomendacion = "Control médico general";
    }

    // 👇 Aquí se incluyen rut y nombreUsuario
    const nuevo = new Categorizacion({
      rut,
      nombreUsuario,
      sintomas,
      eva,
      categoria,
      recomendacion
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ mensaje: "Error al categorizar" });
  }
};
