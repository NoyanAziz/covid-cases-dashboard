import React from "react";

import { Box, Typography } from "@mui/material";
import { CasesToolbar } from "./common_components/CasesToolbar";

export const USCases = () => {
  return (
    <Box class="div">
      <CasesToolbar />
      <Typography>This is my US Cases page</Typography>
    </Box>
  );
};
