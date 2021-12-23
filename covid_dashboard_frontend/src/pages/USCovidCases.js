import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Box,
  Typography,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { USSelectionCard } from "./nested_components/us_covid_cases/USSelectionCard";
import { DataGraph } from "./common_components/DataGraph";
import { useQuery } from "../utils";
import { fetchStates } from "../redux/actions/dropdown_options_action/parametersFetchAction";

export const UnconnectedUSCovidCases = ({
  states,
  usCovidCases,

  fetchStates,

  statesLoading,
  usCovidCasesLoading,
}) => {
  const query = useQuery();
  const [selectedGraphValue, setSelectedGraphValue] = useState("confirmed");
  const [selectedGraphType, setSelectedGraphType] = useState("Discrete");

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  return (
    <Box className="div">
      <CasesToolbar sx={{ minHeight: "10vh" }} />
      <Box
        justifyItems={"flex-start"}
        sx={{ width: "100%", maxWidth: 500, p: 2 }}
      >
        <Typography
          component="div"
          variant="h3"
          color="#1DA1FF"
          style={{ fontFamily: "sans-serif" }}
        >
          US Covid Cases
        </Typography>
      </Box>

      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ minHeight: "60vh" }}
      >
        {statesLoading ? (
          <Grid item xs={12}>
            <CircularProgress size={100} />
          </Grid>
        ) : (
          <>
            <Grid item xs={2} sx={{ py: 10 }}>
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

            <Grid item xs={9} sx={{ p: 10 }}>
              <DataGraph
                covidCases={usCovidCases}
                covidCasesLoading={usCovidCasesLoading}
                selectedGraphValue={selectedGraphValue}
                selectedGraphType={selectedGraphType}
                selectedArea={query.get("state") ? query.get("state") : ""}
              />
            </Grid>
          </>
        )}
      </Grid>
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
