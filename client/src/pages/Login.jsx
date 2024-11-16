import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Login component for user login
const Login = () => {
  // State to store the email entered by the user
  const [email, setEmail] = useState('');
  // State to store the password entered by the user
  const [password, setPassword] = useState('');

  // Function to handle the login form submission
  function onLogin(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
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