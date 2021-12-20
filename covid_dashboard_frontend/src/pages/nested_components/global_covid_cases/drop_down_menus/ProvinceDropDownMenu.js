import React from "react";

import { Link } from "react-router-dom";
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
} from "../../../../constants";

export const ProvinceDropDownMenu = ({
  selectedProvince,
  setSelectedProvince,
  selectedDays,
  fetchCountryWiseCovidCases,
  selectedCountry,
  fetchProvinceWiseCovidCases,
  provinces,
}) => {
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    if (selectedDays && event.target.value === "-1") {
      fetchCountryWiseCovidCases(selectedCountry, selectedDays);
    } else if (selectedDays && event.target.value !== "-1") {
      fetchProvinceWiseCovidCases(event.target.value, selectedDays);
    }
  };

  return (
    <FormControl
      sx={{ ml: DROPDOWN_MARGIN_LEFT, minWidth: DROPDOWN_MIN_WIDTH }}
    >
      <InputLabel id="province-label">Province</InputLabel>
      <Select
        labelId="province-label"
        id="province"
        value={selectedProvince ? selectedProvince : "-1"}
        label="Province"
        disabled={!selectedCountry}
        onChange={handleProvinceChange}
      >
        <MenuItem
          component={Link}
          to={`/global-cases?country=${selectedCountry}&province=-1`}
          value="-1"
          key="All"
        >
          <Typography>All</Typography>
        </MenuItem>
        {provinces !== null && provinces.provinces
          ? provinces.provinces.map((province) =>
              province.province_name ? (
                <MenuItem
                  component={Link}
                  to={`/global-cases?country=${selectedCountry}&province=${province.id}`}
                  value={province.id}
                  key={province.id}
                >
                  <Typography>{province.province_name}</Typography>
                </MenuItem>
              ) : null
            )
          : null}
      </Select>
    </FormControl>
  );
};
