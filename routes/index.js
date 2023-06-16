const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router loaded!!"); // Display a message when the router is loaded

// Route for the home page
router.get('/', homeController.home);

// Route for handling user-related routes
router.use('/users', require('./users'));

module.exports = router;
