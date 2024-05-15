import React from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { Notification, rem } from "@mantine/core";

export function ErrorNotifications({ message }) {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;

  return (
    <Notification icon={xIcon} color="red" title="Error!">
      {message}
    </Notification>
  );
}

export function SuccessNotifications({ message }) {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    <Notification icon={checkIcon} color="teal" title="Success!" mt="md">
      {message}
    </Notification>
  );
}
