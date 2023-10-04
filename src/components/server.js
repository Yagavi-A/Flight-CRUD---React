const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

// Define a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Create an Express app
const app = express();

// Parse JSON body
app.use(express.json());

// Enable CORS
app.use(cors());

// Define a route for user registration
// app.post('/', async (req, res) => {
//   const { name, email, password } = req.body;

//   // Check if a user with the same email already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User with this email already exists' });
//   }

//   // Create a new user
//   const newUser = new User({ name, email, password });
//   await newUser.save();

//   // Registration successful
//   res.status(200).json({ message: 'User registered successfully' });
// });

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if a user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.send('User with this email already exists');
  }

  // Create a new user
  await User.create({ name, email, password });

  // User creation successful
  res.send('User created successfully');
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
