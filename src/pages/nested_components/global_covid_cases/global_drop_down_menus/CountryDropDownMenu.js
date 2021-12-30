import React from "react";

import { Link } from "react-router-dom";
import { InputLabel, Select, MenuItem, Typography } from "@mui/material";

import { DROP_DOWN_LABELS } from "../../../../constants";
import { StyledFormControl } from "../../../../styled_components/SelectionCardStyles";

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
    <StyledFormControl>
      <InputLabel id="country-label">{DROP_DOWN_LABELS.country}</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={selectedCountry}
        label={DROP_DOWN_LABELS.country}
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
    </StyledFormControl>
  );
};
