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
  ALL_PROVINCE_ITEM,
  DROPDOWN_MIN_WIDTH,
  DROP_DOWN_LABELS,
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
    if (selectedDays && event.target.value === ALL_PROVINCE_ITEM.value) {
      fetchCountryWiseCovidCases(selectedCountry, selectedDays);
    } else if (selectedDays && event.target.value !== ALL_PROVINCE_ITEM.value) {
      fetchProvinceWiseCovidCases(event.target.value, selectedDays);
    }
  };

  return (
    <FormControl sx={{ minWidth: DROPDOWN_MIN_WIDTH }}>
      <InputLabel id="province-label">{DROP_DOWN_LABELS.province}</InputLabel>
      <Select
        labelId="province-label"
        id="province"
        value={selectedProvince ? selectedProvince : ALL_PROVINCE_ITEM.value}
        label={DROP_DOWN_LABELS.province}
        disabled={!selectedCountry}
        onChange={handleProvinceChange}
      >
        <MenuItem
          component={Link}
          to={`/global-cases?country=${selectedCountry}&province=-1`}
          value={ALL_PROVINCE_ITEM.value}
          key={ALL_PROVINCE_ITEM.title}
        >
          <Typography>{ALL_PROVINCE_ITEM.title}</Typography>
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
