// import React from "react";
// import { IconX, IconCheck } from "@tabler/icons-react";
// import { notifications } from "@mantine/notifications";

// export const SuccessNotifications = ({ message }) => {
//   return notifications?.show({
//     title: "Success",
//     message,
//     color: "teal",
//     icon: <IconX />,
//   });
// };

// export const ErrorNotifications = ({ message }) => {
//   return notifications?.show({
//     title: "Error",
//     message,
//     color: "red",
//     icon: <IconX />,
//   });
// };

// export const SuccessNotifications = ( title, message ) => {
//   return (
//     <Button
//       onClick={() =>
//         notifications.show({
//           title: "Registration Sucessfull",
//           message: "You are in the world of your own",
//         })
//       }
//     >
//       Show notification
//     </Button>
//   );
// };

// export const ErrorNotifications = (title, message) => {
//   return (
//     <Button
//       onClick={() =>
//         notifications.show({
//           // title: "Registration Unsucessfull",
//           // message: "fuck off",

//         })
//       }
//     >
//       Show notification
//     </Button>
//   );
// };

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";

export const SuccessNotifications = (title, message) => {
  notifications.show({
    title: title,
    message: message,
  });
};

export const ErrorNotifications = (title, message) => {
  notifications.show({
    title: title,
    message: message,
  });
};
