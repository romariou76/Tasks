import Task from "../models/task.model.js"

export const getTasks = async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
}

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;

  const newTask = new Task({
    title,
    description,
    date
  });

  const savedTask = await newTask.save();
  res.json(savedTask);

}

export const getTask = async (req, res) => {}
export const updateTask = async (req, res) => {}
export const deleteTask = async (req, res) => {}