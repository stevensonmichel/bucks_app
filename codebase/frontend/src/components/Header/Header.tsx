import React from 'react';

interface HeaderProps {
  title: string;
  onLogout: () => void; // The logout function passed from App.tsx
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 border-b-2 border-black bg-white">
      <div className="text-4xl font-bold text-blue-500">
        <h1 className="text-shadow-sm">BUCK$</h1>
      </div>
      <nav className="flex space-x-20">
        <a href="/profile" className="text-lg font-semibold text-black">Profile</a>
        <a href="/settings" className="text-lg font-semibold text-black">Settings</a>
        <button
          onClick={onLogout}
          className="text-lg font-semibold text-black hover:text-red-500"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;