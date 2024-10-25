import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
  const [showAddBucket, setShowAddBucket] = useState<boolean>(false);

  const handleAddBucketClick = () => {
    setShowAddBucket((prev) => !prev); // Toggle the AddBucket form
  };

  const handleAddBucket = (bucket: { name: string; description: string; budgetLimit: number }) => {
    console.log('Bucket added:', bucket);
    setShowAddBucket(false); // Hide the AddBucket form after submission
  };
  return (
    <div className="flex justify-start space-x-6 p-6">
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link to="/addBucket"><span className="text-2xl">+</span></Link> 
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link  to="/editBucket"><span className="text-2xl">✏️</span></Link>
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <Link to="/deleteBucket"><span className="text-2xl">🗑️</span></Link>
      </button>
    </div>
  );
};

export default ActionButtons;
