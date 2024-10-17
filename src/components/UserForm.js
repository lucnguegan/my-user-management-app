import React, { useState } from 'react';
import SignUpForm from './SignUpForm'; // Assure-toi d'importer le formulaire d'inscription

const UserForm = () => {
    return (
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        <SignUpForm /> {/* Inclure le formulaire d'inscription ici */}
      </div>
    );
  };

export default UserForm;
