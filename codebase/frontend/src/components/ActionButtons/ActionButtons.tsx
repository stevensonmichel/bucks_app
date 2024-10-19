import React from "react";
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
  return (
    <div className="flex justify-start space-x-6 p-6">
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <span className="text-2xl">+</span>
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <span className="text-2xl">✏️</span>
      </button>
      <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center">
        <span className="text-2xl">🗑️</span>
      </button>
    </div>
  );
};

export default ActionButtons;
