import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="p-5 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p>Email : {user.email}</p>
    </div>
  );
};

export default UserProfile;
