import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List } from "@mui/material";

import {
  DAYS_LIST,
  DAYS_SELECTED_DEFAULT,
  STATE_SELECTED_DEFAULT,
  US_GRAPH_VALUE_OPTIONS,
} from "../../../constants";
import { fetchStateWiseCovidCases } from "../../../redux/actions/us_cases_actions/stateWiseCovidCasesAction";
import { DaysDropDownMenu } from "../../common_components/common_drop_down_menus/DaysDropDownMenu";
import { StateDropDownMenu } from "./StateDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/common_drop_down_menus/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";
import { GraphTypeDropDownMenu } from "../../common_components/common_drop_down_menus/GraphTypeDropDownMenu";
import { StyledListItem } from "../../../styled_components/SelectionCardStyles";

export const UnconnectedUSSelectionCard = ({
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
      : (window.location.search = `?state=${STATE_SELECTED_DEFAULT}`)
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_SELECTED_DEFAULT);

  useEffect(() => {
    if (selectedState && selectedDays)
      fetchStateWiseCovidCases(selectedState, selectedDays);
  }, [fetchStates, fetchStateWiseCovidCases, selectedState, selectedDays]);

  return (
    <Card elevation={0}>
      <List>
        <StyledListItem>
          <StateDropDownMenu
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            fetchStateWiseCovidCases={fetchStateWiseCovidCases}
            selectedDays={selectedDays}
            states={states}
          />
        </StyledListItem>

        <StyledListItem>
          <DaysDropDownMenu
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            fetchStateWiseCovidCases={fetchStateWiseCovidCases}
            selectedState={selectedState}
            days_list={DAYS_LIST}
          />
        </StyledListItem>

        <StyledListItem>
          <GraphValueDropDownMenu
            selectedGraphValue={selectedGraphValue}
            setSelectedGraphValue={setSelectedGraphValue}
            options={US_GRAPH_VALUE_OPTIONS}
          />
        </StyledListItem>

        <StyledListItem>
          <GraphTypeDropDownMenu
            selectedGraphType={selectedGraphType}
            setSelectedGraphType={setSelectedGraphType}
          />
        </StyledListItem>
      </List>
    </Card>
  );
};

const mapDispatchToProps = {
  fetchStateWiseCovidCases: fetchStateWiseCovidCases,
};

export const USSelectionCard = connect(
  null,
  mapDispatchToProps
)(UnconnectedUSSelectionCard);
