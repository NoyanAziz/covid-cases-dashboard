import React from "react";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { DROPDOWN_MIN_WIDTH } from "../../constants";

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
      if (selectedProvince === "-1") {
        fetchCountryWiseCovidCases(selectedCountry, event.target.value);
      } else {
        fetchProvinceWiseCovidCases(selectedProvince, event.target.value);
      }
    }
  };

  return (
    <FormControl sx={{ minWidth: DROPDOWN_MIN_WIDTH }}>
      <InputLabel id="days-label">Days</InputLabel>

      <Select
        labelId="days-label"
        id="days"
        value={selectedDays}
        label="Days"
        onChange={handleDaysChange}
      >
        {days_list.map((option) => (
          <MenuItem value={option.days} key={option.days}>
            <Typography>{option.title}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
