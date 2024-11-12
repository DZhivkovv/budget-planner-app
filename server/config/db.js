const mongoose = require('mongoose');

// An asynchronous function to connect to MongoDB
async function connectToDB() {
    try {
        // Attempt to connect to MongoDB using the URL from environment variables
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected successfully'); // Log success message
    } catch (error) {
        console.error('MongoDB connection error:', error.message); // Log error message
        process.exit(1); // Exit the process if the connection fails
    }
}

// Export the connectToDB function so it can be used in other files
module.exports = connectToDB;
