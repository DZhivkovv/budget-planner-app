const express = require('express');
const app = express();
// Import the MongoDB connection function
const connectToDB = require('./config/db.js'); 
// Load environment variables from .env file
require('dotenv').config(); 

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log("Server is running!");
});

// Connect to MongoDB database
connectToDB();
