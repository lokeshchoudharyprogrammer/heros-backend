const express = require('express');
const mongoose = require('mongoose');
const cors =require("cors")
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const config = require('./dbs/config');

const app = express();
app.use(express.json());
app.use(cors())
const database='mongodb+srv://lokesh:lokeshcz@cluster0.dsoakmx.mongodb.net/herobackend?retryWrites=true&w=majority&appName=Cluster0' // Update with your MongoDB URI

// Connect to MongoDB
mongoose.connect(database, {
  useNewUrlParser: true,
 
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // Optional: If you have user routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
