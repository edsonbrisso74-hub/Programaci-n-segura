const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_seguro_2026';

const verifyToken = (req, res, next) => {
  // Leer el token desde la cookie
  const token = req.cookies?.token;

  // Si no hay token, denegar acceso
  if (!token) {
    return res.status(401).json({
      message: 'Acceso denegado. No hay token.'
    });
  }

  try {
    // Verificar token
    const verified = jwt.verify(token, SECRET_KEY);

    // Guardar datos del usuario autenticado
    req.user = verified;

    // Continuar hacia la ruta protegida
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token no válido o expirado.'
    });
  }
};

module.exports = verifyToken;