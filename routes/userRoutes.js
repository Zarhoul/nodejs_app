const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to display the login form
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './views/auth' });
});

// Route to handle the login form submission
router.post('/login', userController.login);

// Route to display the user list (accessible only for admin users)
router.get('/listUsers', userController.displayView);

// Define other routes
router.get('/', userController.getAllUsers);
router.get('/add', userController.getAddUser);
router.get('/edit/:id', userController.getEditUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
