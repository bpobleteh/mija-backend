const Notificacion = require('../models/Notificacion');

// POST /api/notificacion → crear notificación (tipo llegada por defecto)
async function crearNotificacion(req, res) {
  try {
    const { usuarioId, nombreUsuario, categoria, centroSalud, mensaje, tipo = 'llegada' } = req.body;

    if (!usuarioId || !nombreUsuario || !categoria || !centroSalud) {
      return res.status(400).json({
        mensaje: 'usuarioId, nombreUsuario, categoria y centroSalud son requeridos'
      });
    }

    const nueva = new Notificacion({
      usuarioId,
      nombreUsuario,
      categoria,
      centroSalud,
      mensaje: mensaje || `📢 Paciente ${nombreUsuario} ha llegado - Categoría ${categoria}`,
      tipo, // puede ser 'llegada' o 'aviso'
      estado: 'pendiente',
      leido: false,
      fecha: new Date()
    });

    const guardada = await nueva.save();
    res.status(201).json({ mensaje: 'Notificación registrada', notificacion: guardada });
  } catch (error) {
    console.error('❌ Error al registrar notificación:', error);
    res.status(500).json({ mensaje: 'Error al registrar notificación', error });
  }
}
