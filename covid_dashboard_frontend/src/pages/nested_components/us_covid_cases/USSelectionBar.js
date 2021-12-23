import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List, ListItem } from "@mui/material";

import { fetchStates } from "../../../redux/actions/parametersFetchAction";
import { DAYS_LIST } from "../../../constants";
import { fetchStateWiseCovidCases } from "../../../redux/actions/us_cases_actions/stateWiseCovidCasesAction";
import { DaysDropDownMenu } from "../../common_components/DaysDropDownMenu";
import { StateDropDownMenu } from "./StateDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";
import { GraphTypeDropDownMenu } from "../../common_components/GraphTypeDropDownMenu";

export const UnconnectedUSSelectionBar = ({
  selectedGraphValue,
  setSelectedGraphValue,
  selectedGraphType,
  setSelectedGraphType,
  fetchStates,
  states,
  fetchStateWiseCovidCases,
}) => {
  const query = useQuery();

  const [selectedState, setSelectedState] = useState(
    query.get("state")
      ? query.get("state")
      : (window.location.search = "?state=58")
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[1].days);

  useEffect(() => {
    fetchStates();
    if (selectedState)
      fetchStateWiseCovidCases(selectedState, DAYS_LIST[1].days);
  }, [fetchStates, fetchStateWiseCovidCases, selectedState]);

  return (
    <Card elevation={0}>
      <List>
        <ListItem sx={{ mx: 5 }}>
          <StateDropDownMenu
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            fetchStateWiseCovidCases={fetchStateWiseCovidCases}
            selectedDays={selectedDays}
            states={states}
          />
        </ListItem>

        <ListItem sx={{ m: 5 }}>
          <DaysDropDownMenu
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            fetchStateWiseCovidCases={fetchStateWiseCovidCases}
            selectedState={selectedState}
            days_list={DAYS_LIST}
          />
        </ListItem>

        <ListItem sx={{ m: 5 }}>
          <GraphValueDropDownMenu
            selectedGraphValue={selectedGraphValue}
            setSelectedGraphValue={setSelectedGraphValue}
            options={[
              { title: "Confirmed", value: "confirmed" },
              { title: "Deaths", value: "deaths" },
            ]}
          />
        </ListItem>
        <ListItem sx={{ m: 5 }}>
          <GraphTypeDropDownMenu
            selectedGraphType={selectedGraphType}
            setSelectedGraphType={setSelectedGraphType}
          />
        </ListItem>
      </List>
    </Card>
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
