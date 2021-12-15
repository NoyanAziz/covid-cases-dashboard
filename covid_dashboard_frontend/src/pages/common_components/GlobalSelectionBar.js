import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { fetchCountries } from "../../redux/actions/parametersFetchAction";

export const UnconnectedGlobalSelectionBar = ({
  fetchCountries,
  countries,
  provinces,
}) => {
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

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
                value={country}
                label="Country"
                onChange={handleCountryChange}
              >
                {countries.map((country) => (
                  <MenuItem
                    component={Link}
                    to="/global-cases/Pakistan"
                    value={country}
                  >
                    {country}
                  </MenuItem>
                ))}
                {/* <MenuItem
                  component={Link}
                  to="/global-cases/Pakistan"
                  value="Pakistan"
                >
                  Pakistan
                </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>

            <FormControl sx={{ ml: 10, minWidth: 120 }}>
              <InputLabel id="province-label">Province</InputLabel>
              <Select
                labelId="province-label"
                id="province"
                value={province}
                label="Province"
                onChange={handleProvinceChange}
              >
                {" "}
                <MenuItem
                  component={Link}
                  to={`/global-cases?country=${country}&province=Punjab`}
                  value={10}
                >
                  Punjab
                </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
};

export const GlobalSelectionBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSelectionBar);
