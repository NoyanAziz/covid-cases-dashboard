import React from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import {
  DROPDOWN_MIN_WIDTH,
  DROP_DOWN_LABELS,
  GRAPH_TYPE_OPTIONS,
} from "../../../constants";

export const GraphTypeDropDownMenu = ({
  selectedGraphType,
  setSelectedGraphType,
}) => {
  const handleGraphTypeChange = (event) => {
    setSelectedGraphType(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: DROPDOWN_MIN_WIDTH }}>
      <InputLabel id="graph-type-label">
        {DROP_DOWN_LABELS.graphType}
      </InputLabel>

      <Select
        labelId="graph-type-label"
        id="graph-type"
        value={selectedGraphType}
        label={DROP_DOWN_LABELS.graphType}
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
