const User = require("../models/User");


const getUser = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from JWT
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUser };
