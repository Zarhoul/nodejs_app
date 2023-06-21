const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user role
exports.authenticateToken = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, ''); // Replace 'your_secret_key' with your actual secret key used for signing the token

    // Extract the user's role from the decoded token
    req.user = { role: decoded.role }; // Assuming the user's role is stored in the 'role' field of the token

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Access denied. Invalid token.' });
  }
};
