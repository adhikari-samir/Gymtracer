import React from "react";
import { LoadingOverlay, Box } from "@mantine/core";

const Loading = ({ loading }) => (
  <LoadingOverlay
    visible={loading}
    zIndex={1000}
    overlayProps={{ radius: "sm", blur: 2 }}
    loaderProps={{ color: "red", type: "bars" }}
  />
);

export default Loading;
