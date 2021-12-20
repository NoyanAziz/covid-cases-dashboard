import React from "react";

import { Box } from "@mui/material";
import Chart from "react-apexcharts";
import { getDataSeries, getGraphOptions } from "../../utils";

export const DataGraph = ({ covidCases, selectedGraphValue }) => {
  return (
    <Box className="div">
      <Chart
        options={getGraphOptions(selectedGraphValue)}
        series={getDataSeries(selectedGraphValue, covidCases)}
        type="area"
        height={600}
      />
    </Box>
  );
};
