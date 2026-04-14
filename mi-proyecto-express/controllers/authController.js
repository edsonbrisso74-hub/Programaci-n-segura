const jwt = require('jsonwebtoken');

//Clve secreta (deberia estar en variable de entorno)
const SECRET_KEY = process.env.JWR_SECRET || 'mi_secreto_super_seguro_2026';

// ✅ Array de usuarios ficticios
const usuarios = [
  { id: 1, username: 'estudiante', password: '1234' },
  { id: 2, username: 'profesor',   password: 'abcd' }
];

exports.login = (req, res) => {
    const { username, password } = req.body;

  // ✅ Validar credenciales contra el array
  const usuario = usuarios.find(
    u => u.username === username && u.password === password
  );

    if (!usuario) {
    // ✅ Respuesta 401 si las credenciales son incorrectas
    return res.status(401).json({
      message: 'Credenciales incorrectas. No autorizado.'
    });
  }
    //Generar el token (payload, secret, options)
    const payload = { id: usuario.id, username: usuario.username };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    //  Enviar token como cookie httpOnly
    res.cookie('token', token, {
    httpOnly: true,
    secure: false, // ← Cambiar a true si usas HTTPS
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
  });

    res.json({ mensaje: 'Autenticación exitosa'});
};

exports.logout = (req, res) => {
  // ✅ Eliminar la cookie para cerrar sesión
  res.clearCookie('token', {
    httpOnly: true,
    secure: false, // igual que al crearla
    sameSite: 'strict'
  });

  res.json({ message: 'Sesión cerrada correctamente' });
};