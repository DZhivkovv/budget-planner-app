import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  // Function to handle the registration form submission
  function onRegister(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
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
          <label>Презиме:</label>
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

      {/* Link to navigate to the login page if the user already has an account */}
      <p>
        Вече имате акаунт? <Link to={'/login'}>Вход</Link>
      </p>
    </div>
  );
};

export default Register;