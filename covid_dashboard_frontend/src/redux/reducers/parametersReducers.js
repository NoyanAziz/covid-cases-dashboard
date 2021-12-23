import {
  SET_COUNTRIES,
  SET_PROVINCES,
  SET_STATES,
} from "../actions/parametersFetchAction";

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
        // states: [],
      };

    case SET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces,
        // states: [],
      };

    case SET_STATES:
      return {
        ...state,
        states: action.states,
        // provinces: [],
        // countries: [],
      };

    default:
      return state;
  }
};
