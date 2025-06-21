const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const PDFDocument = require('pdfkit');

// 🆕 Generar PDF del historial clínico desde el array interno del usuario
router.get('/pdf/:usuarioId', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="historial.pdf"');
    doc.pipe(res);

    // ENCABEZADO
    doc.fontSize(20).text('Historial Clínico - MiJa Salud', { align: 'center' });
    doc.moveDown();

    // DATOS DEL USUARIO
    doc.fontSize(14).text(`Nombre: ${usuario.nombre}`);
    doc.text(`RUT: ${usuario.rut}`);
    doc.text(`Correo: ${usuario.correo}`);
    doc.text(`Fecha de Nacimiento: ${usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento).toLocaleDateString('es-CL') : 'No registrada'}`);
    doc.text(`Teléfono: ${usuario.telefono || 'No registrado'}`);
    doc.text(`Dirección: ${usuario.direccion || 'No registrada'}`);
    doc.text(`Región: ${usuario.region || 'No registrada'} - Comuna: ${usuario.comuna || 'No registrada'}`);
    doc.text(`Género: ${usuario.genero || 'No especificado'}`);
    doc.text(`Categoría: ${usuario.categoria || 'Sin categorización'}`);
    doc.text(`Estado actual: ${usuario.estado || 'Sin estado'}`);
    doc.text(`Funcionario asignado: ${usuario.funcionarioAsignado || 'No asignado'}`);
    doc.moveDown();

    // HISTORIAL CLÍNICO
    doc.fontSize(16).text('Registros Históricos:', { underline: true });
    doc.moveDown();

    if (usuario.historial && usuario.historial.length > 0) {
      usuario.historial
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha descendente
        .forEach(item => {
          doc.fontSize(13).text(`🗓 ${new Date(item.fecha).toLocaleString('es-CL')}`);
          doc.fontSize(12).text(`📄 ${item.descripcion || 'Sin descripción'}`);
          if (item.archivos && item.archivos.length > 0) {
            doc.text(`📎 Archivos adjuntos: ${item.archivos.join(', ')}`);
          }
          doc.moveDown();
        });
    } else {
      doc.fontSize(12).text('No hay registros clínicos disponibles.');
    }

    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ mensaje: 'Error al generar PDF', error });
  }
});

module.exports = router;
