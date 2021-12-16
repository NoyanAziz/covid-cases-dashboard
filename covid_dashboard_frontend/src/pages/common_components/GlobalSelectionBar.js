import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";

import {
  fetchCountries,
  fetchProvinces,
} from "../../redux/actions/parametersFetchAction";
import { DAYS_LIST } from "../../constants";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const UnconnectedGlobalSelectionBar = ({
  fetchCountries,
  fetchProvinces,
  countries,
  provinces,
}) => {
  const query = useQuery();
  const [selectedCountry, setSelectedCountry] = useState(query.get("country"));
  const [selectedProvince, setSelectedProvince] = useState(
    query.get("province")
  );
  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[3].title);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    fetchProvinces(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const handleDaysChange = (event) => {
    setSelectedDays(event.target.value);
  };

  useEffect(() => {
    fetchCountries();
    fetchProvinces(selectedCountry);
  }, [fetchCountries, fetchProvinces, selectedCountry]);

  return (
    <Box>
      <AppBar elevation={0} color="inherit" position="static">
        <Container>
          <Toolbar>
            <FormControl sx={{ ml: 10, minWidth: 120 }}>
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

            <FormControl sx={{ ml: 10, minWidth: 120 }}>
              <InputLabel id="province-label">Province</InputLabel>
              <Select
                labelId="province-label"
                id="province"
                value={selectedProvince ? selectedProvince : "All"}
                label="Province"
                disabled={!selectedCountry}
                onChange={handleProvinceChange}
              >
                <MenuItem
                  component={Link}
                  to={`/global-cases?country=${selectedCountry}&province=All`}
                  value="All"
                  key="All"
                >
                  <Typography>All</Typography>
                </MenuItem>
                {provinces !== null && provinces.provinces
                  ? provinces.provinces.map((province, index) => (
                      <MenuItem
                        component={Link}
                        to={`/global-cases?country=${selectedCountry}&province=${province.province_name}`}
                        value={province.province_name}
                        key={index}
                      >
                        <Typography>{province.province_name}</Typography>
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>

            <FormControl sx={{ ml: 10, minWidth: 120 }}>
              <InputLabel id="days-label">Days</InputLabel>
              <Select
                labelId="days-label"
                id="days"
                value={selectedDays}
                label="Days"
                onChange={handleDaysChange}
              >
                {DAYS_LIST.map((option, index) => (
                  <MenuItem value={option.title} key={index}>
                    <Typography>{option.title}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  countries: state.parameters.countries,
  provinces: state.parameters.provinces,
});
const mapDispatchToProps = {
  fetchCountries: fetchCountries,
  fetchProvinces: fetchProvinces,
};

export const GlobalSelectionBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSelectionBar);
