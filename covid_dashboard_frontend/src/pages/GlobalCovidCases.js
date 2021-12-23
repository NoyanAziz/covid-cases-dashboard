import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Box,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";

import { CasesToolbar } from "./common_components/CasesToolbar";
import { GlobalSelectionCard } from "./nested_components/global_covid_cases/GlobalSelectionCard";
import { DataGraph } from "./common_components/DataGraph";
import { useQuery } from "../utils";
import { fetchCountries } from "../redux/actions/dropdown_options_action/parametersFetchAction";
import {
  COUNTRY_SELECTED_DEFAULT,
  GRAPH_TYPE_SELECTED_DEFAULT,
  GRAPH_VALUE_SELECTED_DEFAULT,
  PAGE_LOADER_SIZE,
  PAGE_TITLES,
  PRIMARY_COLOR,
} from "../constants";

export const UnconnectedGlobalCovidCases = ({
  countries,
  globalCovidCases,

  fetchCountries,

  countriesLoading,
  globalCovidCasesLoading,
}) => {
  const query = useQuery();
  const [selectedGraphValue, setSelectedGraphValue] = useState(
    GRAPH_VALUE_SELECTED_DEFAULT
  );
  const [selectedGraphType, setSelectedGraphType] = useState(
    GRAPH_TYPE_SELECTED_DEFAULT
  );

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

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
          color={PRIMARY_COLOR}
          style={{ fontFamily: "sans-serif" }}
        >
          {PAGE_TITLES.globalCovidCases}
        </Typography>
      </Box>

      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ minHeight: "60vh" }}
      >
        {countriesLoading ? (
          <Grid item xs={12}>
            <CircularProgress size={PAGE_LOADER_SIZE} />
          </Grid>
        ) : (
          <>
            <Grid item xs={2} sx={{ py: 10 }}>
              <GlobalSelectionCard
                selectedGraphValue={selectedGraphValue}
                setSelectedGraphValue={setSelectedGraphValue}
                selectedGraphType={selectedGraphType}
                setSelectedGraphType={setSelectedGraphType}
                countries={countries}
              />
            </Grid>

            <Divider orientation="vertical" flexItem />

            <Grid item xs={9} sx={{ p: 10 }}>
              <DataGraph
                covidCases={globalCovidCases}
                covidCasesLoading={globalCovidCasesLoading}
                selectedGraphValue={selectedGraphValue}
                selectedGraphType={selectedGraphType}
                selectedArea={
                  query.get("country")
                    ? query.get("country")
                    : COUNTRY_SELECTED_DEFAULT
                }
              />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  countries: state.parameters.countries,
  globalCovidCases: state.covid_cases_data.globalCovidCases.covid_cases,

  countriesLoading: state.loadingStates.countriesLoading,
  globalCovidCasesLoading: state.loadingStates.globalCovidCasesLoading,
});

const mapDispatchToProps = {
  fetchCountries: fetchCountries,
};

export const GlobalCovidCases = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalCovidCases);
