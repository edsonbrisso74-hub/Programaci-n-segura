const express = require( 'express');
const app = express();
const privateRoutes = require('./routes/privateRoute');
const authController = require('./controllers/authController');

app.use(express.json());

//Ruta pública para login
app.post('/login', authController.login);

//Ruta protegida
app.use('/private', privateRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});