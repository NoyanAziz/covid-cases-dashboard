import React from "react";

import { Card } from "@mui/material";
import Chart from "react-apexcharts";
import { getDataSeries, getGraphOptions } from "../../utils";

export const DataGraph = ({ covidCases, selectedGraphValue, selectedArea }) => {
  return (
    <Card elevation={0}>
      <Chart
        options={getGraphOptions(selectedGraphValue, selectedArea)}
        series={getDataSeries(selectedGraphValue, covidCases)}
        type="area"
        height={500}
      />
    </Card>
  );
};
