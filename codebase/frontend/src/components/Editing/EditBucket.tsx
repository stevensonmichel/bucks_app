import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface EditBucketProps {}

const EditBucket: React.FC<EditBucketProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bucket = location.state?.bucket; // Access passed bucket data
  const [name, setName] = useState<string>(bucket?.name || "");
  const [description, setDescription] = useState<string>(bucket?.description || "");
  const [deadline, setDeadline] = useState<string>(bucket?.deadline || "");
  const [amount, setAmount] = useState<number | "">(bucket?.max_amount || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !deadline || amount === "") {
      alert("Please fill in all fields");
      return;
    }

    const updatedBucket = {
      id: bucket.id,
      name,
      description,
      deadline,
      max_amount: Number(amount),
    };

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`http://127.0.0.1:8000/api/buckets/${bucket.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBucket),
      });

      if (response.ok) {
        alert("Bucket updated successfully!");
        navigate("/buckets");
      } else {
        const errorData = await response.json();
        console.error("Error updating bucket:", errorData);
        alert("Failed to update bucket");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Bucket</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Bucket Name
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
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
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
          <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
            Deadline (MM/DD/YYYY)
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
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
            onClick={() => navigate("/buckets")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBucket;
