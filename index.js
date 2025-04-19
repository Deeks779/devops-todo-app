require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/Todo'); // Import the Todo model

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes

// 1. Get all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// 2. Add a new todo
app.post('/todos', async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = new Todo({
            task,
            completed: false
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// 3. Delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
