import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// const Bucks: React.FC = () => {
//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Top Bar */}
//       {/* Main Layout */}
//       <div className="flex flex-1">
//         {/* Sidebar */}

//         {/* Content */}
//         <div className="flex-1 p-6">

//           {/* Buckets */}
//           <div className="flex space-x-8">
//             {/* Transportation */}
//             <div className="border border-blue-500 rounded-lg p-6 w-1/3">
//               <h2 className="text-xl font-bold mb-4">TRANSPORTATION</h2>
//               <div className="mb-2">
//                 <span>Expenses</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div className="mb-2">
//                 <span>Remaining</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div className="mb-2">
//                 <span>Tracks</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div>
//                 <span>Tomato</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//             </div>

//             {/* Groceries */}
//             <div className="border border-blue-500 rounded-lg p-6 w-1/3">
//               <h2 className="text-xl font-bold mb-4">GROCERIES</h2>
//               <div className="mb-2">
//                 <span>Expenses</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div className="mb-2">
//                 <span>Remaining</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div className="mb-2">
//                 <span>Tracks</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//               <div>
//                 <span>Tomato</span>
//                 <div className="border-t-2 border-black"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bucks;



const Buckets: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-20 p-20">
      <div className="border-8 border-cyan-500 p-10 rounded-lg">
        <h2 className="text-3xl font-bold">TRANSPORTATION</h2>
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex justify-between">
            <span className='text-xl'>Expenses</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Remaining</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Tracks</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Tomato</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
        </div>
      </div>
      <div className="border-8 border-cyan-500 p-10 rounded-lg">
        <h2 className="text-3xl font-bold">GROCERIES</h2>
        <div className="flex flex-col space-y-2 mt-4">
          <div className="flex justify-between">
            <span className='text-xl'>Expenses</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Remaining</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Tracks</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
          <div className="flex justify-between">
            <span className='text-xl'>Tomato</span>
            <span className="border-b-2 border-black w-32"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buckets;

