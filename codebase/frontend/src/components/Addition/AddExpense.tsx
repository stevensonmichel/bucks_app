import React, { useState } from "react";

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
  stopDate: string;
  amount: number;
}

interface AddExpenseProps {
  buckets: Bucket[]; // Pass the available buckets to select from
}

const AddExpense: React.FC<AddExpenseProps> = ({ buckets }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState<string>("");
  const [bucket, setBucket] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !amount || !date || !bucket) {
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

    // Send the expense data to the Django backend
    try {
    const token = localStorage.getItem('access_token')
    console.log("From Add Expense, the access token is", token)
    const response = await fetch("http://127.0.0.1:8000/api/expenses/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        // Clear the form fields after successful submission
        setName("");
        setDescription("");
        setAmount("");
        setDate("");
        setBucket("");

        alert("Expense added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error adding expense:", errorData);
        alert("Failed to add expense");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Something went wrong");
    }
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
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
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
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Max Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value !== "" ? Number(e.target.value) : "")
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 font-bold mb-2"
          >
            Deadline (MM/DD/YYYY)
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Update the state on change
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="bucket"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Bucket
          </label>
          <select
            id="bucket"
            value={bucket}
            onChange={(e) => setBucket(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a bucket
            </option>
            {buckets.map((bucket) => (
              <option key={bucket.name} value={bucket.name}>
                {bucket.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-8">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Add Expense
          </button>

          <button
            type="button"
            className="flex-1 bg-gray-500 text-white p-2 rounded-lg font-bold hover:bg-gray-600"
            onClick={() => {
              console.log("Cancel clicked");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
