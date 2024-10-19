import React, { useState } from 'react';
import { db } from '../firebase';  // Assurez-vous que Firebase est bien configuré
import { collection, addDoc } from 'firebase/firestore';

const TransactionForm = () => {
  const [type, setType] = useState('cotisation');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      description,
    };

    try {
      await addDoc(collection(db, 'transactions'), newTransaction);
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
      alert('Transaction ajoutée avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la transaction :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Ajouter une transaction</h2>

      {/* Type de transaction */}
      <label className="block mb-2">
        Type de transaction :
        <select value={type} onChange={(e) => setType(e.target.value)} className="block w-full p-2 border rounded">
          <option value="cotisation">Cotisation</option>
          <option value="dépense">Dépense</option>
        </select>
      </label>

      {/* Montant */}
      <label className="block mb-2">
        Montant :
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full p-2 border rounded"
          placeholder="Montant"
        />
      </label>

      {/* Catégorie */}
      <label className="block mb-2">
        Catégorie :
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full p-2 border rounded"
          placeholder="Catégorie"
        />
      </label>

      {/* Date */}
      <label className="block mb-2">
        Date :
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </label>

      {/* Description */}
      <label className="block mb-4">
        Description :
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border rounded"
          placeholder="Description (facultatif)"
        />
      </label>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </form>
  );
};

export default TransactionForm;
