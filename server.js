const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());

// Get all users
app.get('/api/users', (req, res) => {
    res.json(db.getAllUsers());
});

// Add a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = db.addUser(name, email);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
