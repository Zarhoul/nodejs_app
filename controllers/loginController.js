const User = require('../models/user');
const path = require('path');

exports.displayLoginForm = (req, res) => {
    try {
      const viewPath = path.join(__dirname, '../views/auth/login.html');
      console.log(viewPath);
      res.sendFile(viewPath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Process the login form submission
exports.processLogin = async (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
    
    try {
      // Find the user with the provided username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Verify the password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // If the user has the "admin" role, redirect to the gestion data users route
      if (user.role === 'admin') {
        res.redirect('/listUsers');
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  