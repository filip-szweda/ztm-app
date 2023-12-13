const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

mongoose
  .connect("mongodb://admin:admin@localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ztm-app",
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  stopsIds: [String],
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.json({ app: 'Run app' });
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, stopsIds: [] });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

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

app.post('/updateStopId', async (req, res) => {
  try {
    const { token, stopId } = req.body;

    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }

      const userId = decoded.id;

      updateUserStopId(userId, stopId)
        .then(() => {
          res.send({ message: 'Stop ID updated successfully' });
        })
        .catch(error => {
          res.status(500).send('Error updating Stop ID: ', error.response.data);
        });
    });
  } catch (error) {
    res.status(500).send(error.response.data);
  }
});

function updateUserStopId(userId, stopId) {
  return User.findOneAndUpdate(
    { 
      _id: userId,
      stopsIds: { $ne: stopId }
    }, 
    { $push: { stopsIds: stopId } },
    { new: true }
  ).exec();
}

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
