import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddExpense from "./AddExpense";
import AddBucket from "./AddBucket";

interface Bucket {
  id: string;
  name: string;
  description: string;
  stopDate: string;
  amount: number;
}

const DynamicRoute: React.FC = () => {
  const location = useLocation(); 

  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const token = localStorage.getItem('access_token'); 
        const response = await fetch('http://127.0.0.1:8000/api/buckets/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch buckets');
        }
        const data: Bucket[] = await response.json(); 
        setBuckets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    };

    fetchBuckets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  let componentToRender;
  
  if (location.pathname === '/addBucket') {
    componentToRender = <AddBucket />;
  } else if (location.pathname === '/addExpense') {
    componentToRender = <AddExpense buckets={buckets} />;  
  } else {
    componentToRender = <div>404 - Not Found</div>;  
  }

  return (
    <div>
      {componentToRender}
    </div>
  );
};

export default DynamicRoute;
