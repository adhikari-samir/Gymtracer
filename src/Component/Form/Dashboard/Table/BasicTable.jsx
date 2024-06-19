// import React, { useMemo } from "react";
// import MOCK_DATA from "./MOCK_DATA.json";
// import { COLUMNS } from "./Columns";
// import { useTable } from "react-table";

// const BasicTable = () => {
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => MOCK_DATA, []);

//   const tableInstance = useTable({
//     columns,
//     data,
//   });

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableInstance;

//   return (
//     <>
//       <div>BasicTable</div>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                   return (
//                     <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </>
//   );
//  };

import React, { useMemo } from "react";
import { Table } from "@mantine/core";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./Columns";
import { useTable, usePagination } from "react-table";

const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    canPreviousPage,
    previousPage,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <Table striped stickyHeader stickyHeaderOffset={60} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Table.Th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 text-white border bg-red-500  p-48 ml-10"
                >
                  {column.render("Header")}
                </Table.Th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Table.Tr
                {...row.getRowProps()}
                className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                {row.cells.map((cell) => (
                  <Table.Td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border"
                  >
                    {cell.render("Cell")}
                  </Table.Td>
                ))}
              </Table.Tr>
            );
          })}
        </tbody>
      </Table>
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded-lg text-white bg-red-500 ${
            !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 rounded-lg text-white bg-red-500 ${
            !canNextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default BasicTable;
