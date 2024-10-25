import Buckets from "../Buckets/Buckets";
import React, {useState, useEffect, useCallback } from "react";

interface Bucket {
    name: string;
    description: string;
    stopDate : string;
    amount: number;

  }

interface AddBucketProps {
    onAddBucket?: (bucket: Bucket) => void; // Make onAddBucket optional
  }
  
  const AddBucket: React.FC<AddBucketProps> = ({ onAddBucket }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [stopDate, setStopDate] = useState<string>('');
    const [amount, setAmount] = useState<number | ''>('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!name || !description || amount || stopDate === '') {
        alert('Please fill in all fields');
        return;
      }
  
      const newBucket: Bucket = {
        name,
        description,
        stopDate,
        amount: Number(amount),
      };
  
      if (onAddBucket) {
        onAddBucket(newBucket);  // Call onAddBucket only if it exists
      }
  
      // Clear form fields after submission
      setName('');
      setDescription('');
      setStopDate('');
      setAmount('');
    };
  
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Bucket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Bucket Name</label>
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
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="stopDate" className="block text-gray-700 font-bold mb-2">Stop Date (MM/DD/YYYY)</label>
            <input
              type="date"
              id="stopDate"
              value={amount}
              onChange={(e) => setStopDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          <div className="mb-4">
            <label htmlFor="budgetLimit" className="block text-gray-700 font-bold mb-2">Amount ($)</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value !== '' ? Number(e.target.value) : '')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

  
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
          >
            Add Bucket
          </button>
        </form>
      </div>
    );
  };
  
  export default AddBucket;
  