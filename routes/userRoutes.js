const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');

// Route to display the page home
router.get('/', homeController.displayView);

// Route to display the login form
router.get('/login', loginController.displayLoginForm);

// Route to handle the login form submission
router.post('/login', loginController.processLogin);

// Define gestion data users routes
router.get('/listUsers', userController.displayListUsers);
router.get('/users', userController.getAllUsers);
router.get('/add', userController.getAddUser);
router.get('/edit/:id', userController.getEditUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
