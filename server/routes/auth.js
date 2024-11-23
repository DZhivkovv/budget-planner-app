const express = require('express');
// Create a router object
const router = express.Router(); 

// Import functions that handle the logic for user registration, login, retrieving user data and logout.
const { registerUser, loginUser, retrieveUserData, logoutUser } = require('../controllers/authController'); 

// POST route for the '/register' endpoint. This route handles the user registration process.
router.post('/register', registerUser); 
// POST route for the '/login' endpoint. This route handles the user login process.
router.post('/login', loginUser); 
// POST route for the '/logout' endpoint. This route handles the user logout process.
router.post('/logout', logoutUser); 
// GET route for the '/user' endpoint. This route handles the retrievement of authenticated user data.
router.get('/user', retrieveUserData); 


// Export the router instance so it can be used in other parts of the application.
module.exports = router; 