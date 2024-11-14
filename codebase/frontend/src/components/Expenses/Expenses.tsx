import React, { useState, useEffect } from 'react';

interface Expense {
  id: number;
  name: string;
  description: string;
  amount: number;
  created_at: string;
  bucket: string;
  date: string;  // Assuming date is in string format (e.g., '2024-10-19')
}

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    fetch('http://127.0.0.1:8000/api/expenses/', {
      method: "GET",
      headers: {
        "content-type": 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Expenses data are", data)
      setExpenses(data);
    })
    .catch((error) => {
      console.error("Error fetching expenses", error);
    })
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
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Amount</th>
                <th className="px-4 py-4 text-left">Bucket</th>
                <th className="px-4 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr key={expense.id} className="border-b bg-white">
                <td className="px-4 py-4 text-left">{i + 1}</td>
                <td className="px-4 py-4 text-left">{expense.name ? expense.name : expense.description}</td>
                <td className="px-4 py-4 text-left">${expense.amount}</td>
                <td className="px-4 py-4 text-left">{expense.bucket}</td>
                <td className="px-4 py-4 text-left">{expense.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpensesPage;
