import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProfilePage from './pages/auth/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

// Import the configuration settings for the axios library.
import './config/axios'

import './App.css';

function App() {
  // Access user state from UserContext
  const { user, ready } = useContext(UserContext); 

  // Show a loading indicator while user data is being fetched
  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    // Wrapping the application with BrowserRouter enables routing
    <BrowserRouter>      
      {/* All routes in the application */}
      <Routes>
        {/* Route for the Registration page, accessible at '/register' */}
        <Route 
          path='/register'
          element={
            // Only unauthenticated users can access the registration page. Authenticated users will get redirected to the homepage ('/').
            <ProtectedRoute isAllowed={!user} redirectPath={'/'}>
              <Register />
            </ProtectedRoute>
          } 
        />

        {/* Route for the Login page, accessible at '/login' */}
        <Route 
          path='/login'
          element={
            // Only unauthenticated users can access the login page. Authenticated users will get redirected to the homepage ('/').
                <ProtectedRoute isAllowed={!user} redirectPath={'/'}>
              <Login /> 
            </ProtectedRoute>
          }
        />

        {/* Route for the user profile page, accessible at '/profile' */}
        <Route 
          path='/profile'
          element={
            // Only authenticated users can access the profile page. Unauthenticated users will get redirected to the login page ('/login').
            <ProtectedRoute isAllowed={!!user} redirectPath={'/login'}>
              <ProfilePage user={user} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
