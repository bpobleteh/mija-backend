const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
    
    // Puede ser funcionario o usuario, según el tipo que guardaste en el token
    req.user = {
      id: decoded.id,
      tipo: decoded.tipo || 'usuario'
    };

    next();
  } catch (err) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado', error: err.message });
  }
}

module.exports = verifyToken;
