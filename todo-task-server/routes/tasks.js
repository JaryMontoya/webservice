const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb://localhost/todo-task', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de Tarea
const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

// Obtener todas las tareas
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear una nueva tarea
router.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Actualizar una tarea
router.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Eliminar una tarea
router.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
