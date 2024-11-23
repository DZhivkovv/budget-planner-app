import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

// Login component for user login
const Login = () => {
  // State to store the email entered by the user
  const [email, setEmail] = useState('');
  // State to store the password entered by the user
  const [password, setPassword] = useState('');
  // Access the setUser function from the UserContext to update the global user state and the user object to determine if the user is already logged in
  const {user, setUser} = useContext(UserContext)
  
  // State to determine if the user should be redirected to a different route in the application. Initially set to false, which means no redirection is needed when the component mounts.    
  const [redirect, setRedirect] = useState(false);


  // Function to handle the login form submission
  async function onLogin(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // POST request to the '/api/auth/login' endpoint with user login data (email and password).
    const {data} = await axios.post('/api/auth/login', {
      email, 
      password
    })
    // Update the global user state with the data of the logged-in user.
    // This updates the user context across the app after a successful login.
    setUser(data.user);
    // Trigger navigation to different route in the app.
    setRedirect(true);
  }

  // Check if the user should be redirected to different route in the app.
  if (redirect)
    {
      // The user should be redirected to different route in the app.
  
      // The user gets redirected to the home page ('/').
      return <Navigate to="/" replace/>
  }

  // Check if the user is already logged in.
  if (user)
  {
    // The user is already logged in.

    // The user will be redirected to homepage
    return <Navigate to='/' replace/>
  }

  return (
    <div>
      <h2>Вход</h2>

      {/* Login form */}
      <form onSubmit={onLogin}>
        {/* Input field for the email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>

        {/* Input field for the password */}
        <div>
          <label>Парола:</label>
          <input
            type="password"
            placeholder="Вашата парола"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </div>

        {/* Button to submit the login form */}
        <button type="submit">Вход</button>
      </form>

      {/* Link to navigate to the registration page if the user does not have an account */}
      <p>
        Нямате акаунт? <Link to={'/register'}>Регистрирайте се</Link>
      </p>
    </div>
  );
};

export default Login;