import { SET_GLOBAL_COVID_CASES } from "../actions/global_cases_actions/globalCovidCasesAction";
import { SET_US_COVID_CASES } from "../actions/us_cases_actions/usCovidCasesAction";

const initialState = {
  globalCovidCases: [],
  usCovidCases: [],
};

export const covid_cases_data = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_COVID_CASES:
      return {
        ...state,
        globalCovidCases: action.globalCovidCases,
      };

    case SET_US_COVID_CASES:
      return {
        ...state,
        usCovidCases: action.usCovidCases,
      };

    default:
      return state;
  }
};
