import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

interface BankAccount {
  id: string;
  name: string;
  type: string;
  subtype?: string;
}

const Accounts: React.FC = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null); // Track selected account
  const navigate = useNavigate();

  // Fetch connected bank accounts
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No authentication token found');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/accounts/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const accounts = response.data.map((account: any, index: number) => ({
            id: account.account_id || index.toString(),
            name: account.name || 'Unnamed Account',
            type: account.type,
            subtype: account.subtype,
          }));
          setBankAccounts(accounts);
        }
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
      }
    };

    fetchBankAccounts();
  }, []);

  // Function to handle connecting to the bank (fetch link token and open Plaid)
  const handleConnectBank = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://127.0.0.1:8000/api/plaid/create_link_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch link token');
      }

      const data = await response.json();
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
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        await axios.post(
          'http://127.0.0.1:8000/api/plaid/exchange_public_token/',
          { public_token },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('Successfully connected to the bank');
        navigate('/accounts');
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
    if (linkToken) {
      open();
    }
  }, [linkToken, open]);

  // Handle account selection
  const handleSelectAccount = (id: string) => {
    setSelectedAccountId((prevId) => (prevId === id ? null : id)); // Toggle selection
  };

  // Handle account deletion
  const handleDeleteAccount = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this account?');
    if (confirmed) {
      setBankAccounts((prev) => prev.filter((account) => account.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-6">Connected Bank Accounts</h2>

      {bankAccounts.length === 0 ? (
        <p className="text-gray-600">No bank accounts connected.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-100 shadow-md rounded-lg">
          <thead className="bg-cyan-400 text-white">
            <tr>
              <th className="px-4 py-4 text-left">No</th>
              <th className="px-4 py-4 text-left">Account Name</th>
              <th className="px-4 py-4 text-left">Account Type</th>
              <th className="px-4 py-4 text-left">Subtype</th>
            </tr>
          </thead>
          <tbody>
            {bankAccounts.map((account, i) => (
              <tr
                key={account.id}
                className={`border-b cursor-pointer ${
                  selectedAccountId === account.id ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'
                }`}
                onClick={() => handleSelectAccount(account.id)}
              >
                <td className="px-4 py-4 text-left">{i + 1}</td>
                <td className="px-4 py-4 text-left">{account.name}</td>
                <td className="px-4 py-4 text-left">{account.type}</td>
                <td className="px-4 py-4 text-left relative">
                  {account.subtype || 'N/A'}
                  {selectedAccountId === account.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDeleteAccount(account.id);
                      }}
                      className="absolute top-0 right-0 mt-3 mr-3 text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
