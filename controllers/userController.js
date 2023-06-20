const User = require('../models/user');
const path = require('path');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.displayView = (req, res) => {
  try {
    const viewPath = path.join(__dirname, '../views/index.html');
    res.sendFile(viewPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAddUser = async (req, res) => {
  try {
    res.sendFile('add.html', { root: './views' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getEditUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.sendFile('edit.html', { root: './views' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Implement your authentication logic here
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Assuming you have a 'users' collection where user data is stored
    const user = await User.findOne({ username, password });

    if (!user) {
      res.status(401).send('Invalid credentials');
      return;
    }

    // Check if the user is an admin
    if (user.role === 'admin') {
      // Redirect to the user list page if the user is an admin
      res.redirect('/listUsers');
    } else {
      // Display a message if the user is not an admin
      res.send('You do not have access to view the user list');
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

