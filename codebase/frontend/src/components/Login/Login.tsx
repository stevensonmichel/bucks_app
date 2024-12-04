import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import budgetImage from '../../assets/images/budgetImage.jpg';
import bucketImage from '../../assets/images/bucketImage.jpg';
import graphImage from '../../assets/images/graphImage.jpg';
import automation from '../../assets/images/automation.png';
import graph from '../../assets/images/graph.png';
import calendar from '../../assets/images/calendar.png';
import bucksLogo from '../../assets/images/bucks_no_background.png';
import bucksLong from '../../assets/images/bucks_long.png';

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
      <header className="flex justify-between items-center p-6 bg-white border-b">
        <div className="flex items-center">
          <img
          src={bucksLong}
          alt="Buck$ Logo"
          className="h-16 w-32 mr-2 flex-shrink-0"
        />
        </div>
        <nav className="space-x-20">
          <Link to="/signup" className="text-black font-semibold hover:text-blue-500">Signup</Link>
          <Link to="/contact" className="text-black font-semibold hover:text-blue-500">Contact</Link>
        </nav>
      </header>

  
      <section className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-12">
      <div className="flex flex-col items-center justify-center text-center md:text-left">
      <div className="flex justify-center md:justify-start">
        <img
          src={bucksLogo}
          alt="Location"
          className="w-96 h-96 sm:w-112 sm:h-112 md:w-128 md:h-128 mb-2"
        />
        <p>Be With Your Financial Friend</p>
      </div>


      </div>

 
        <div className="bg-white text-black p-20 shadow-md w-full md:w-1/3 mt-8 md:mt-0">
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

      <section className="bg-blue-500 text-white p-12">
        <h2 className="text-6xl font-bold text-center mb-8">Why Choose BUCK$</h2>
        <br></br>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img src={calendar} alt="Budget" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4"/>
            <p className="text-3xl text-center text-black">Set monthly budgets to control your spending with a few taps</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={automation} alt="Expenses" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4"/>
            <p className="text-3xl text-center text-black">Automate your expenses into buckets and receive relevant notifications</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={graph} alt="Charts" className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4"/>
            <p className="text-3xl text-center text-black">View breakdowns of where your money is going with charts and graphs</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
