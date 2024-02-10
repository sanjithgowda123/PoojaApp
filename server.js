const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');

app.use(express.json());

// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Add a new user
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const newUser = await db.addUser(name, email);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Failed to add user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
