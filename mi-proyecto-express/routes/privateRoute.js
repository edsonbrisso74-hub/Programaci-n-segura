const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

//Ruta protegida apicando el middleware
router.get('/', verifyToken, (req, res) => {
    res.json({
        mensaje: 'Acceso concedido a ruta privada',
        datos: {secreto: 'Información confidencial del patrón MVC' },
        usuario: req.user
    });
});

module.exports = router;