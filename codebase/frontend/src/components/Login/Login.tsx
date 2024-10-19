import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the type of the props
interface LoginProps {
  onLogin: (username: string, password: string) => void; // onLogin takes two arguments
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password); // Call the onLogin prop with the current username and password
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white border-b">
        <div className="flex items-center">
          <img src="/logo.png" alt="Buck$ Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold text-black">Buck$</span>
        </div>
        <nav className="space-x-20">
          <Link to="/signup" className="text-gray-800 hover:text-blue-500">Signup</Link>
          <Link to="/contact" className="text-gray-800 hover:text-blue-500">Contact</Link>
        </nav>
      </header>

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-12">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-16">Welcome to BUCK$</h1>
          <div className="flex justify-center md:justify-start space-x-6">
            <img src="/location-icon.png" alt="Location" className="h-16 w-16" />
            <img src="/graduation-icon.png" alt="Graduation" className="h-16 w-16" />
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white text-black p-12 shadow-md w-full md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-180 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-180 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-40 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              LOGIN
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose BUCK$ Section */}
      <section className="bg-blue-400 text-white p-12">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose BUCK$</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img src="/budget-icon.png" alt="Budget" className="h-16 w-16 mb-4" />
            <p className="text-center">Set monthly budgets to control your spending</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/expenses-icon.png" alt="Expenses" className="h-16 w-16 mb-4" />
            <p className="text-center">Easily add and categorize expenses with a few taps</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/charts-icon.png" alt="Charts" className="h-16 w-16 mb-4" />
            <p className="text-center">View breakdowns of where your money is going with charts and graphs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
