import { useState } from 'react';
import UpdateProfileForm from '../../components/UpdateProfileForm';

const ProfilePage = () => {
  const [editUser, setEditUser] = useState(false);  
  return (
    <div>
      {/* Button to enable editing of user data */}
      <button onClick={() => { setEditUser(true) }}>Edit Profile</button>
      
      {/* Conditionally render the update form and undo button */}
      {editUser && (
        <div>
          {/* Render the form to update user profile */}
          <UpdateProfileForm />
          
          {/* Button to cancel editing */}
          <button onClick={() => { setEditUser(false) }}>Cancel Edit</button>
        </div>
      )}
    </div>
  )
}

export default ProfilePage;
