import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { useLocation } from "react-router-dom";

import { Box, AppBar, Container, Toolbar } from "@mui/material";

import {
  fetchCountries,
  fetchProvinces,
} from "../../../redux/actions/parametersFetchAction";
import { DAYS_LIST, SELECTION_BAR_MARGIN_TOP } from "../../../constants";
import { fetchCountryWiseCovidCases } from "../../../redux/actions/global_cases_actions/countryWiseCovidCasesAction";
import { fetchProvinceWiseCovidCases } from "../../../redux/actions/global_cases_actions/provinceWiseCovidCasesAction";
import { CountryDropDownMenu } from "./drop_down_menus/CountryDropDownMenu";
import { ProvinceDropDownMenu } from "./drop_down_menus/ProvinceDropDownMenu";
import { DaysDropDownMenu } from "../../common_components/DaysDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/GraphValueDropDownMenu";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const UnconnectedGlobalSelectionBar = ({
  selectedGraphValue,
  setSelectedGraphValue,
  fetchCountries,
  fetchProvinces,
  countries,
  provinces,
  fetchCountryWiseCovidCases,
  fetchProvinceWiseCovidCases,
}) => {
  const query = useQuery();

  const [selectedCountry, setSelectedCountry] = useState(
    query.get("country") ? query.get("country") : ""
  );

  const [selectedProvince, setSelectedProvince] = useState(
    query.get("province") ? query.get("province") : "-1"
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[3].days);

  useEffect(() => {
    fetchCountries();
    if (selectedCountry) {
      fetchProvinces(selectedCountry);
      if (selectedProvince) {
        if (selectedDays && selectedProvince === "-1") {
          fetchCountryWiseCovidCases(selectedCountry, selectedDays);
        } else if (selectedDays && selectedProvince !== "-1") {
          fetchProvinceWiseCovidCases(selectedProvince, selectedDays);
        }
      }
    }
  }, [
    fetchCountries,
    fetchProvinces,
    selectedCountry,
    selectedDays,
    selectedProvince,
    fetchCountryWiseCovidCases,
    fetchProvinceWiseCovidCases,
  ]);

  return (
    <Box>
      <AppBar
        elevation={0}
        color="inherit"
        position="static"
        sx={{ mt: SELECTION_BAR_MARGIN_TOP }}
      >
        <Container>
          <Toolbar>
            <CountryDropDownMenu
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              fetchProvinces={fetchProvinces}
              selectedDays={selectedDays}
              fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
              countries={countries}
            />

            <ProvinceDropDownMenu
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              selectedDays={selectedDays}
              fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
              selectedCountry={selectedCountry}
              fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
              provinces={provinces}
            />

            <DaysDropDownMenu
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
              fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
              selectedProvince={selectedProvince}
              selectedCountry={selectedCountry}
              days_list={DAYS_LIST}
            />

            <GraphValueDropDownMenu
              selectedGraphValue={selectedGraphValue}
              setSelectedGraphValue={setSelectedGraphValue}
              options={["confirmed", "deaths", "recovered"]}
            />
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
  fetchCountryWiseCovidCases: fetchCountryWiseCovidCases,
  fetchProvinceWiseCovidCases: fetchProvinceWiseCovidCases,
};

export const GlobalSelectionBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSelectionBar);
