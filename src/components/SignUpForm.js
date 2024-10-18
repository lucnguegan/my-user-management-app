import React, { useState } from 'react';
import { createUserWithRole } from '../firebase'; // Assure-toi d'importer la fonction

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithRole(email, password, role, firstName, lastName);
      alert("Utilisateur créé avec succès !");
    } catch (error) {
      alert("Erreur lors de la création de l'utilisateur: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" required />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Utilisateur</option>
        <option value="admin">Admin</option>
        <option value="moderator">Modérateur</option>
      </select>
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default SignUpForm;
