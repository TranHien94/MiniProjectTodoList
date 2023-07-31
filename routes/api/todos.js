
import express from 'express';
import fs from 'fs';
import { checkExist } from '../../middlewares/todos.middleware';
const router = express.Router();
const dataFilePath = './dev-data/questions.json'

// Get all
router.get('/', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data'});
        }
        const todos = JSON.parse(data);
        res.json(todos);
    });
});

// Get by ID
router.get('/:id', checkExist, (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data' });
        }
        const todos = JSON.parse(data);
        const todo = todos.find((p) => p.id === id);
        if (!todo) {
            return res.status(404).json({ message: 'Todos not found' });
        }
        res.json(todo);
    });
});

// Create
router.post('/', checkExist, (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data' });
        }
        const todos = JSON.parse(data);
        const existingTodo = todos.find((todo) => todo.title === title);
        if (existingTodo) {
            return res.status(409).json({ message: 'Todo already exists' });
        }
        const newTodo = { id: (todos.length + 1) +1, title };
        todos.push(newTodo);
        const newData = JSON.stringify(todos);
        fs.writeFile(dataFilePath, newData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing data' });
            }
            res.status(201).json({ message: 'Create successfully' });
        });
    });
});

// Update by ID
router.put('/:id', checkExist, (req, res) => {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data' });
        }
        const todos = JSON.parse(data);
        const todoIndex = todos.findIndex((p) => p.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        todos[todoIndex].title = title;
        const newData = JSON.stringify(todos);

        fs.writeFile(dataFilePath, newData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing data' });
            }
            res.json({ message: 'Update successfully'});
        });
    });
});

// Delete by ID
router.delete('/:id', checkExist, (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading data' });
        }
        const todos = JSON.parse(data);
        const todoIndex = todos.findIndex((p) => p.id === id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        const deletedTodo = todos.splice(todoIndex, 1)[0];
        const newData = JSON.stringify(todos);
        fs.writeFile(dataFilePath, newData, 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing data' });
            }
            res.json({ message: 'Delete successfully' });
        });
    });
});

export default router;


