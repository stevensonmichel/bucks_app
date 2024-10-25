import React from 'react';
import { useLocation } from 'react-router-dom';
import AddBucket from './AddBucket';
import AddExpense from './AddExpense';

const DynamicRoute: React.FC = () => {
  const location = useLocation(); // Get the current location object

  // Initialize newRoute variable
  let newRoute;

  console.log("The location is", location)

  // Dynamically set the component based on the current path
  if (location.pathname === '/buckets') {
    newRoute = <AddBucket />;
  } else {
    newRoute = <AddExpense />;
  }

  return (
    <div>
      {newRoute} {/* Render the appropriate component */}
    </div>
  );
};

export default DynamicRoute;
