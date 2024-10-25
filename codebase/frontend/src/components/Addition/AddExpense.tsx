import React, { useState } from "react";// Assuming you have a component to list the buckets or use a state variable
import Buckets from "../Buckets/Buckets";// Import Bucket interface if necessary

interface Expense {
    name: string;
    description: string;
    amount: number;
    date: string;
    bucket: string; // This can reference the bucket's name or ID
}

interface Bucket {
    name: string;
    description: string;
    stopDate : string;
    amount: number;

  }

interface AddExpenseProps {
  buckets: Bucket[]; // Pass the available buckets to select from
  onAddExpense?: (expense: Expense) => void; // Callback for when an expense is added
}

const AddExpense: React.FC<AddExpenseProps> = ({ buckets, onAddExpense }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number | "">("");
    const [date, setDate] = useState<string>("");
    const [bucket, setBucket] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    if (!description || !amount || !date || !bucket) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense: Expense = {
        name,
        description,
        amount: Number(amount),
        date,
        bucket,
    };

    if (onAddExpense) {
      onAddExpense(newExpense); // Call the callback to add the expense
    }

    // Clear form fields after submission
    setName("");
    setDescription("");
    setAmount("");
    setDate("");
    setBucket("");
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit}>


        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
            </label>
            <input
                type="text"
                id="description"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                Description
            </label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>


        <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                Amount ($)
            </label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value !== "" ? Number(e.target.value) : "")}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                Date (MM/DD/YYYY)
            </label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
        </div>

        <div className="mb-4">
            <label htmlFor="bucket" className="block text-gray-700 font-bold mb-2">
                Select Bucket
            </label>
            <select
                id="bucket"
                value={bucket}
                onChange={(e) => setBucket(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            >
            <option value="" disabled>Select a bucket</option>
            {buckets.map((bucket) => (
              <option key={bucket.name} value={bucket.name}>
                {bucket.name}
              </option>
            ))}
            </select>
        </div>

        <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
        >
            Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
