import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // État pour savoir si on modifie un utilisateur
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "users");
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.id); // Active l'édition pour l'utilisateur sélectionné
    setFormData({ ...user }); // Pré-remplir le formulaire avec les données actuelles
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, "users", editingUser); // Référence à l'utilisateur à modifier
      await updateDoc(userRef, { ...formData }); // Mise à jour des données dans Firestore
      setUsers(users.map(user => (user.id === editingUser ? { ...user, ...formData } : user))); // Met à jour la liste d'utilisateurs localement
      setEditingUser(null); // Réinitialise l'état après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    }
  };

  const roles = ["admin", "utilisateur", "modérateur"]; // Liste des rôles prédéfinis

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
      {editingUser ? (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Modifier l'utilisateur</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <input
              type="text"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="border p-2 mr-2 mb-2"
            />
            <input
              type="text"
              placeholder="Nom"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="border p-2 mr-2 mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border p-2 mr-2 mb-2"
            />
            
            {/* Dropdown pour sélectionner un rôle */}
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="border p-2 mr-2 mb-2"
            >
              <option value="">Sélectionner un rôle</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Enregistrer
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setEditingUser(null)}
            >
              Annuler
            </button>
          </form>
        </div>
      ) : null}
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-left text-gray-600">Prénom</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Nom</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Email</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Rôle</th>
            <th className="py-2 px-4 border-b text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.firstName}</td>
              <td className="py-2 px-4 border-b">{user.lastName}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
