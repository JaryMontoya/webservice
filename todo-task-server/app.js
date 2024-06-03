const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Crear aplicación Express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const tasksRouter = require('./routes/tasks'); // Asegúrate de que la ruta es correcta
app.use('/api', tasksRouter);

module.exports = app;
