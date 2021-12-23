import {
  SET_COUNTRIES_LOADING,
  SET_STATES_LOADING,
  SET_GLOBAL_COVID_CASES_LOADING,
  SET_US_COVID_CASES_LOADING,
} from "../actions/loading_action/loadingAction";

const initialState = {
  countriesLoading: false,
  provincesLoading: false,

  globalCovidCasesLoading: false,
  usCovidCasesLoading: false,
};

export const loadingStates = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES_LOADING:
      return {
        ...state,
        countriesLoading: action.flag,
      };

    case SET_STATES_LOADING:
      return {
        ...state,
        statesLoading: action.flag,
      };

    case SET_GLOBAL_COVID_CASES_LOADING:
      return {
        ...state,
        globalCovidCasesLoading: action.flag,
      };

    case SET_US_COVID_CASES_LOADING:
      return {
        ...state,
        usCovidCasesLoading: action.flag,
      };

    default:
      return state;
  }
};
