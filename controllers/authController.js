const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const secret= 'supersecretkey'

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, config.secret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login };
