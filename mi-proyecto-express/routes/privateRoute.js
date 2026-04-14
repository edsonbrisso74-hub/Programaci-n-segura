const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Ruta protegida aplicando el middleware
router.get('/', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Acceso concedido a ruta privada',
    data: {
      secret: 'Información confidencial del patrón MVC'
    },
    user: req.user
  });
});

module.exports = router;