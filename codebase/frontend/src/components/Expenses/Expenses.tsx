import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Expense {
  id: number;
  name: string;
  description: string;
  amount: number;
  bucket: string;
  date: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const navigate = useNavigate();
  const expenseListRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/expenses/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses', error);
      });
  }, []);

  const handleEdit = (id: number) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      navigate(`/edit-expense/${id}`, { state: { expense: expenseToEdit } }); // Pass expense data
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmed) return;

    const token = localStorage.getItem('access_token');

    fetch(`http://127.0.0.1:8000/api/expenses/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete expense');
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      })
      .catch((error) => console.error('Error deleting expense:', error));
  };

  const handleSelect = (id: number) => {
    setSelectedExpenseId((prevId) => (prevId === id ? null : id)); // Toggle selection
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expenseListRef.current && !expenseListRef.current.contains(event.target as Node)) {
        setSelectedExpenseId(null); // Unselect when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-400 shadow-md rounded-lg">
      {expenses.length === 0 ? (
        <p className="text-gray-600">No expenses found.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-100 shadow-md rounded-lg" ref={expenseListRef}>
          <thead className="bg-cyan-400 text-white">
            <tr>
              <th className="px-4 py-4 text-left">No</th>
              <th className="px-4 py-4 text-left">Name</th>
              <th className="px-4 py-4 text-left">Amount</th>
              <th className="px-4 py-4 text-left">Bucket</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr
                key={expense.id}
                className={`border-b transition-colors cursor-pointer ${
                  selectedExpenseId === expense.id ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'
                }`}
                onClick={() => handleSelect(expense.id)}
              >
                <td className="px-4 py-4 text-left">{i + 1}</td>
                <td className="px-4 py-4 text-left">{expense.name || expense.description}</td>
                <td className="px-4 py-4 text-left">${expense.amount}</td>
                <td className="px-4 py-4 text-left">{expense.bucket}</td>
                <td className="px-4 py-4 text-left">{expense.date}</td>
                <td className="px-4 py-4 text-left">
                  {selectedExpenseId === expense.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleEdit(expense.id);
                        }}
                        className="text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleDelete(expense.id);
                        }}
                        className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Expenses;
