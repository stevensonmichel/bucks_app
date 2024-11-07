import React from "react";
import { Link } from 'react-router-dom'
// const NavBar: React.FC = () => {
//     return (
//             <div className="w-80 bg-blue-500 text-white flex flex-col p-4 space-y-14">
//                 <a href="#" className="flex items-center space-x-10">
//                     <div className="flex items-center">
//                     <span className="text-3xl font-bold">📢</span>
//                     </div>
//                     <span className="text-3xl">Overview</span>
//                 </a>
//                 <a href="#" className="flex items-center space-x-10">
//                     <div className="flex items-center">
//                     <span className="text-3xl font-bold">📞</span>
//                     </div>
//                     <span className="text-3xl">Buckets</span>
//                 </a>
//                 <a href="#" className="flex items-center space-x-10">
//                     <div className="flex items-center">
//                     <span className="text-3xl font-bold">👥</span>
//                     </div>
//                     <span className="text-3xl">Expenses</span>
//                 </a>
//                 <a href="#" className="flex items-center space-x-10">
//                     <div className="flex items-center">
//                     <span className="text-3xl font-bold">📖</span>
//                     </div>
//                     <span className="text-3xl">Accounts</span>
//                 </a>
//                 <a href="#" className="flex items-center space-x-10">
//                     <div className="flex items-center">
//                     <span className="text-3xl font-bold">✉️</span>
//                     </div>
//                     <span className="text-3xl">Graphs</span>
//                 </a>
//             </div>
//     )
// }


// export default NavBar;



const NavBar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 h-screen bg-cyan-400 text-white w-1/5 p-8 space-y-10">
      <div className="flex items-center space-x-4">
        <span role="img" aria-label="overview" className="text-3xl">📣</span>
        <Link to="/overview" className="text-3xl font-semibold">Overview</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span role="img" aria-label="buckets" className="text-3xl">📞</span>
        <Link to="/buckets" className="text-3xl font-semibold">Buckets</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span role="img" aria-label="expenses" className="text-3xl">👥</span>
        <Link to="/expenses" className="text-3xl font-semibold">Expenses</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span role="img" aria-label="accounts" className="text-3xl">📖</span>
        <Link to="/accounts" className="text-3xl font-semibold">Accounts</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span role="img" aria-label="notifications" className="text-3xl">📧</span>
        <Link to="/notifications" className="text-3xl font-semibold">Notifications</Link>
      </div>
    </nav>
  );
};

export default NavBar;
