import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';





// const ActionButtons: React.FC = () => {
//     return (
//         <div className="flex-1 p-6">
//             <div className="flex space-x-4 mb-6">
//                 <button className="bg-black text-white p-2 rounded-full hover:bg-gray-700">
//                 <FaPlus />
//                 </button>
//                 <button className="bg-black text-white p-2 rounded-full hover:bg-gray-700">
//                 <FaEdit />
//                 </button>
//                 <button className="bg-black text-white p-2 rounded-full hover:bg-gray-700">
//                 <FaTrash />
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ActionButtons;




const ActionButtons: React.FC = () => {
  const location = useLocation();  // Get the current path

  // Determine where to navigate based on the current path
  let addPath = "";

  if (location.pathname === "/buckets") {
    addPath = "/addBucket";  // Go to addBucket when on Buckets page
  } else if (location.pathname === "/expenses") {
    addPath = "/addExpense";  // Go to addExpense when on Expenses page
  }

  return (
    <div className="flex justify-start space-x-6 p-6">
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link to={addPath}><span className="text-2xl"><FaPlus /></span></Link>
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link to="/editBucket"><span className="text-2xl"><FaEdit /></span></Link>
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link to="/deleteBucket"><span className="text-2xl"><FaTrash /></span></Link>
      </button>
    </div>
  );
};

export default ActionButtons;
