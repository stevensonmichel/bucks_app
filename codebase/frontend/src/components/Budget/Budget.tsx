import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Bucket {
  id: string;
  name: string;
}

const predefinedCategories: Bucket[] = [
  { id: "housing", name: "Housing" },
  { id: "transportation", name: "Transportation" },
  { id: "food_and_dining", name: "Food & Dining" },
  { id: "personal_care", name: "Personal Care" },
  { id: "health_and_wellness", name: "Health & Wellness" },
  { id: "education_and_learning", name: "Education & Learning" },
  { id: "family_and_relationships", name: "Family & Relationships" },
  { id: "entertainment_and_recreation", name: "Entertainment & Recreation" },
  { id: "travel", name: "Travel" },
  { id: "savings_and_investments", name: "Savings & Investments" },
  { id: "debt_payments", name: "Debt Payments" },
  { id: "utilities_and_bills", name: "Utilities & Bills" },
  { id: "gifts_and_donations", name: "Gifts & Donations" },
  { id: "clothing_and_accessories", name: "Clothing & Accessories" },
  { id: "miscellaneous", name: "Miscellaneous" },
  { id: "insurance", name: "Insurance" },
  { id: "business_expenses", name: "Business Expenses" },
];

const SetBudget: React.FC = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  const [budgetName, setBudgetName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  const navigate = useNavigate();

  // Fetch preexisting buckets
  useEffect(() => {
    const fetchBuckets = async () => {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://127.0.0.1:8000/api/buckets/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setBuckets(data);
    };

    fetchBuckets();
  }, []);

  const handleBucketSelection = (bucketId: string) => {
    setSelectedBuckets((prev) =>
      prev.includes(bucketId)
        ? prev.filter((id) => id !== bucketId) // Remove if selected again
        : [...prev, bucketId] // Add if not selected
    );
  };

  const handleSave = async () => {
    if (!budgetName || !startDate || !amount || selectedBuckets.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    // Automatically calculate end date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);

    const budgetData = {
      name: budgetName,
      startDate,
      endDate: end.toISOString().split("T")[0], // Format YYYY-MM-DD
      amount: Number(amount),
      selectedBuckets,
    };

    console.log("Saving budget:", budgetData);

    // Send data to API
    const token = localStorage.getItem("access_token");
    try {
      await fetch("http://127.0.0.1:8000/api/budgets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(budgetData),
      });
      alert("Budget saved successfully!");
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Failed to save budget.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Set a Budget</h2>

      {/* Budget Name */}
      <div className="mb-4">
        <label htmlFor="budgetName" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="budgetName"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Start Date */}
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Budget Amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
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

      {/* Select Buckets */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Select Buckets</label>
        <div className="flex flex-wrap gap-2">
          {[...buckets, ...predefinedCategories].map((bucket) => (
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

      {/* Save and Cancel Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="flex-1 bg-blue-500 text-white p-2 rounded-lg font-bold hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={() => navigate("/overview")} 
          className="flex-1 bg-gray-500 text-white p-2 rounded-lg font-bold hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SetBudget;
