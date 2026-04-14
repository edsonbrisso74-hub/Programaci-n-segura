const jwt = require('jsonwebtoken');

// Clave secreta (idealmente desde variable de entorno)
const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_seguro_2026';

// Array de usuarios ficticios
const usuarios = [
  { id: 1, username: 'estudiante', password: '1234' },
  { id: 2, username: 'profesor', password: 'abcd' }
];

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validar que se envíen credenciales
  if (!username || !password) {
    return res.status(400).json({
      message: 'Debe ingresar usuario y contraseña.'
    });
  }

  // Validar credenciales contra el array
  const usuario = usuarios.find(
    u => u.username === username && u.password === password
  );

  // Si las credenciales son incorrectas
  if (!usuario) {
    return res.status(401).json({
      message: 'Credenciales incorrectas. No autorizado.'
    });
  }

  // Generar el token
  const payload = { id: usuario.id, username: usuario.username };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  // Enviar token como cookie httpOnly
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  return res.status(200).json({
    message: 'Autenticación exitosa'
  });
};

exports.logout = (req, res) => {
  // Eliminar cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  });

  return res.status(200).json({
    message: 'Sesión cerrada correctamente'
  });
};