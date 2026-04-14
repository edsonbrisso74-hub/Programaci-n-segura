const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_seguro_2026';

const verifyToken = (req, res, next) => {
    //1. Leer el token desde la cookie (no desde el header)
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token'});
    }
     
    try{
        //Verificar token (asumiendo formato "Bearer <token>")
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); //Token válido, continuar a la ruta
    } catch (error) {
        return res.status(401).json({ error: 'Token no válido o expirado.'});
    }
};

module.exports = verifyToken;
