import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddExpense from "./AddExpense";
import AddBucket from "./AddBucket";

const DynamicRoute: React.FC = () => {
  const location = useLocation();  // Get the current location to determine the route

  // Example list of buckets to be passed to AddExpense component
  const [buckets, setBuckets] = useState([
    { name: "Groceries", description: "For food shopping", stopDate: "12/31/2023", amount: 500 },
    { name: "Utilities", description: "Electricity, Water, etc.", stopDate: "12/31/2023", amount: 300 }
  ]);

  // Dynamically render the component based on the current path
  let componentToRender;
  
  if (location.pathname === '/addBucket') {
    componentToRender = <AddBucket />;
  } else if (location.pathname === '/addExpense') {
    componentToRender = <AddExpense buckets={buckets} />;  // Pass buckets prop to AddExpense
  } else {
    componentToRender = <div>404 - Not Found</div>;  // Fallback for unknown routes
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
};

export default DynamicRoute;
