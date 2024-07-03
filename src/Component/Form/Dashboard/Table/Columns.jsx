// // // Columns.js
import { ActionIcon } from "@mantine/core";
import { ImBin } from "react-icons/im";
export const COLUMNS = [
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
];
