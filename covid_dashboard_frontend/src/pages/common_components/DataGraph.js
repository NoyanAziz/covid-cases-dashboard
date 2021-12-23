import React from "react";

import { Card, CircularProgress } from "@mui/material";
import Chart from "react-apexcharts";

import { getDataSeries, getGraphOptions } from "../../utils";
import { GRAPH_HEIGHT, GRAPH_LOADER_SIZE } from "../../constants";

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
        <CircularProgress size={GRAPH_LOADER_SIZE} />
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
            height={GRAPH_HEIGHT}
          />
        </>
      )}
    </Card>
  );
};
