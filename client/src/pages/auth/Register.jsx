import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

// Register component for user registration
const Register = () => {
  // State to store the first name entered by the user
  const [firstName, setFirstName] = useState('');
  // State to store the last name entered by the user
  const [lastName, setLastName] = useState('');
  // State to store the email entered by the user
  const [email, setEmail] = useState('');
  // State to store the password entered by the user
  const [password, setPassword] = useState('');
  // Access the user context to determine if the user is already logged in
  const {user} = useContext(UserContext); 

  // State to determine if the user should be redirected to a different route in the application. Initially set to false. This means no redirection is needed when the component mounts.  
  const [redirect, setRedirect] = useState(false);


  // Function to handle the registration form submission
  async function onRegister(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // POST request to the '/api/auth/register' endpoint with user registration data (first name, last name, email and password).
    await axios.post('/api/auth/register', {
      firstName, 
      lastName, 
      email, 
      password
    });

    // Trigger navigation to different route in the app.
    setRedirect(true);
  }

  // Check if the user should be redirected to different route in the app.
  if (redirect)
  {
    // The user should be redirected to different route in the app.

    // The user gets redirected to the login page.
    return <Navigate to="/login" replace/>
  }

  // Check if the user is logged in.
  if (user)
  {
    // The user is logged in.

    // The user will be redirected to homepage
    return <Navigate to='/' replace/>
  }  

  return (
    <div>
      <h2>Регистрация</h2>

      {/* Registration form */}
      <form onSubmit={onRegister}>

        {/* Input field for the first name */}
        <div>
          <label>Име:</label>
          <input
            type="text"
            value={firstName}
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
            required
          />
        </div>

        {/* Input field for the last name */}
        <div>
          <label>Фамилия:</label>
          <input
            type="text"
            value={lastName}
            onChange={(event) => {
              setLastName(event.target.value);
            }}
            required
          />
        </div>

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

        {/* Button to submit the registration form */}
        <button type="submit">Регистрирайте се</button>
      </form>

      {/* Link to navigate to the login page if the user already has an account in the app. */}
      <p>
        Вече имате акаунт? <Link to={'/login'}>Вход</Link>
      </p>
    </div>
  );
};

export default Register;