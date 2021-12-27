import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List, ListItem } from "@mui/material";

import {
  DAYS_LIST,
  DAYS_SELECTED_DEFAULT,
  STATE_SELECTED_DEFAULT,
} from "../../../constants";
import { fetchStateWiseCovidCases } from "../../../redux/actions/us_cases_actions/stateWiseCovidCasesAction";
import { DaysDropDownMenu } from "../../common_components/common_drop_down_menus/DaysDropDownMenu";
import { StateDropDownMenu } from "./StateDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/common_drop_down_menus/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";
import { GraphTypeDropDownMenu } from "../../common_components/common_drop_down_menus/GraphTypeDropDownMenu";

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

const mapDispatchToProps = {
  fetchStateWiseCovidCases: fetchStateWiseCovidCases,
};

export const USSelectionCard = connect(
  null,
  mapDispatchToProps
)(UnconnectedUSSelectionCard);
