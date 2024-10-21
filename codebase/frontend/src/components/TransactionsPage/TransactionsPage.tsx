import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../services/PlaidService';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Your Transactions</h1>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction}>
              {transaction}: ${transaction}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsPage;
