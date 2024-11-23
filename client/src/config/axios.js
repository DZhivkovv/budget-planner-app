// File that configures the axios library, centralizing the settings. This ensures that all requests behave consistently. It also simplifies the code for individual HTTP calls.

// Import the axios library for making HTTP requests
import axios from 'axios'; 

// Set a default base URL for all HTTP requests made using axios in this app.
axios.defaults.baseURL = 'http://localhost:4000';

// Enable sending cookies with requests.
axios.defaults.withCredentials = true;
