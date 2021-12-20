import React, { useState } from "react";
import { connect } from "react-redux";

import { Box } from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { GlobalSelectionBar } from "./nested_components/global_covid_cases/GlobalSelectionBar";
import { DataGraph } from "./common_components/DataGraph";

export const UnconnectedGlobalCovidCases = ({ globalCovidCases }) => {
  const [selectedGraphValue, setSelectedGraphValue] = useState("confirmed");

  return (
    <Box className="div">
      <CasesToolbar />
      <GlobalSelectionBar
        selectedGraphValue={selectedGraphValue}
        setSelectedGraphValue={setSelectedGraphValue}
      />
      <DataGraph
        covidCases={globalCovidCases}
        selectedGraphValue={selectedGraphValue}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  globalCovidCases: state.covid_cases_data.globalCovidCases.covid_cases,
});

export const GlobalCovidCases = connect(mapStateToProps)(
  UnconnectedGlobalCovidCases
);
