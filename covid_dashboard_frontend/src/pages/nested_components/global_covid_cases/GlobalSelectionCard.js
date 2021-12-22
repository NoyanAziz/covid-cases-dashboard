import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List, ListItem } from "@mui/material";

import {
  fetchCountries,
  fetchProvinces,
} from "../../../redux/actions/parametersFetchAction";
import { DAYS_LIST } from "../../../constants";
import { fetchCountryWiseCovidCases } from "../../../redux/actions/global_cases_actions/countryWiseCovidCasesAction";
import { fetchProvinceWiseCovidCases } from "../../../redux/actions/global_cases_actions/provinceWiseCovidCasesAction";
import { CountryDropDownMenu } from "./drop_down_menus/CountryDropDownMenu";
import { ProvinceDropDownMenu } from "./drop_down_menus/ProvinceDropDownMenu";
import { DaysDropDownMenu } from "../../common_components/DaysDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";

export const UnconnectedGlobalSelectionCard = ({
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
    query.get("country")
      ? query.get("country")
      : (window.location.search = "?country=Pakistan")
  );

  const [selectedProvince, setSelectedProvince] = useState(
    query.get("province") ? query.get("province") : "-1"
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_LIST[1].days);

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
    <Card elevation={0}>
      <List>
        <ListItem sx={{ mx: 5 }}>
          <CountryDropDownMenu
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            fetchProvinces={fetchProvinces}
            selectedDays={selectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            countries={countries}
          />
        </ListItem>

        <ListItem sx={{ m: 5 }}>
          <ProvinceDropDownMenu
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedDays={selectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            selectedCountry={selectedCountry}
            fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
            provinces={provinces}
          />
        </ListItem>

        <ListItem sx={{ m: 5 }}>
          <DaysDropDownMenu
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
            selectedProvince={selectedProvince}
            selectedCountry={selectedCountry}
            days_list={DAYS_LIST}
          />
        </ListItem>

        <ListItem sx={{ m: 5 }}>
          <GraphValueDropDownMenu
            selectedGraphValue={selectedGraphValue}
            setSelectedGraphValue={setSelectedGraphValue}
            options={[
              { title: "Confirmed", value: "confirmed" },
              { title: "Deaths", value: "deaths" },
              { title: "Recovered", value: "recovered" },
            ]}
          />
        </ListItem>
      </List>
    </Card>
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

export const GlobalSelectionCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSelectionCard);
