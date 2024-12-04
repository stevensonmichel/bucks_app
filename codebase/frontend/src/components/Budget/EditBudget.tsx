import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBudget: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get budget ID from URL
  const navigate = useNavigate();

  const [budgetData, setBudgetData] = useState<any>(null);
  const [availableBuckets, setAvailableBuckets] = useState<any[]>([]); // All available buckets
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]); // Selected buckets
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>('');
  const [amount, setAmount] = useState<number | ''>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchBudgetAndBuckets = async () => {
      const token = localStorage.getItem('access_token');
      try {
        // Fetch the budget details
        const budgetResponse = await fetch(`http://127.0.0.1:8000/api/budgets/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!budgetResponse.ok) {
          throw new Error('Failed to fetch budget');
        }

        const budgetData = await budgetResponse.json();
        setBudgetData(budgetData);
        setName(budgetData.name);
        setAmount(budgetData.amount);
        setStartDate(budgetData.start_date);
        setEndDate(budgetData.end_date);
        setSelectedBuckets(budgetData.selected_buckets || []);

        // Fetch all available buckets
        const bucketsResponse = await fetch(`http://127.0.0.1:8000/api/buckets/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!bucketsResponse.ok) {
          throw new Error('Failed to fetch buckets');
        }

        const bucketsData = await bucketsResponse.json();
        setAvailableBuckets(bucketsData);
      } catch (error: any) {
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetAndBuckets();
  }, [id]);

  const handleBucketSelection = (bucketId: string) => {
    setSelectedBuckets((prev) =>
      prev.includes(bucketId)
        ? prev.filter((id) => id !== bucketId) // Remove if already selected
        : [...prev, bucketId] // Add if not selected
    );
  };

  const handleSave = async () => {
    const token = localStorage.getItem('access_token');
    const updatedBudget = {
      name,
      amount: Number(amount),
      start_date: startDate,
      end_date: endDate,
      selected_buckets: selectedBuckets,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/budgets/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBudget),
      });

      if (!response.ok) {
        throw new Error('Failed to update budget');
      }

      alert('Budget updated successfully!');
      navigate('/overview');
    } catch (error: any) {
      console.error('Error updating budget:', error);
      alert('Failed to update budget');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Budget</h2>

      {/* Form Fields */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value !== '' ? Number(e.target.value) : '')}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Select Buckets */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Select Buckets</label>
        <div className="flex flex-wrap gap-2">
          {availableBuckets.map((bucket) => (
            <label
              key={bucket.id}
              className="flex items-center space-x-2 bg-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              <input
                type="checkbox"
                value={bucket.id}
                checked={selectedBuckets.includes(bucket.id)}
                onChange={() => handleBucketSelection(bucket.id)}
                className="w-4 h-4"
              />
              <span>{bucket.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => navigate('/overview')}
          className="flex-1 bg-gray-500 text-white p-2 rounded-lg font-bold hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditBudget;
