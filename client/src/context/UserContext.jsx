import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create a Context to manage the user state globally
export const UserContext = createContext();

// Context Provider Component
export const UserContextProvider = ({ children }) => {
    // State to hold the current user, initially set to null (not logged in)
    const [user, setUser] = useState(null);
    // State to track if the request for user data  has completed
    const [ready, setReady] = useState(false);

    // Fetch user data when the component mounts
    useEffect(() => {
        // If there's no user data yet, make a request to fetch it
        if (!user) {
            axios.get('/api/auth/user')  // Send GET request to '/api/auth/user' to get user data
                .then((response) => {
                    setUser(response.data);  // Store the fetched user data in state
                    setReady(true);  // Indicate that the user data is ready
                });
        }
    }, []);

    return (
        // Provide the user state and setter function to the rest of the app through context
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}  {/* Render children components */}
        </UserContext.Provider>
    );
};
