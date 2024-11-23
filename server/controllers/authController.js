const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validatePassword } = require('../utils/authUtils');

// Controller function to handle user registration
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body; // Extract user details from the request body
        
        // Data validation:
        // Check if some of the required data is missing
        if (!firstName || !lastName || !email || !password) {
            // Return a response indicating that a piece of required for the user registration data is missing.
            return res.status(400).json({ message: "All fields are required" });
        }
        // Check if the user password is invalid
        if (!validatePassword(password))
        {
            // The user password is invalid
            
            // Return a response indicating that the user password is invalid.
            return res.status(400).json({ message: "Password must be between 8 and 128 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character." });
        }

        // User registration:
        // Search the database for user with the provided email
        const existingUser = await User.findOne({ email });
        // Check if user with the provided email already exists
        if (existingUser) {
            // User with the provided email already exists.

            // Return a response indicating that user with this email already exists.
            return res.status(409).json({ message: "User with this email address already exists" });
        }

        // Hash the user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const userDocument = new User({ firstName, lastName, email, password: hashedPassword });
        await userDocument.save();

        // Return a response indicating the user was successfully registered
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in registerUser:", error);

        // Return a response indicating that there is an internal server error.
        return res.status(500).json({ error: "An internal server error occurred" });
    }
};



module.exports = {
    registerUser,
}