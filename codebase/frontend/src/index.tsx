import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your global styles here, if any.
import App from './App'; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
