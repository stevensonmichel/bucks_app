import React from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import ActionButtons from './components/ActionButtons/ActionButtons';
import Buckets from './components/Buckets/Buckets';
import Expenses from './components/Expenses/Expenses';

const App: React.FC = () => {
  return (
    <div> 
      <Header />
      <div className="flex">
        {/* Left navigation bar */}
        <NavBar />
        
        
        {/* Main content */}
        <div className="flex-grow">
          <ActionButtons />
          <Buckets />
        </div>
      </div>
    </div>
  );
};

export default App;
