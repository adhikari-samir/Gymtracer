import React from "react";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veritatis
        sapiente quos molestias neque quo aliquid deleniti possimus recusandae a
        cum nulla est, assumenda excepturi ut eaque corporis. Magni, voluptatem.
      </p>
      <h1>jdsdjsodjs</h1>
    </>
  );
};

export default Dashboard;
// src/components/GymTracker.js

// import React, { useState } from "react";

// const Dashboard = () => {
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
//     // Add your logic to handle form submission (e.g., save data)
//     console.log(setsData);
//     // Reset form fields
//     setSetsData([initialSet]);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
//       <form onSubmit={handleSubmit}>
//         {setsData.map((setData, index) => (
//           <div key={index} className="flex items-center space-x-4 mb-4">
//             {/* Sets input */}
//             <div className="flex-1">
//               <label
//                 htmlFor={`sets-${index}`}
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Sets
//               </label>
//               <input
//                 type="number"
//                 id={`sets-${index}`}
//                 name="sets"
//                 value={setData.sets}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {/* Reps input */}
//             <div className="flex-1">
//               <label
//                 htmlFor={`reps-${index}`}
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Reps
//               </label>
//               <input
//                 type="number"
//                 id={`reps-${index}`}
//                 name="reps"
//                 value={setData.reps}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {/* Weight input */}
//             <div className="flex-1">
//               <label
//                 htmlFor={`weight-${index}`}
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Weight (lbs)
//               </label>
//               <input
//                 type="number"
//                 id={`weight-${index}`}
//                 name="weight"
//                 value={setData.weight}
//                 onChange={(e) => handleChange(index, e)}
//                 className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>

//             {/* Add button */}
//             {index === setsData.length - 1 && (
//               <button
//                 type="button"
//                 onClick={handleAddSet}
//                 className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Add
//               </button>
//             )}
//           </div>
//         ))}

//         {/* Submit button */}
//         <button
//           type="submit"
//           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Track
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Dashboard;
