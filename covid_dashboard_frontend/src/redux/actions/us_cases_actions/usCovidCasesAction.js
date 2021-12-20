export const SET_US_COVID_CASES = "SET_US_COVID_CASES";

export function setUSCovidCases(usCovidCases) {
  return {
    type: SET_US_COVID_CASES,
    usCovidCases,
  };
}
