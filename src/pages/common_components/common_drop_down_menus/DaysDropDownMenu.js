import React from "react";

import { InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { ALL_PROVINCE_ITEM, DROP_DOWN_LABELS } from "../../../constants";
import { StyledFormControl } from "../../../styled_components/SelectionCardStyles";

export const DaysDropDownMenu = ({
  selectedDays,
  setSelectedDays,
  fetchCountryWiseCovidCases,
  fetchProvinceWiseCovidCases,
  selectedProvince,
  selectedCountry,
  fetchStateWiseCovidCases,
  selectedState,
  days_list,
}) => {
  const handleDaysChange = (event) => {
    setSelectedDays(event.target.value);
    if (selectedState)
      fetchStateWiseCovidCases(selectedState, event.target.value);
    else {
      if (selectedProvince === ALL_PROVINCE_ITEM.value) {
        fetchCountryWiseCovidCases(selectedCountry, event.target.value);
      } else {
        fetchProvinceWiseCovidCases(selectedProvince, event.target.value);
      }
    }
  };

  return (
    <StyledFormControl>
      <InputLabel id="days-label">{DROP_DOWN_LABELS.days}</InputLabel>

      <Select
        labelId="days-label"
        id="days"
        value={selectedDays}
        label={DROP_DOWN_LABELS.days}
        onChange={handleDaysChange}
      >
        {days_list.map((option) => (
          <MenuItem value={option.days} key={option.days}>
            <Typography>{option.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
