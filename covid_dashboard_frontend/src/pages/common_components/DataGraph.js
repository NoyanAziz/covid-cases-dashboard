import React from "react";

import { Card, CircularProgress } from "@mui/material";
import Chart from "react-apexcharts";

import { getDataSeries, getGraphOptions } from "../../utils";

export const DataGraph = ({
  covidCases,
  covidCasesLoading,
  selectedGraphValue,
  selectedGraphType,
  selectedArea,
}) => {
  return (
    <Card elevation={0}>
      {covidCasesLoading ? (
        <CircularProgress size={60} />
      ) : (
        <>
          <Chart
            options={getGraphOptions(selectedGraphValue, selectedArea)}
            series={getDataSeries(
              selectedGraphValue,
              covidCases,
              selectedGraphType
            )}
            type="area"
            height={500}
          />
        </>
      )}
    </Card>
  );
};
