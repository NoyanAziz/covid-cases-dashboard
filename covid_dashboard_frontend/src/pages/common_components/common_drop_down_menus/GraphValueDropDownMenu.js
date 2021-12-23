import React from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { DROPDOWN_MARGIN_LEFT, DROPDOWN_MIN_WIDTH } from "../../../constants";

export const GraphValueDropDownMenu = ({
  selectedGraphValue,
  setSelectedGraphValue,
  options,
}) => {
  const handleGraphValueChange = (event) => {
    setSelectedGraphValue(event.target.value);
  };

  return (
    <FormControl
      sx={{ ml: DROPDOWN_MARGIN_LEFT, minWidth: DROPDOWN_MIN_WIDTH }}
    >
      <InputLabel id="graph-value-label">Graph Value</InputLabel>

      <Select
        labelId="graph-value-label"
        id="graph-value"
        value={selectedGraphValue}
        label="Graph Value"
        onChange={handleGraphValueChange}
      >
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            <Typography>{option.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
