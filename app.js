const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const url = 'mongodb://localhost:27017/Ebook';
mongoose.connect(url)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model
const Schema = mongoose.Schema;
const userSchema = new Schema({
    title: String,
    author: String,
    link: String
});
const User = mongoose.model('books', userSchema);

// Route to add a new user
app.post('/addUser', async (req, res) => {
    const { title , author , link} = req.body;
    const newUser = new User({ title , author , link});

    try {
        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Error adding user' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});