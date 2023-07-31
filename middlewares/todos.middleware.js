const dataFilePath = './dev-data/questions.json'
import fs from 'fs';

module.exports ={
     checkExist: (req, res, next) => {
        const id = parseInt(req.params.id);
        const { title } = req.body;
        
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ message: 'Error reading data' });
            }
            const todos = JSON.parse(data);

            // Check by ID
            if (id) {
                const todoById = todos.find((todo) => todo.id === id);
                if (!todoById) {
                    return res.status(404).json({ message: 'Todo not found' });
                }
            }
            // Check by title
            if (title) {
                const todoByTitle = todos.find((todo) => todo.title === title);
                if (todoByTitle) {
                    return res.status(409).json({ message: 'Todo already exists' });
                }
            }
            next();
        });
    }
}

