// Function to validate user password
function validatePassword(password) {
    const minLength = 8;  // Minimum length of the password
    const maxLength = 128;  // Maximum length of the password

    // Regular expression to ensure password complexity:
    // - At least one lowercase letter
    // - At least one uppercase letter
    // - At least one digit
    // - At least one special character from the set !@#$%^&*
    // - Length between 8 and 128 characters
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,128}$/;

    // If if the password meets all criteria return true, false otherwise.
    return (
        password.length >= minLength &&
        password.length <= maxLength &&
        regex.test(password)
    );
}

// Export the validatePassword function.
module.exports = { validatePassword };
