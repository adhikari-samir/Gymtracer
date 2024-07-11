import React, { useMemo, useState, useEffect, useContext } from "react";
import { Button, Table, Autocomplete } from "@mantine/core";
import { useTable, usePagination } from "react-table";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import axios from "axios";
import { UserContext } from "../../../Context/Usercontext";
import Loading from "../../Loading";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAdjustments } from "@tabler/icons-react";
import { ImBin } from "react-icons/im";

const BasicTable = () => {
  const { userData } = useContext(UserContext);
  const userId = userData ? userData.id : null;

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Workout Name",
        accessor: "workout.name",
      },
      {
        Header: "Day Name",
        accessor: "day.name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <ActionIcon
            variant="light"
            aria-label="Delete"
            onClick={() => handleDelete(row.original.id)}
          >
            <ImBin color="red" size={15} />
          </ActionIcon>
        ),
      },
    ],
    []
  );

  const columns = useMemo(() => COLUMNS, []);
  const [workoutNames, setWorkoutNames] = useState([]);
  const [dayNames, setDayNames] = useState([]);
  const [dayId, setDayId] = useState("");
  const [workoutId, setWorkoutId] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [data, setData] = useState([]); // State for table data

  const [opened, { open, close }] = useDisclosure(false);

  // Fetch workout names
  const fetchWorkoutNames = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/workout/get-all-workouts",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const workoutdata = response.data?.data?.Workouts || [];
      setWorkoutNames(workoutdata);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching workout names:", error);
    }
  };

  // Fetch day names
  const fetchDayNames = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:9000/api/v1/day/get-all-days",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const daysdata = response.data.data.days || [];
      setDayNames(daysdata);
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  };

  // Fetch routines
  const fetchRoutines = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://127.0.0.1:9000/api/v1/routine/get-routine/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("responsee:", response);
      const routinesData = response.data.data.routine || [];
      setRoutines(routinesData);
      setData(routinesData); // Update data state with fetched routines
    } catch (error) {
      console.error("Error fetching routines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutNames();
    fetchDayNames();
    fetchRoutines(); // Fetch routines data when component mounts
  }, []);

  // Function to handle form submission and add routine
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is not found in local storage");
      }

      const selectedDay = dayNames.find((day) => day.name === dayId);
      const selectedDayId = selectedDay ? selectedDay.id : "";

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
        notifications.show({
          title: "Workout added",
          message: "You have successfully added Workout",
        });
        console.log("Workout added successfully:", response.data);

        // Update 'data' state to reflect added routine
        const newRoutine = {
          id: response.data.id,
          dayId: selectedDayId,
          workoutId: selectedWorkoutId,
          userId: userId,
          // Add other properties as needed
        };

        setData([...data, newRoutine]);

        // Clear input states
        setDayId("");
        setWorkoutId("");

        // Optionally, refetch routines to ensure data consistency
        fetchRoutines();
      } else {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      setError(error.message);
      console.error("Error adding workout:", error);
    }
  };
  // Function to handle deletion of routine
  const handleDelete = async (routineIdToDelete) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://127.0.0.1:9000/api/v1/routine/delete-routine`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: {
            routineIds: [routineIdToDelete],
          },
        }
      );

      console.log("responseeehaiii:", response);
      if (response.status === 200) {
        notifications.show({
          title: "Workout deleted",
          message: "You have successfully deleted Workout",
        });
        console.log("Routine deleted successfully:", response.data);
        // Optionally, refetch routines to ensure data consistency
        fetchRoutines();
      } else {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error deleting routine:", error);
    }
  };

  // Table instance using useTable hook
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    usePagination
  );
  console.log(data);

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
      <div className="p-4">
        <div className="flex flex-row justify-between">
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
                  onChange={(value) => setWorkoutId(value)}
                />
                <Autocomplete
                  label="Days Name"
                  placeholder="Pick day"
                  data={dayNames.map((day) => day.name)}
                  onChange={(value) => setDayId(value)}
                />
                <Button color="blue" className="mt-2" onClick={handleSubmit}>
                  Add Workout
                </Button>
              </div>
            </Modal>

            <Button color="red" onClick={open} variant="light" className="mt-4">
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
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border text-center"
                      key={cell.column.index}
                    >
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

        <Loading loading={loading} />
      </div>
    </>
  );
};

export default BasicTable;
