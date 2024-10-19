import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionsCollection = collection(db, 'transactions');
      const transactionsSnapshot = await getDocs(transactionsCollection);
      const transactionsList = transactionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsList);
    };

    fetchTransactions();
  }, []);

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b text-left text-gray-600">Type</th>
          <th className="py-2 px-4 border-b text-left text-gray-600">Montant</th>
          <th className="py-2 px-4 border-b text-left text-gray-600">Catégorie</th>
          <th className="py-2 px-4 border-b text-left text-gray-600">Date</th>
          <th className="py-2 px-4 border-b text-left text-gray-600">Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{transaction.type}</td>
            <td className="py-2 px-4 border-b">{transaction.amount} €</td>
            <td className="py-2 px-4 border-b">{transaction.category}</td>
            <td className="py-2 px-4 border-b">{new Date(transaction.date.seconds * 1000).toLocaleDateString()}</td>
            <td className="py-2 px-4 border-b">{transaction.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
