import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';

const PersonalDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user || {});

  // Sync updatedUser with user prop on initial render or when user changes
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = (newUserData) => {
    if (newUserData) {
      setUpdatedUser(newUserData); // Update the user state with new data
    }
    setIsEditing(false);
  };

  if (!updatedUser) {
    return <div>Loading...</div>; // Or show a loading spinner
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700">
            <strong>Full Name:</strong>{' '}
            {`${updatedUser.firstName} ${updatedUser.lastName}`}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {updatedUser.email}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {updatedUser.role}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>User ID:</strong>{' '}
            <span className="text-gray-500">{updatedUser._id}</span>
          </p>
          <p className="text-gray-700">
            <strong>Joined Date:</strong>{' '}
            {new Date(updatedUser.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleEditClick}
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-dark"
        >
          Edit Profile
        </button>
      </div>
      {isEditing && (
        <EditProfile user={updatedUser} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default PersonalDetails;
