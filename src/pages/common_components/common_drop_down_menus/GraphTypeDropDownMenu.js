import React from "react";

import { InputLabel, Select, MenuItem, Typography } from "@mui/material";

import { DROP_DOWN_LABELS, GRAPH_TYPE_OPTIONS } from "../../../constants";
import { StyledFormControl } from "../../../styled_components/SelectionCardStyles";

export const GraphTypeDropDownMenu = ({
  selectedGraphType,
  setSelectedGraphType,
}) => {
  const handleGraphTypeChange = (event) => {
    setSelectedGraphType(event.target.value);
  };

  return (
    <StyledFormControl>
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
    </StyledFormControl>
  );
};
