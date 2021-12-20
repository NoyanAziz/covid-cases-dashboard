import React, { useState } from "react";
import { connect } from "react-redux";

import { Box } from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { USSelectionBar } from "./nested_components/us_covid_cases/USSelectionBar";
import { DataGraph } from "./common_components/DataGraph";

export const UnconnectedUSCovidCases = ({ usCovidCases }) => {
  const [selectedGraphValue, setSelectedGraphValue] = useState("confirmed");

  return (
    <Box className="div">
      <CasesToolbar />
      <USSelectionBar
        selectedGraphValue={selectedGraphValue}
        setSelectedGraphValue={setSelectedGraphValue}
      />
      <DataGraph
        covidCases={usCovidCases}
        selectedGraphValue={selectedGraphValue}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  usCovidCases: state.covid_cases_data.usCovidCases,
});

export const USCovidCases = connect(mapStateToProps)(UnconnectedUSCovidCases);
