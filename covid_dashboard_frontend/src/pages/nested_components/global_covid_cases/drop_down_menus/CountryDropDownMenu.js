import React from "react";

import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

import { DROPDOWN_MIN_WIDTH } from "../../../../constants";

export const CountryDropDownMenu = ({
  selectedCountry,
  setSelectedCountry,
  fetchProvinces,
  selectedDays,
  fetchCountryWiseCovidCases,
  countries,
}) => {
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    fetchProvinces(event.target.value);
    if (selectedDays)
      fetchCountryWiseCovidCases(event.target.value, selectedDays);
  };

  return (
    <FormControl
      sx={{
        minWidth: DROPDOWN_MIN_WIDTH,
      }}
    >
      <InputLabel id="country-label">Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={selectedCountry}
        label="Country"
        onChange={handleCountryChange}
      >
        {countries.map((country, index) => (
          <MenuItem
            component={Link}
            to={`/global-cases?country=${country.name}`}
            value={country.name}
            key={index}
          >
            <Typography>{country.name}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
