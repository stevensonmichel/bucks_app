import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import Cookies from 'js-cookie';

interface BankAccount {
  id: number;
  name: string;
  type: string;
  balance: number;
}

const Accounts: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [linkToken, setLinkToken] = useState<string | null>(null);

  // Fetch connected bank accounts (mock data for now)
  useEffect(() => {
    const mockBankAccounts: BankAccount[] = [
      { id: 1, name: 'Checking Account - Bank of America', type: 'Checking', balance: 1500.75 },
      { id: 2, name: 'Savings Account - Chase', type: 'Savings', balance: 3000.50 },
    ];

    setBankAccounts(mockBankAccounts); // Replace with actual API data when ready
  }, []);

  // Function to handle connecting to the bank (fetch link token and open Plaid)
  const handleConnectBank = useCallback(async () => {
    try {
      // Fetch the link token from the server when the button is clicked
      const token = localStorage.getItem('access_token');
      // const csrfToken = Cookies.get('csrftoken') || '';
      console.log("For create_link_token, the access token is", token)

      const response = await fetch('http://127.0.0.1:8000/api/plaid/create_link_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });


      if (!response.ok) {
        throw new Error('Failed to fetch link token');
      }
  
      // Get the response data
      const data = await response.json();
  
      // Set the link token in state
      setLinkToken(data.link_token);
  
    } catch (error) {
      console.error('Error fetching link token:', error);
    }
  }, []); 


  // Plaid Link Setup (only set up when linkToken is available)
  const { open, ready } = usePlaidLink({
    token: linkToken ?? '',
    onSuccess: async (public_token, metadata) => {
      try {
        // Send the public token to the server to exchange for access token
        await axios.post('http://127.0.0.1:8000/api/plaid/exchange_public_token/', {
          public_token,
        });
        console.log('Successfully connected to the bank');
      } catch (error) {
        console.error('Error exchanging public token:', error);
      }
    },
    onExit: (error) => {
      if (error) {
        console.error('Error or user exited Plaid Link:', error);
      }
    },
  });

  useEffect(() => {
    // Open the Plaid Link once the link token is available
    if (linkToken) {
      open();
    }
  }, [linkToken, open]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-6">Connected Bank Accounts</h2>

      {/* List connected bank accounts */}
      {bankAccounts.length === 0 ? (
        <p className="text-gray-600">No bank accounts connected.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-100 shadow-md rounded-lg">
          <thead className="bg-cyan-400 text-white">
            <tr>
              <th className="px-4 py-4">Account Name</th>
              <th className="px-4 py-4">Account Type</th>
              <th className="px-4 py-4">Balance</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((account) => (
              <tr key={account.id} className="border-b bg-white">
                <td className="px-4 py-4">{account.name}</td>
                <td className="px-4 py-4">{account.type}</td>
                <td className="px-4 py-4">${account.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Button to connect to bank using Plaid */}
      <div className="mt-6">
        <button
          onClick={handleConnectBank}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Connect to Bank
        </button>
      </div>
    </div>
  );
};

export default Accounts;
