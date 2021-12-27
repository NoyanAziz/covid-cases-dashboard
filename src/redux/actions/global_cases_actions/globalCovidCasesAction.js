export const SET_GLOBAL_COVID_CASES = "SET_GLOBAL_COVID_CASES";

export function setGlobalCovidCases(globalCovidCases) {
  return {
    type: SET_GLOBAL_COVID_CASES,
    globalCovidCases,
  };
}
