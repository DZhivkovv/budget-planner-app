const express = require('express');
// Create a router object
const router = express.Router(); 

// Import 'registerUser' and 'loginUser' functions that handle the logic for user registration and login.
const { registerUser, loginUser } = require('../controllers/authController'); 

// POST route for the '/register' endpoint. This route handles the user registration process.
router.post('/register', registerUser); 
// POST route for the '/login' endpoint. This route handles the user login process.
router.post('/login', loginUser); 

// Export the router instance so it can be used in other parts of the application.
module.exports = router; 