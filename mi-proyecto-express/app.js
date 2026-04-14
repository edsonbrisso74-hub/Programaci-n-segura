const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const privateRoutes = require('./routes/privateRoute');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(cookieParser());

// Ruta pública para login
app.post('/login', authController.login);

// Ruta pública para logout
app.post('/logout', authController.logout);

// Ruta protegida
app.use('/private', privateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});