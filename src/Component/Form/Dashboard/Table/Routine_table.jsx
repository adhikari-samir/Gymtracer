import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Table, Autocomplete } from "@mantine/core";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import { COLUMNS } from "./Columns";
import { UserContext } from "../../../Context/Usercontext";

const BasicTable = () => {
  // const { userData } = useContext(UserContext);
  // const userId = userData ? userData.id : null;

  const columns = useMemo(() => COLUMNS, []);
  const [workoutNames, setWorkoutNames] = useState([]);
  // const [dayId, setDayId] = useState([]);
  // const [workoutId, SetWorkoutId] = useState([]);
  const [days, setDays] = useState([]);
  const [error, setError] = useState(null);
  const data = useMemo(() => [], []); // Placeholder for table data

  const fetchWorkoutNames = async () => {
    try {
      console.log("Fetching workout names...");
      const token = localStorage.getItem("token");
      // console.log("Token:", token);

      if (!token) {
        throw Error("Token not found");
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/workout/get-all-workouts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const workoutdata = response.data?.data?.Workouts; // Assuming 'Workouts' is the array of workout objects
      console.log("Fetched workout data:", workoutdata);

      const workoutNamesArray = workoutdata.map((workout) => workout.name); // Extracting names from workout objects
      console.log("Workout names array:", workoutNamesArray);

      setWorkoutNames(workoutNamesArray); // Set workoutNames as an array of workout names
    } catch (error) {
      setError(error.message);
      console.error("Error fetching workout names:", error);
    }
  };

  const fetchDays = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token hai:", token);
      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/day/get-all-days",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const daysdata = response.data.data.days;
      console.log("Fetched days data:", daysdata);

      const dayname = daysdata.map((item) => item.name);
      console.log("data names array:", dayname);

      setDays(dayname);
    } catch (error) {
      console.error("error fetchingg days:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutNames();
    fetchDays();
  }, []);

  // const handleSubmit = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("Token is not found in local storage");
  //     }
  //     const response = await axios.post(
  //       "127.0.0.1:9000/api/v1/routine/add-routine",
  //       {
  //         dayId: dayId,
  //         workoutId: workoutId,
  //         userId: userId,
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     fetchDays();
  //     fetchWorkoutNames();
  //     setDayId("");
  //     SetWorkoutId("");
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

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
      <div className="w-full p-3">
        <div className="w-80% rounded-lg">
          <Table
            striped
            stickyHeader
            stickyHeaderOffset={60}
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 text-white border bg-red-500 p-48 ml-10"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="flex justify-between mt-4">
            <Button
              color="red"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </Button>
            <Button
              color="red"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full p-3">
        <Autocomplete
          label="Workout Name"
          placeholder="Pick workout"
          data={workoutNames}
        />
        <Autocomplete label="Days Name" placeholder="Pick day" data={days} />
        <Button color="blue" className="mt-2">
          Add Workout
        </Button>
      </div>
    </>
  );
};

export default BasicTable;
// onClick={handleSubmit}
