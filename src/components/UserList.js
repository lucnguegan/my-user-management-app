import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="p-4 border rounded bg-gray-100">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
