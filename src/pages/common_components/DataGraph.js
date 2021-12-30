import React from "react";

import { CircularProgress } from "@mui/material";
import Chart from "react-apexcharts";

import { getDataSeries, getGraphOptions } from "../../utils";
import { GRAPH_HEIGHT, GRAPH_LOADER_SIZE } from "../../constants";
import { StyledGraphCard } from "../../styled_components/GraphStyles";

export const DataGraph = ({
  covidCases,
  covidCasesLoading,
  selectedGraphValue,
  selectedGraphType,
  selectedArea,
}) => {
  return (
    <StyledGraphCard elevation={0}>
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
    </StyledGraphCard>
  );
};
