import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboardhome from "./Dashboardhome";

const Home = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veritatis
        sapiente quos molestias neque quo aliquid deleniti possimus recusandae a
        cum nulla est, assumenda excepturi ut eaque corporis. Magni, voluptatem.
      </p>
      <h1>sds</h1>
    </>
  );
};

export default Home;
// import { Button } from "@mantine/core";
// import React, { useState } from "react";

// const Home = () => {
//   const initialSet = { sets: "", reps: "", weight: "" };
//   const [setsData, setSetsData] = useState([initialSet]);

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const newSetsData = [...setsData];
//     newSetsData[index] = { ...newSetsData[index], [name]: value };
//     setSetsData(newSetsData);
//   };

//   const handleAddSet = () => {
//     setSetsData([...setsData, initialSet]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <form onSubmit={handleSubmit}>
//         {setsData.map((setData, index) => (
//           <div key={index} className="flex items-center space-x-4 mb-4">
//             {/* Sets input */}
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Sets
//               </label>
//               <input
//                 type="number"
//                 name="sets"
//                 value={setData.sets}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {/* Reps input */}
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Reps
//               </label>
//               <input
//                 type="number"
//                 name="reps"
//                 value={setData.reps}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {/* Weight input */}
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Weight (lbs)
//               </label>
//               <input
//                 type="number"
//                 name="weight"
//                 value={setData.weight}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {index === setsData.length - 1 && (
//               <Button onClick={handleAddSet} variant="light" color="red">
//                 Add
//               </Button>
//             )}
//           </div>
//         ))}

//         <Button variant="filled" color="red">
//           Track
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Home;
