import React, { useState } from 'react';
import { createUserWithRole } from '../firebase'; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // rôle par défaut

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithRole(email, password, role);
      alert("Utilisateur créé avec succès !");
    } catch (error) {
      alert("Erreur lors de la création de l'utilisateur: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
