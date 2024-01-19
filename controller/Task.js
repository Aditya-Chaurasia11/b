// controllers/taskController.js
const Task = require("../modals/Task");

const createTask = async (req, res) => {
  try {
    const { name, description, assignedUser } = req.body;
    const task = await Task.create({ name, description, assignedUser });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("assignedUser", "username");
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createTask, getTasks };
