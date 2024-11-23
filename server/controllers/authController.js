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


// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract user details from the request body

        // Attempt to find a user in the database with the provided email.
        const user = await User.findOne({ email });
        // If no user is found, return a response with an error message.
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
           
        
        // Compare the provided password with the hashed password stored in the database
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // If the passwords do not match, return a response with an error message.
        if (!passwordsMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

    // The account with the provided email exists, and the provided password is valid.
    // Generate a JSON Web Token.
    const token = jwt.sign(
        { email: user.email, id: user._id }, 
        process.env.JWT_SECRET,
        // Token expiration time set to 1 hour
        { expiresIn: '1h' }                 
    );

    // Set the generated JWT as an HTTP-only cookie 
    res
        .cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' })
        .status(200) // Send HTTP 200 OK status
        .json({
            message: "User authenticated successfully", 
            user, // Return user details (excluding sensitive information) for client-side use
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};


module.exports = {
    registerUser,
    loginUser
}