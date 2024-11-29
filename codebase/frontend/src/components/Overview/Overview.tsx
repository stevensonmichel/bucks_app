import React, { useEffect, useState } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement);

const Overview: React.FC = () => {
  const navigate = useNavigate();

  // State for budget details
  const [budgetDetails, setBudgetDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch budget details
  useEffect(() => {
    const fetchBudgetDetails = async () => {
      const token = localStorage.getItem("access_token"); // Retrieve token from localStorage
      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/budgets/2/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch budget details");
        }

        const data = await response.json();
        setBudgetDetails(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetDetails();
  }, []);

  const expenseGraphData = {
    labels: Array.from({ length: 31 }, (_, i) => `Jan ${i + 1}`),
    datasets: [
      {
        label: 'Expenses ($)',
        data: [
          200, 250, 300, 220, 280, 310, 330, 290, 320, 340, 360, 370, 380, 390,
          410, 430, 450, 470, 490, 510, 530, 550, 580, 600, 620, 640, 660, 670,
          680, 690, 700,
        ],
        fill: true,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.5,
      },
    ],
  };

  const expenseGraphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Expenses ($)',
        },
        min: 0,
        max: 800,
      },
    },
  };

  const bucketsBreakdownData = {
    labels: ['Transportation', 'Groceries', 'Entertainment', 'Savings'],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };
  const totalExpenses = 20000;
  const monthlyExpenses = 7000;
  const progressPercentage = budgetDetails?.amount
  ? (monthlyExpenses / budgetDetails.amount) * 100
  : 0; 

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          onClick={() => navigate('/setBudget')}
        >
          Set Budget
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Export Report
        </button>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-2 gap-80">
        {/* Expense Graph */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Expense Graph</h2>
          <div style={{ width: '600px', height: '400px' }}>
            <Line data={expenseGraphData} options={expenseGraphOptions} />
          </div>
        </div>

        {/* Buckets Breakdown */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Buckets Breakdown</h2>
          <div style={{ width: '350px', height: '350px', margin: '0 auto' }}>
            <Doughnut
              data={bucketsBreakdownData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
      <br></br>
      
      {/* Progress Bar */}
        <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Expenses Progress</h2>
        <div className="w-full bg-gray-300 rounded-md h-6">
            <div
            className="bg-blue-500 h-6 rounded-md text-white text-sm flex items-center justify-center"
            style={{ width: `${progressPercentage}%` }}
            >
            {budgetDetails?.amount ? `${progressPercentage.toFixed(1)}%` : 'No budget...'}
            </div>
        </div>
        <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-700">Monthly: ${monthlyExpenses}</span>
            <span className="text-sm text-gray-700">
            Total: ${budgetDetails?.amount ? budgetDetails.amount.toLocaleString() : 'No budget...'}
            </span>
        </div>
        </div>
    <br></br>
    
      {/* Budget Details */}
        <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Current Budget Details</h2>
        {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
            <p className="text-center text-red-500">You have not set a budget yet. Please do so</p>
        ) : (
            budgetDetails && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-600">Name</h3>
                    <p className="text-lg font-semibold text-gray-800">{budgetDetails.name}</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-600">Amount</h3>
                    <p className="text-lg font-semibold text-gray-800">${budgetDetails.amount.toLocaleString()}</p>
                </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-600">Start Date</h3>
                    <p className="text-lg font-semibold text-gray-800">{new Date(budgetDetails.start_date).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-600">End Date</h3>
                    <p className="text-lg font-semibold text-gray-800">{new Date(budgetDetails.end_date).toLocaleDateString()}</p>
                </div>
                </div>
                <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Ensure you stay within your budget to achieve your financial goals!</p>
                </div>
            </div>
            )
        )}
        </div>
    </div>
  );
};

export default Overview;
