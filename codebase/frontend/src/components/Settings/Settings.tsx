import React from "react";

const Settings: React.FC = () => {
    const handleSavePreferences = () => {
        alert("Preferences saved successfully!");
      };
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      {/* Preferences Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          {/* Language Selector */}
          <div>
            <label htmlFor="language" className="block text-gray-700 font-medium mb-2">
              Language
            </label>
            <select
              id="language"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          {/* Currency Selector */}
          <div>
            <label htmlFor="currency" className="block text-gray-700 font-medium mb-2">
              Currency
            </label>
            <select
              id="currency"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
              <option value="inr">INR</option>
            </select>
          </div>
          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold text-sm rounded-md hover:bg-green-600"
              onClick={handleSavePreferences}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-4">
          <button
            className="flex-1 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
            onClick={() => alert("Clear All Data action triggered!")}
          >
            Clear All Data
          </button>
          <button
            className="flex-1 px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600"
            onClick={() => alert("Clear Current Budget action triggered!")}
          >
            Clear Current Budget
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            onClick={() => alert("Download Transactions History action triggered!")}
          >
            Download History
          </button>
          <button
            className="flex-1 px-4 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600"
            onClick={() => alert("Delete Account action triggered!")}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* About the App Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">About the App</h2>
        <div className="space-y-4">
          {/* Version Info */}
          <div>
            <h3 className="font-medium text-gray-700">Version Info:</h3>
            <p className="text-gray-600">v1.0.0</p>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h3 className="font-medium text-gray-700">Terms & Conditions:</h3>
            <p className="text-gray-600">
              <a href="/terms" className="text-blue-500 hover:underline">
                View Terms & Conditions
              </a>
            </p>
          </div>

          {/* Credits */}
          <div>
            <h3 className="font-medium text-gray-700">Credits:</h3>
            <p className="text-gray-600">
              Developed by <span className="font-semibold">Stevenson Michel</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
