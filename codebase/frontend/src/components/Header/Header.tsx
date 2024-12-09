import React from 'react';
import { Link } from 'react-router-dom';
import logoSrc from "../../assets/images/bucks_long.png"

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 border-b-2 border-black bg-white h-16">
      <div className="text-4xl font-bold text-blue-500">
        <h1 className="text-shadow-sm">
          <Link to="/overview" className="text-blue-500">
            <img 
                src={logoSrc} 
                alt="Buck$ Logo" 
                className="h-16 w-32 mr-2 flex-shrink-0"// Adjust height and width as needed
            />
          </Link>
        </h1>
      </div>
      <nav className="flex space-x-20">
        <Link to="/profile" className="text-lg font-semibold text-black">Profile</Link>
        <Link to="/settings" className="text-lg font-semibold text-black">Settings</Link>
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
