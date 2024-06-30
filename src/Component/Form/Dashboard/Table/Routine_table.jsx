import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Table, Autocomplete } from "@mantine/core";
import { useTable, usePagination } from "react-table";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import axios from "axios";
import { COLUMNS } from "./Columns";
import { UserContext } from "../../../Context/Usercontext";

const BasicTable = () => {
  const { userData } = useContext(UserContext);
  // Ensure userData exists and has the id property
  const userId = userData ? userData.id : null;
  console.log("User id is:", userId);

  const columns = useMemo(() => COLUMNS, []);
  const [workoutNames, setWorkoutNames] = useState([]);
  const [dayId, setDayId] = useState(""); // State for dayId
  const [workoutId, setWorkoutId] = useState(""); // State for workoutId
  const [days, setDays] = useState([]);
  const [error, setError] = useState(null);
  const data = useMemo(() => [], []);
  const [opened, { open, close }] = useDisclosure(false);

  const fetchWorkoutNames = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw Error("Token not found");
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/workout/get-all-workouts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const workoutdata = response.data?.data?.Workouts;
      setWorkoutNames(workoutdata); // Store workout data directly
    } catch (error) {
      setError(error.message);
      console.error("Error fetching workout names:", error);
    }
  };

  const fetchDays = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/day/get-all-days",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const daysdata = response.data.data.days;
      setDays(daysdata); // Store days directly to handle both id and name
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutNames();
    fetchDays();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is not found in local storage");
      }

      // Find the ID corresponding to the selected day name
      const selectedDay = days.find((day) => day.name === dayId);
      const selectedDayId = selectedDay ? selectedDay.id : "";

      // Find the ID corresponding to the selected workout name
      const selectedWorkout = workoutNames.find(
        (workout) => workout.name === workoutId
      );
      const selectedWorkoutId = selectedWorkout ? selectedWorkout.id : "";

      const response = await axios.post(
        "http://127.0.0.1:9000/api/v1/routine/add-routine",
        {
          dayId: selectedDayId,
          workoutId: selectedWorkoutId,
          userId: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Workout added successfully:", response.data);
        fetchDays();
        fetchWorkoutNames();
        setDayId("");
        setWorkoutId("");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error adding workout:", error);
    }
  };

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
          <div className="flex flex-row justify-between mt-1">
            <div className="p-4 text-xl font-semibold">
              <p>Add Routine</p>
            </div>
            <div className="mr-5">
              <Modal opened={opened} onClose={close} title="Add Workout">
                <div className="w-full p-3">
                  <Autocomplete
                    label="Workout Name"
                    placeholder="Pick workout"
                    data={workoutNames.map((workout) => workout.name)}
                    onChange={(value) => setWorkoutId(value)} // Set workoutId to the name directly
                  />
                  <Autocomplete
                    label="Days Name"
                    placeholder="Pick day"
                    data={days.map((day) => day.name)}
                    onChange={(value) => setDayId(value)} // Set dayId to the name directly
                  />
                  <Button color="blue" className="mt-2" onClick={handleSubmit}>
                    Add Workout
                  </Button>
                </div>
              </Modal>

              <Button
                color="red"
                onClick={open}
                variant="light"
                className="mt-4"
              >
                Add Workout
              </Button>
            </div>
          </div>
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
                      className="px-4 py-2 text-black border bg-gray-50 p-48 ml-10"
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
    </>
  );
};

export default BasicTable;
