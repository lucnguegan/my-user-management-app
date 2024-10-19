import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-4">Gestion des finances familiales</h1>
      <p className="text-lg text-gray-700 mb-8">
        Bienvenue sur l'application de gestion des finances familiales. Suivez les cotisations, les dépenses et les rapports mensuels.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/cotisations" className="bg-green-500 text-white px-4 py-2 rounded shadow">
          Gérer les cotisations
        </Link>
        <Link to="/depenses" className="bg-red-500 text-white px-4 py-2 rounded shadow">
          Gérer les dépenses
        </Link>
        <Link to="/rapports" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          Visualiser les rapports
        </Link>
        <Link to="/Utilisateurs" className="bg-yellow-500 text-white px-4 py-2 rounded shadow">
          Gérer les utilisateurs
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
