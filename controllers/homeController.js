const path = require('path');

exports.displayView = (req, res) => {
  try {
    const viewPath = path.join(__dirname, '../views/index.html');
    res.sendFile(viewPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

