import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useLocation } from "react-router-dom";
import { Box, AppBar, Container, Toolbar } from "@mui/material";

import { fetchStates } from "../../../redux/actions/parametersFetchAction";
import { DAYS_LIST, SELECTION_BAR_MARGIN_TOP } from "../../../constants";
import { fetchStateWiseCovidCases } from "../../../redux/actions/us_cases_actions/stateWiseCovidCasesAction";
import { DaysDropDownMenu } from "../../common_components/DaysDropDownMenu";
import { StateDropDownMenu } from "./StateDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/GraphValueDropDownMenu";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const UnconnectedUSSelectionBar = ({
  selectedGraphValue,
  setSelectedGraphValue,
  fetchStates,
  states,
  fetchStateWiseCovidCases,
}) => {
  const query = useQuery();

  const [selectedState, setSelectedState] = useState(
    query.get("state") ? query.get("state") : ""
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[3].days);

  useEffect(() => {
    fetchStates();
    if (selectedState)
      fetchStateWiseCovidCases(selectedState, DAYS_LIST[3].days);
  }, [fetchStates, fetchStateWiseCovidCases, selectedState]);

  return (
    <Box>
      <AppBar
        elevation={0}
        color="inherit"
        position="static"
        sx={{ mt: SELECTION_BAR_MARGIN_TOP }}
      >
        <Container>
          <Toolbar>
            <StateDropDownMenu
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              fetchStateWiseCovidCases={fetchStateWiseCovidCases}
              selectedDays={selectedDays}
              states={states}
            />

            <DaysDropDownMenu
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              fetchStateWiseCovidCases={fetchStateWiseCovidCases}
              selectedState={selectedState}
              days_list={DAYS_LIST}
            />

            <GraphValueDropDownMenu
              selectedGraphValue={selectedGraphValue}
              setSelectedGraphValue={setSelectedGraphValue}
              options={["confirmed", "deaths"]}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  states: state.parameters.states,
});

const mapDispatchToProps = {
  fetchStates: fetchStates,
  fetchStateWiseCovidCases: fetchStateWiseCovidCases,
};

export const USSelectionBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedUSSelectionBar);
