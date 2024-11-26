import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';

const ActionButtons: React.FC = () => {
  const location = useLocation(); // Get the current path

  // Determine where to navigate based on the current path
  let addPath = "";
  let title = "";

  if (location.pathname === "/buckets") {
    addPath = "/addBucket"; // Go to addBucket when on Buckets page
    title = "Buckets";
  } else if (location.pathname === "/expenses") {
    addPath = "/addExpense"; // Go to addExpense when on Expenses page
    title = "Expenses";
  } else if (location.pathname === "/accounts") {
    title = "Bank Accounts";
  } else if (location.pathname === "/notifications") {
    title = "Notifications"; // No action button
  } else if (location.pathname === "/overview") {
    title = "Overview"; // No action button
  }

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex justify-start items-center space-x-4 p-2">
        {addPath && (
          <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
            <Link to={addPath}><span className="text-2xl"><FaPlus /></span></Link>
          </button>
        )}
        <h2 className="text-4xl font-bold">{title}</h2>
      </div>

      {/* Separator Line */}
      <div className="border-b-4 border-gray-400 mt-2 mb-2"></div>
    </div>
  );
};

export default ActionButtons;
