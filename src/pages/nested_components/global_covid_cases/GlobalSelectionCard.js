import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, List } from "@mui/material";

import { fetchProvinces } from "../../../redux/actions/dropdown_options_action/parametersFetchAction";
import {
  ALL_PROVINCE_ITEM,
  COUNTRY_SELECTED_DEFAULT,
  DAYS_LIST,
  DAYS_SELECTED_DEFAULT,
  GLOBAL_GRAPH_VALUE_OPTIONS,
} from "../../../constants";
import { fetchCountryWiseCovidCases } from "../../../redux/actions/global_cases_actions/countryWiseCovidCasesAction";
import { fetchProvinceWiseCovidCases } from "../../../redux/actions/global_cases_actions/provinceWiseCovidCasesAction";
import { CountryDropDownMenu } from "./global_drop_down_menus/CountryDropDownMenu";
import { ProvinceDropDownMenu } from "./global_drop_down_menus/ProvinceDropDownMenu";
import { DaysDropDownMenu } from "../../common_components/common_drop_down_menus/DaysDropDownMenu";
import { GraphValueDropDownMenu } from "../../common_components/common_drop_down_menus/GraphValueDropDownMenu";
import { useQuery } from "../../../utils";
import { GraphTypeDropDownMenu } from "../../common_components/common_drop_down_menus/GraphTypeDropDownMenu";
import { StyledListItem } from "../../../styled_components/SelectionCardStyles";

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
        <StyledListItem>
          <CountryDropDownMenu
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            fetchProvinces={fetchProvinces}
            selectedDays={selectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            countries={countries}
          />
        </StyledListItem>

        <StyledListItem>
          <ProvinceDropDownMenu
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            selectedDays={selectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            selectedCountry={selectedCountry}
            fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
            provinces={provinces}
          />
        </StyledListItem>

        <StyledListItem>
          <DaysDropDownMenu
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            fetchCountryWiseCovidCases={fetchCountryWiseCovidCases}
            fetchProvinceWiseCovidCases={fetchProvinceWiseCovidCases}
            selectedProvince={selectedProvince}
            selectedCountry={selectedCountry}
            days_list={DAYS_LIST}
          />
        </StyledListItem>

        <StyledListItem>
          <GraphValueDropDownMenu
            selectedGraphValue={selectedGraphValue}
            setSelectedGraphValue={setSelectedGraphValue}
            options={GLOBAL_GRAPH_VALUE_OPTIONS}
          />
        </StyledListItem>

        <StyledListItem>
          <GraphTypeDropDownMenu
            selectedGraphType={selectedGraphType}
            setSelectedGraphType={setSelectedGraphType}
          />
        </StyledListItem>
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
