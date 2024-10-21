import React, { useState, useEffect } from 'react';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;  // Assuming date is in string format (e.g., '2024-10-19')
}

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Simulate fetching expenses using mock data
  useEffect(() => {
    const mockExpenses: Expense[] = [
      { id: 1, name: 'Groceries', amount: 200.50, category: 'Food', date: '2024-10-19' },
      { id: 2, name: 'Internet', amount: 60.00, category: 'Utilities', date: '2024-10-18' },
      { id: 3, name: 'Gas', amount: 30.25, category: 'Transport', date: '2024-10-17' },
      { id: 4, name: 'Dining Out', amount: 45.75, category: 'Entertainment', date: '2024-10-16' },
      { id: 5, name: 'Rent', amount: 1200.00, category: 'Housing', date: '2024-10-15' }
    ];

    // Simulating data fetch by setting mock data
    setExpenses(mockExpenses);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-4xl font-bold mb-6">All Expenses</h2>

      {/* If there are no expenses */}
      {expenses.length === 0 ? (
        <p className="text-gray-600">No expenses found.</p>
      ) : (
        <table className="min-w-full table-auto bg-gray-100 shadow-md rounded-lg">
          <thead className="bg-cyan-400 text-white">
            <tr>
                <th className="px-4 py-4"></th>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b bg-white">
                <td className="px-4 py-4"></td>
                <td className="px-4 py-4">{expense.name}</td>
                <td className="px-4 py-4">${expense.amount.toFixed(2)}</td>
                <td className="px-4 py-4">{expense.category}</td>
                <td className="px-4 py-4">{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpensesPage;
