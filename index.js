import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { routes } from './src/routes/index.js';
import { dbConnection } from './src/database/config/config.js';
import { handleJsonSyntaxError, notFoundURL } from './src/middlewares/index.js';

dotenv.config();

//Crear el servidor de express
const app = express();

// CONEXION MONGO DATABASE
dbConnection();

//Middlewares
app.use(json());
app.use(cors());
app.use(handleJsonSyntaxError);

// Cargar los enrutadores
routes({ app });

//Middleware para manejar URL no encontradas
app.use(notFoundURL);

// Direccion por Defecto
app.get('/', (req, res) => {
    res.send('Signando Backend - Default Route');
});

// Escuchar Peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});