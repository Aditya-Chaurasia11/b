// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../../controller/Task');

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);

module.exports = router;
