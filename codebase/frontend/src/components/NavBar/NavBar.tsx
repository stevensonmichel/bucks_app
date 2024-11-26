import React from "react";
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-16 h-screen bg-cyan-400 text-white w-1/5 p-8 space-y-10">
      <div className="flex items-center space-x-4">
        <img
          src="/icons/search.png" // Path relative to the public folder
          alt="Overview Icon"
          className="w-12 h-12" // Adjust size as needed
        />
        <Link to="/overview" className="text-3xl font-bold text-black">Overview</Link>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/icons/profit (1).png" // Path relative to the public folder
          alt="Bucket Icon"
          className="w-12 h-12" // Adjust size as needed
        />
        <Link to="/buckets" className="text-3xl font-bold text-black">Buckets</Link>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/icons/money-bag.png" // Path relative to the public folder
          alt="Expense Icon"
          className="w-12 h-12" // Adjust size as needed
        />
        <Link to="/expenses" className="text-3xl font-bold text-black">Expenses</Link>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/icons/bank.png" // Path relative to the public folder
          alt="Bank Icon"
          className="w-12 h-12" // Adjust size as needed
        />
        <Link to="/accounts" className="text-3xl font-bold text-black">Accounts</Link>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src="/icons/notification.png" // Path relative to the public folder
          alt="Notification Icon"
          className="w-12 h-12" // Adjust size as needed
        />
        <Link to="/notifications" className="text-3xl font-bold text-black">Notifications</Link>
      </div>
    </nav>
  );
};

export default NavBar;
