import React from "react"



// const Header: React.FC = ()=> {
//     return (
//         <div className="bg-white flex justify-between items-center py-4 px-6 border-b-2 border-gray-300">
//             <div className="flex items-center">
//               <h1 className="text-4xl font-bold text-blue-600">BUCK$</h1>
//             </div>
//             <div className="flex items-center space-x-20">
//               <a href="#" className="text-black hover:underline">Profile</a>
//               <a href="#" className="text-black hover:underline">Settings</a>
//               <a href="#" className="text-black hover:underline">Logout</a>
//             </div>
//         </div>
//     )
// }

// export default Header




const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b-2 border-black">
      <div className="text-4xl font-bold text-blue-500">
        <h1 className="text-shadow-sm">BUCK$</h1>
      </div>
      <nav className="flex space-x-20">
        <a href="/profile" className="text-lg font-semibold text-black">Profile</a>
        <a href="/settings" className="text-lg font-semibold text-black">Settings</a>
        <a href="/logout" className="text-lg font-semibold text-black">Logout</a>
      </nav>
    </header>
  );
};

export default Header;



