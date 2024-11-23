const mongoose = require('mongoose');

const Schema = mongoose.Schema; // Use mongoose Schema class for defining the schema structure

const UserModelSchema = new Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'] // First name is required
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'] // Last name is required
    },
    email: {
        type: String,
        required: [true, 'Email address is required'], // Email address is required
        unique: true, // Email address must be unique in the application.
        lowercase: true, // Store email address in lowercase
        trim: true, // Remove whitespace from email address
        validate: { 
          validator: function(v) { 
            // Validating the email address using regex.
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); 
          },
          message: props => `${props.value} is not a valid email address!` // Custom error message for invalid email
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Password is required
        minLength: 8, // The password should be at least 8 symbols long.
        maxLength: 128, // The password should be at most 128 symbols long.
        validate: {
          validator: function(v) {
            // Password must contain uppercase, lowercase, number, and special character
            if (!/[A-Z]/.test(v)) return false;
            if (!/[a-z]/.test(v)) return false;
            if (!/[0-9]/.test(v)) return false;
            if (!/[^a-zA-Z0-9]/.test(v)) return false;
            return true;
          },
          // Custom error message for invalid password
          message: props =>
            'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
        },
    },
});

// Create the User model based on the schema
const UserModel = mongoose.model('User', UserModelSchema);

module.exports = UserModel; // Export the model
