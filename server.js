const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// Serve static files from the "views" directory
app.use(express.static(path.join(__dirname, 'views')));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/dbtest', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB', error);
  });
