import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Bucket {
  name: string;
  description: string;
  max_amount: number;
}

interface AddBucketProps {
  onAddBucket?: (bucket: Bucket) => void; // Optional callback for parent component
}

const AddBucket: React.FC<AddBucketProps> = ({ onAddBucket }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [max_amount, setAmount] = useState<number | "">("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || max_amount === "") {
      alert("Please fill in all fields");
      return;
    }

    const newBucket: Bucket = {
      name,
      description,
      max_amount: Number(max_amount),
    };

    try {
      const token = localStorage.getItem("access_token");
      console.log("From Add Bucket, the access token is", token);

      const response = await fetch("http://127.0.0.1:8000/api/buckets/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBucket),
      });

      if (response.ok) {
        setName("");
        setDescription("");
        setAmount("");

        if (onAddBucket) {
          onAddBucket(newBucket);
        }

        navigate("/buckets");
      } else {
        const errorData = await response.json();
        console.error("Error adding bucket:", errorData);
        alert("Failed to add bucket");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Bucket</h2>
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
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Maximum Amount
          </label>
          <input
            type="number"
            id="amount"
            value={max_amount}
            onChange={(e) =>
              setAmount(e.target.value !== "" ? Number(e.target.value) : "")
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-8">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Add Bucket
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

export default AddBucket;
