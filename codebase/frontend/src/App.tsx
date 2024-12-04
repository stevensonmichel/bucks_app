import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Overview from './components/Overview/Overview';
import Accounts from './components/Accounts/Accounts';
import Buckets from './components/Buckets/Buckets';
import Expenses from './components/Expenses/Expenses';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup'; 
import Contact from './components/Contact/Contact';
import Notifications from './components/Notifications/Notifications';
import axios from 'axios'; 
import TransactionsPage from './components/TransactionsPage/TransactionsPage';
import DynamicRoute from './components/Addition/DynamicRoute';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import EditBucket from './components/Editing/EditBucket';
import EditExpense from './components/Editing/EditExpense';
import EditAccount from './components/Editing/EditAccount';
import SetBudget from './components/Budget/Budget';
import EditBudget from './components/Budget/EditBudget';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);



  const handleLogin = async (username: string, password: string) => {
    try {
      // Make a POST request to the Django backend to authenticate the user
      const response = await axios.post('http://127.0.0.1:8000/api/users/token/', {
        username,
        password,
      });

      // If successful, store the token in localStorage and set isAuthenticated to true
      localStorage.setItem('access_token', response.data.access); // Store the access token
      localStorage.setItem('refresh_token', response.data.refresh);

      console.log("LOOOOOOOOOOOOOOOOOGGGGGG access token is", response.data.access)
      console.log("The refresh token is", response.data.refresh)

      console.log('Login successful, tokens stored');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
  };


  return (
    <div> 
      <Router>
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}


          {/* Protected Routes */}
          {isAuthenticated && (
            <>
              <Route
                path="*"
                element={
                  <>
                    <Header title="Bucks" onLogout={handleLogout} />
                    <div className="flex">
                      {/* Left navigation bar */}
                      <NavBar />

                      {/* Main content */}
                      <div className="flex-grow bg-gray-200 ml-[20%] mt-[4rem] p-4 overflow-auto h-screen">
                        <ActionButtons />
                        <Routes>
                          <Route path="/overview" element={<Overview />} />
                          <Route path="/expenses" element={<Expenses />} />
                          <Route path="/accounts" element={<Accounts />} />
                          <Route path="/buckets" element={<Buckets />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/addBucket" element={<DynamicRoute />} />
                          <Route path="/addExpense" element={<DynamicRoute />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />
                          <Route path="/setBudget" element={<SetBudget />} />
                          <Route path="/edit-bucket/:id" element={<EditBucket />} />
                          <Route path="/edit-expense/:id" element={<EditExpense />} />
                          <Route path="/edit-account/:id" element={<EditAccount />} />
                          <Route path="/edit-budget/:id" element={<EditBudget />} />
                          <Route path="*" element={<Navigate to="/overview" />} />
                        </Routes>
                      </div>
                    </div>
                  </>
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;



