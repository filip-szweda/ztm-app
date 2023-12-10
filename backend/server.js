// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Connect to MongoDB
mongoose
  .connect("mongodb://admin:admin@localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ztm-app",
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Define a User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Initialize Express App
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080', // or the specific origin of your Vue app
  methods: ['GET', 'POST'], // allowed methods
  credentials: true // if your frontend needs to send cookies or credentials with requests
}));

app.get('/', (req, res) => {
  res.json({ app: 'Run app' });
});

// User Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

// User Login Endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
