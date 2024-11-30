import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

// Component that allows users to update their profile information (email, first name, last name, and password).
const UpdateProfileForm = () => {
  // Access the `user` object and `setUser` function from the UserContext.
  const { user, setUser } = useContext(UserContext);

  // Initialize state for form fields.
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    newEmail: user.email,
    currentPassword: '',
    newPassword: '',
  });

  // State to toggle password reset fields visibility.
  const [resetPassword, setResetPassword] = useState(false);
  // Reset password fields when they are hidden
  useEffect(() => {
    if (!resetPassword) {
      setFormData((prevData) => ({
        ...prevData,
        currentPassword: '',
        newPassword: '',
      }));
    }
  }, [resetPassword]);

  // State to handle loading state during form submission.
  const [loading, setLoading] = useState(false);

  // State to store any error messages during form submission.
  const [error, setError] = useState('');

  // Handle form field changes and update the state accordingly.
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the user profile.
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior.
    setLoading(true); // Set loading state to true.
    setError(''); // Clear any previous error messages.
    
    try {
      // Send a request to update the user data.
      const { data } = await axios.patch('/api/auth/user', {
        id: user.id, // Include the user ID in the request.
        ...formData, // Include the updated form data.
      });

      // Update the user context with the new data.
      setUser({ id: user.id, ...data });
      setLoading(false); // Set loading state to false.
    } catch (err) {
      // Set error message if the request fails.
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setLoading(false); // Set loading state to false.
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Email field */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="newEmail"
          value={formData.newEmail}
          onChange={handleChange}
          required // Make this field required.
        />
      </div>

      {/* First name field */}
      <div>
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required // Make this field required.
        />
      </div>

      {/* Last name field */}
      <div>
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required // Make this field required.
        />
      </div>

      {/* Button to toggle password reset fields */}
      <button
        type="button"
        onClick={() => {
          setResetPassword(!resetPassword);
        }}
      >
        {resetPassword ? 'Cancel' : 'Reset password'}
      </button>

      {/* Conditional rendering for password reset fields */}
      {resetPassword && (
        <>
          <div>
            <label>Current password:</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required // Make this field required.
            />
          </div>

          <div>
            <label>New password:</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required // Make this field required.
            />
          </div>
        </>
      )}

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Submit button with loading state */}
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Submit changes'}
      </button>
    </form>
  );
};

export default UpdateProfileForm;
