import React from 'react'
import { Navigate } from 'react-router-dom'

// ProtectedRoute component to conditionally display page or redirect to another route (redirectPath)
const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
    // If the condition is not met (the page is not allowed), the user gets navigatet to the specified redirect path (redirectPath).
    if (!isAllowed) {
        return <Navigate to={redirectPath} />
    }

    // If the condition is met (the page is allowed), render the children components
    return children;
}

export default ProtectedRoute