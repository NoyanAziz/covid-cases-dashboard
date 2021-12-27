import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List, ListItem } from "@mui/material";

import { fetchProvinces } from "../../../redux/actions/dropdown_options_action/parametersFetchAction";
import {
  ALL_PROVINCE_ITEM,
  COUNTRY_SELECTED_DEFAULT,
  DAYS_LIST,
  DAYS_SELECTED_DEFAULT,
} from "../../../constants";
import { fetchCountryWiseCovidCases } from "../../../redux/actions/global_cases_actions/countryWiseCovidCasesAction";
import { fetchProvinceWiseCovidCases } from "../../../redux/actions/global_cases_actions/provinceWiseCovidCasesAction";
import { CountryDropDownMenu } from "./global_drop_down_menus/CountryDropDownMenu";
import { ProvinceDropDownMenu } from "./global_drop_down_menus/ProvinceDropDownMenu";
import { DaysDropDownMenu } from "../../common_components/common_drop_down_menus/DaysDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/common_drop_down_menus/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";
import { GraphTypeDropDownMenu } from "../../common_components/common_drop_down_menus/GraphTypeDropDownMenu";

export const UnconnectedGlobalSelectionCard = ({
  selectedGraphValue,
  setSelectedGraphValue,

  selectedGraphType,
  setSelectedGraphType,

  fetchCountries,
  fetchProvinces,

  countries,
  provinces,

  fetchCountryWiseCovidCases,
  fetchProvinceWiseCovidCases,

  countriesLoading,
  provincesLoading,
}) => {
  const query = useQuery();

  const [selectedCountry, setSelectedCountry] = useState(
    query.get("country")
      ? query.get("country")
      : (window.location.search = `?country=${COUNTRY_SELECTED_DEFAULT}`)
  );

  const [selectedProvince, setSelectedProvince] = useState(
    query.get("province") ? query.get("province") : ALL_PROVINCE_ITEM.value
  );

  const [selectedDays, setSelectedDays] = useState(DAYS_SELECTED_DEFAULT);

  useEffect(() => {
    if (selectedCountry) {
      fetchProvinces(selectedCountry);
      if (selectedProvince) {
        if (selectedDays && selectedProvince === ALL_PROVINCE_ITEM.value) {
          fetchCountryWiseCovidCases(selectedCountry, selectedDays);
        } else if (
          selectedDays &&
          selectedProvince !== ALL_PROVINCE_ITEM.value
        ) {
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

        <ListItem sx={{ m: 5 }}>
          <GraphTypeDropDownMenu
            selectedGraphType={selectedGraphType}
            setSelectedGraphType={setSelectedGraphType}
          />
        </ListItem>
      </List>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  provinces: state.parameters.provinces,
});
const mapDispatchToProps = {
  fetchProvinces: fetchProvinces,
  fetchCountryWiseCovidCases: fetchCountryWiseCovidCases,
  fetchProvinceWiseCovidCases: fetchProvinceWiseCovidCases,
};

export const GlobalSelectionCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedGlobalSelectionCard);
