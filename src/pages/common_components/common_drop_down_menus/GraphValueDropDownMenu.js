import React from "react";

import { InputLabel, Select, MenuItem, Typography } from "@mui/material";

import { DROP_DOWN_LABELS } from "../../../constants";
import { StyledFormControl } from "../../../styled_components/SelectionCardStyles";

export const GraphValueDropDownMenu = ({
  selectedGraphValue,
  setSelectedGraphValue,
  options,
}) => {
  const handleGraphValueChange = (event) => {
    setSelectedGraphValue(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel id="graph-value-label">
        {DROP_DOWN_LABELS.graphValue}
      </InputLabel>

      <Select
        labelId="graph-value-label"
        id="graph-value"
        value={selectedGraphValue}
        label={DROP_DOWN_LABELS.graphValue}
        onChange={handleGraphValueChange}
      >
        {options.map((option, index) => (
          <MenuItem value={option.value} key={index}>
            <Typography>{option.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
