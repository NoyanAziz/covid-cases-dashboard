export const SET_COUNTRIES_LOADING = "SET_COUNTRIES_LOADING";
export const SET_STATES_LOADING = "SET_STATES_LOADING";

export const SET_GLOBAL_COVID_CASES_LOADING = "SET_GLOBAL_COVID_CASES_LOADING";
export const SET_US_COVID_CASES_LOADING = "SET_US_COVID_CASES_LOADING";

export function setCountriesLoading(flag) {
  return {
    type: SET_COUNTRIES_LOADING,
    flag,
  };
}

export function setStatesLoading(flag) {
  return {
    type: SET_STATES_LOADING,
    flag,
  };
}

export function setGlobalCovidCasesLoading(flag) {
  return {
    type: SET_GLOBAL_COVID_CASES_LOADING,
    flag,
  };
}

export function setUSCovidCasesLoading(flag) {
  return {
    type: SET_US_COVID_CASES_LOADING,
    flag,
  };
}
