import React from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  DROPDOWN_MARGIN_LEFT,
  DROPDOWN_MIN_WIDTH,
  GRAPH_TYPE_OPTIONS,
} from "../../constants";

export const GraphTypeDropDownMenu = ({
  selectedGraphType,
  setSelectedGraphType,
}) => {
  const handleGraphTypeChange = (event) => {
    setSelectedGraphType(event.target.value);
  };

  return (
    <FormControl
      sx={{ ml: DROPDOWN_MARGIN_LEFT, minWidth: DROPDOWN_MIN_WIDTH }}
    >
      <InputLabel id="graph-type-label">Graph Type</InputLabel>

      <Select
        labelId="graph-type-label"
        id="graph-type"
        value={selectedGraphType}
        label="Graph Type"
        onChange={handleGraphTypeChange}
      >
        {GRAPH_TYPE_OPTIONS.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            <Typography>{option.value}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
