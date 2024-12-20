 // Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const app = express();
// Use middleware to parse JSON bodies from incoming requests.
app.use(express.json());
// Use cookie-parser middleware to access cookies in the request object.
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
// Setup CORS to allow requests the frontend
app.use(cors({
    origin: process.env.FRONTEND_ORIGIN, // Explicitly allow your frontend origin
    credentials: true, // Enable cookies or other credentials
    }
));

// Import the MongoDB connection function
const connectToDB = require('./config/db.js');
// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
    console.log("Server is running!");
});

// Connect to MongoDB database
connectToDB();

const authRoutes = require('./routes/auth.js');
app.use('/api/auth/', authRoutes);
