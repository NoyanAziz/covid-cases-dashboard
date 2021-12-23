import {
  SET_COUNTRIES,
  SET_PROVINCES,
  SET_STATES,
} from "../actions/dropdown_options_action/parametersFetchAction";

const initialState = {
  countries: [],
  provinces: [],
  states: [],
};

export const parameters = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
        provinces: [],
      };

    case SET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces,
      };

    case SET_STATES:
      return {
        ...state,
        states: action.states,
      };

    default:
      return state;
  }
};
