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

  const [budgetDetails, setBudgetDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      const token = localStorage.getItem("access_token"); 
      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/budgets/11/", {
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

  const generateDateLabels = (startDate: string, endDate: string): string[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const labels = [];

    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric', 
      year: 'numeric', 
    });

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      labels.push(formatter.format(d)); 
    }

    return labels;
  };

  // Handle no budget state gracefully
  const dateLabels = budgetDetails?.start_date && budgetDetails?.end_date
    ? generateDateLabels(budgetDetails.start_date, budgetDetails.end_date)
    : [];

  const expenseGraphData = {
    labels: dateLabels, 
    datasets: [
      {
        label: 'Expenses ($)',
        data: Array(dateLabels.length).fill(500), 
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

  const labelInfo: string[] = budgetDetails?.buckets?.map((bucket: any) => bucket.name) || [];
  const labelData: number[] = budgetDetails?.buckets?.map((bucket: any) => bucket.current_amount) || [];

  const generateColors = (numColors: number): string[] => {
    const colors: string[] = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
      '#B4A7D6', '#76D7C4', '#F7DC6F', '#DC7633', '#E74C3C', '#5DADE2',
      '#45B39D', '#F4D03F', '#AF7AC5', '#F0B27A', '#58D68D', '#85C1E9',
      '#E59866', '#AAB7B8',
    ];
    return Array.from({ length: numColors }, (_, i) => colors[i % colors.length]);
  };

  const backgroundColors: string[] = generateColors(labelInfo.length);

  const bucketsBreakdownData = {
    labels: labelInfo, 
    datasets: [
      {
        data: labelData, 
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  const totalExpenses = budgetDetails?.total_expenses || 0;
  const progressPercentage = budgetDetails?.amount
    ? (totalExpenses / budgetDetails.amount) * 100
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
          View Budget
        </button>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">You have not set a budget yet. Please do so.</p>
      ) : (
        <div>
          {/* Charts and Details */}
          <div className="grid grid-cols-2 gap-80">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Expense Graph</h2>
              <div style={{ width: '600px', height: '400px' }}>
                <Line data={expenseGraphData} options={expenseGraphOptions} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Buckets Breakdown</h2>
              <div style={{ width: '350px', height: '350px', margin: '0 auto' }}>
                <Doughnut
                  data={bucketsBreakdownData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Expenses Progress</h2>
            <div className="w-full bg-gray-300 rounded-md h-6">
              <div
                className="bg-blue-500 h-6 rounded-md text-white text-lg flex items-center justify-center"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage.toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-lg text-gray-700">Monthly: ${totalExpenses}</span>
              <span className="text-lg text-gray-700">
                Total: ${budgetDetails?.amount ? budgetDetails.amount.toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>
          {/* Budget Details */}
            <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Current Budget Details</h2>
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">You have not set a budget yet. Please do so</p>
            ) : (
                budgetDetails && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg shadow-md">
                    <br></br>
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
                    <br></br>
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
                    <br></br>
                    <br></br>
                    <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">Ensure you stay within your budget to achieve your financial goals!</p>
                    </div>
                    <br></br>
                    </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
