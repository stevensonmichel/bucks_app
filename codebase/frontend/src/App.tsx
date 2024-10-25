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
import AddBucket from './components/Addition/AddBucket';
import AddExpense from './components/Addition/AddExpense';
import { useLocation } from 'react-router-dom';
import DynamicRoute from './components/Addition/DynamicRoute';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // const location = useLocation()

  // const newRoute = 
  // if (location == "/addBucket") {
  //   newRoute = <addBucket/>
  // }
  // else {
  //   newRoute = <addExpense/>
  // }

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
                    <Header title="Bucks" onLogout={handleLogout}/>
                    <div className="flex">
                      {/* Left navigation bar */}
                      <NavBar />
                      {/* Main content */}
                      <div className="flex-grow bg-gray-200">
                        <ActionButtons />
                        <Routes>
                          <Route path="/overview" element={<TransactionsPage />} />
                          <Route path="/expenses" element={<Expenses />} />
                          <Route path="/accounts" element={<Accounts />} />
                          <Route path="/buckets" element={<Buckets />} />
                          <Route path="/notifications" element={<Notifications />} />
                          <Route path="/addBucket" element={<DynamicRoute />} />
                          <Route path="/addExpense" element={<DynamicRoute />} />
                          {/* <Route path="*" element={<Navigate to="/" />} /> */}
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



