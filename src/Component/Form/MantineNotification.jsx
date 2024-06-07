// import React from "react";
// import { Button } from "@mantine/core";
// import { notifications } from "@mantine/notifications";

// // const MantineNotification = () => {};

// // export default MantineNotification;
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: "Default notification",
          message: "Hey there, your code is awesome! 🤥",
        })
      }
    >
      Show notification
    </Button>
  );
}
