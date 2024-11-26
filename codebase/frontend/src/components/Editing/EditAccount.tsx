import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface BankAccount {
  id: number;
  name: string;
  type: string;
  subtype: string;
}

const EditAccount: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const account = location.state?.account;
    const [name, setName] = useState<string>(account.name || "");
    if (!account) {
        return <p className="text-red-500 text-center">Account data not found.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
        alert("Name cannot be empty.");
        return;
        }

        const updatedAccount = { ...account, name };

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(`http://127.0.0.1:8000/api/accounts/${account.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAccount),
      });

      if (response.ok) {
        alert("Account updated successfully!");
        navigate("/accounts");
      } else {
        const errorData = await response.json();
        console.error("Error updating account:", errorData);
        alert("Failed to update account.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Type</label>
          <p className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200">{account.type}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Subtype</label>
          <p className="w-full p-2 border border-gray-300 rounded-lg bg-gray-200">{account.subtype}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Account Name
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
            onClick={() => navigate("/accounts")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
