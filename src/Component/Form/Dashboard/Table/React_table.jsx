import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const React_table = () => {
  const datas = [
    {
      id: 1,
      workout: "chest",
      Day: "Sunday",
    },
    {
      id: 2,
      workout: "back",
      Day: "monday",
    },
    {
      id: 3,
      workout: "triceps",
      Day: "tuesday",
    },
    {
      id: 4,
      workout: "chest",
      Day: "Sunday",
    },
    {
      id: 5,
      workout: "head",
      Day: "friday",
    },
  ];

  const columns = [
    {
      header: "ID",
      accessorkey: "id",
      footer: "ID",
    },
    {
      header: "Workout",
      accessorkey: "workout",
      footer: "Workout",
    },
    {
      header: "day",
      accessorkey: "Day",
      footer: "day",
    },
  ];

  const data = useMemo(() => datas, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div>React_table</div>
      <table>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
};

export default React_table;
