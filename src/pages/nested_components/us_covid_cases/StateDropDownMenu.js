import React from "react";

import { Link } from "react-router-dom";
import { InputLabel, Select, MenuItem, Typography } from "@mui/material";

import { DROP_DOWN_LABELS } from "../../../constants";
import { StyledFormControl } from "../../../styled_components/SelectionCardStyles";

export const StateDropDownMenu = ({
  selectedState,
  setSelectedState,
  fetchStateWiseCovidCases,
  selectedDays,
  states,
}) => {
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    fetchStateWiseCovidCases(event.target.value, selectedDays);
  };

  return (
    <StyledFormControl>
      <InputLabel id="state-label">{DROP_DOWN_LABELS.state}</InputLabel>

      <Select
        labelId="state-label"
        id="state"
        value={selectedState}
        label={DROP_DOWN_LABELS.state}
        onChange={handleStateChange}
      >
        {states.map((state) => (
          <MenuItem
            component={Link}
            to={`/us-cases?state=${state.id}`}
            value={state.id}
            key={state.id}
          >
            <Typography>{state.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
