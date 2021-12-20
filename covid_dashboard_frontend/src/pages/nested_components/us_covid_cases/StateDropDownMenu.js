import React from "react";

import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { DROPDOWN_MARGIN_LEFT, DROPDOWN_MIN_WIDTH } from "../../../constants";

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
    <FormControl
      sx={{ ml: DROPDOWN_MARGIN_LEFT, minWidth: DROPDOWN_MIN_WIDTH }}
    >
      <InputLabel id="state-label">State</InputLabel>

      <Select
        labelId="state-label"
        id="state"
        value={selectedState}
        label="State"
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
    </FormControl>
  );
};
