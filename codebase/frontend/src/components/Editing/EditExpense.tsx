import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Bucket {
  id: string;
  name: string;
}

const EditExpense: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get expense ID from the URL

  const expense = location.state?.expense; // Access passed expense data
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [name, setName] = useState<string>(expense?.name || "");
  const [description, setDescription] = useState<string>(expense?.description || "");
  const [amount, setAmount] = useState<number | "">(expense?.amount || "");
  const [date, setDate] = useState<string>(expense?.date || "");
  const [bucket, setBucket] = useState<string>(expense?.bucket || "");

  // Fetch buckets from API
  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://127.0.0.1:8000/api/buckets/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBuckets(data);
        } else {
          console.error("Failed to fetch buckets");
        }
      } catch (error) {
        console.error("Error fetching buckets:", error);
      }
    };

    fetchBuckets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !amount || !date || !bucket) {
      alert("Please fill in all fields");
      return;
    }

    const updatedExpense = {
      id: expense.id,
      name,
      description,
      amount: Number(amount),
      date,
      bucket,
    };

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`http://127.0.0.1:8000/api/expenses/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      if (response.ok) {
        alert("Expense updated successfully!");
        navigate("/expenses");
      } else {
        const errorData = await response.json();
        console.error("Error updating expense:", errorData);
        alert("Failed to update expense");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Expense</h2>
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
          <textarea
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
            onChange={(e) =>
              setAmount(e.target.value !== "" ? Number(e.target.value) : "")
            }
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
            Bucket
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
            {buckets.map((bucketOption) => (
              <option key={bucketOption.id} value={bucketOption.id}>
                {bucketOption.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-8">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-500 text-white p-2 rounded-lg font-bold hover:bg-gray-600"
            onClick={() => navigate("/expenses")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpense;
