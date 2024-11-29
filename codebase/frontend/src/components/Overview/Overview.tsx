import React from 'react';
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
import { Navigate, useActionData, useNavigate } from 'react-router-dom';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement);

const Overview: React.FC = () => {
  // Data for the Expense Graph (Line Chart)
  const navigate = useNavigate();
  const expenseGraphData = {
    labels: Array.from({ length: 31 }, (_, i) => `Jan ${i + 1}`), // Days of January
    datasets: [
      {
        label: 'Expenses ($)',
        data: [
          200, 250, 300, 220, 280, 310, 330, 290, 320, 340, 360, 370, 380, 390,
          410, 430, 450, 470, 490, 510, 530, 550, 580, 600, 620, 640, 660, 670,
          680, 690, 700,
        ], // Fixed expense values for each day
        fill: true,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.5, // Smooth curve
      },
    ],
  };

  const expenseGraphOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows for custom dimensions
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
        min: 0, // Minimum Y-axis value
        max: 800, // Maximum Y-axis value
      },
    },
  };

  // Data for Buckets Breakdown (Doughnut Chart)
  const bucketsBreakdownData = {
    labels: ['Transportation', 'Groceries', 'Entertainment', 'Savings'],
    datasets: [
      {
        data: [30, 20, 25, 25], // Percentages or amounts for each category
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };


  const totalExpenses = 10000; // Expected total expenses
  const monthlyExpenses = 7000; // Current monthly expenses
  const progressPercentage = (monthlyExpenses / totalExpenses) * 100; // 

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">

      {/* Buttons */}
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600" onClick={() => navigate('/setBudget')}>
          Set Budget
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
          Export Report
        </button>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-2 gap-20">
        {/* Expense Graph (Line Chart) */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Expense Graph</h2>
          <div style={{ width: '600px', height: '400px' }}>
            <Line data={expenseGraphData} options={expenseGraphOptions} />
          </div>
        </div>

        {/* Buckets Breakdown (Doughnut Chart) */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Buckets Breakdown</h2>
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

      
      {/* Progress Bar for Total vs Monthly Expenses */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Expenses Progress</h2>
        <div className="w-full bg-gray-300 rounded-md h-6">
          <div
            className="bg-blue-500 h-6 rounded-md text-white text-sm flex items-center justify-center"
            style={{ width: `${progressPercentage}%` }}
          >
            {`${progressPercentage.toFixed(1)}%`}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-700">Monthly: ${monthlyExpenses}</span>
          <span className="text-sm text-gray-700">Total: ${totalExpenses}</span>
        </div>
      </div>




    </div>
  );
};

export default Overview;
