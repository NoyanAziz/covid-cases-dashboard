import React from "react";

import { Box } from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { GlobalSelectionBar } from "./common_components/GlobalSelectionBar";

export const GlobalCases = () => {
  return (
    <Box class="div">
      <CasesToolbar />
      <GlobalSelectionBar />
    </Box>
  );
};
