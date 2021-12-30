import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Box, Grid, Divider, CircularProgress } from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { USSelectionCard } from "./nested_components/us_covid_cases/USSelectionCard";
import { DataGraph } from "./common_components/DataGraph";
import { useQuery } from "../utils";
import { fetchStates } from "../redux/actions/dropdown_options_action/parametersFetchAction";
import {
  GRAPH_TYPE_SELECTED_DEFAULT,
  GRAPH_VALUE_SELECTED_DEFAULT,
  PAGE_TITLES,
  PRIMARY_COLOR,
  STATE_SELECTED_DEFAULT,
} from "../constants";
import { StyledContainerGrid } from "../styled_components/ContainerGridStyles";
import {
  HeadingBox,
  HeadingTypography,
} from "../styled_components/MainPageStyles";

export const UnconnectedUSCovidCases = ({
  states,
  usCovidCases,

  fetchStates,

  statesLoading,
  usCovidCasesLoading,
}) => {
  const query = useQuery();
  const [selectedGraphValue, setSelectedGraphValue] = useState(
    GRAPH_VALUE_SELECTED_DEFAULT
  );
  const [selectedGraphType, setSelectedGraphType] = useState(
    GRAPH_TYPE_SELECTED_DEFAULT
  );

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <Box className="div">
      <CasesToolbar />
      <HeadingBox justifyItems={"flex-start"}>
        <HeadingTypography component="div" variant="h3" color={PRIMARY_COLOR}>
          {PAGE_TITLES.usCovidCases}
        </HeadingTypography>
      </HeadingBox>

      <StyledContainerGrid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {statesLoading ? (
          <Grid item xs={12}>
            <CircularProgress size={100} />
          </Grid>
        ) : (
          <>
            <Grid item xs={2}>
              <USSelectionCard
                selectedGraphValue={selectedGraphValue}
                setSelectedGraphValue={setSelectedGraphValue}
                selectedGraphType={selectedGraphType}
                setSelectedGraphType={setSelectedGraphType}
                states={states}
                fetchStates={fetchStates}
              />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs={9}>
              <DataGraph
                covidCases={usCovidCases}
                covidCasesLoading={usCovidCasesLoading}
                selectedGraphValue={selectedGraphValue}
                selectedGraphType={selectedGraphType}
                selectedArea={
                  query.get("state")
                    ? query.get("state")
                    : STATE_SELECTED_DEFAULT
                }
              />
            </Grid>
          </>
        )}
      </StyledContainerGrid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  states: state.parameters.states,
  usCovidCases: state.covid_cases_data.usCovidCases,

  statesLoading: state.loadingStates.statesLoading,
  usCovidCasesLoading: state.loadingStates.usCovidCasesLoading,
});

const mapDispatchToProps = {
  fetchStates: fetchStates,
};

export const USCovidCases = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedUSCovidCases);
