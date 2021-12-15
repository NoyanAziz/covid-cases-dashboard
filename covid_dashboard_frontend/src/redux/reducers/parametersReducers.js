import { SET_COUNTRIES, SET_PROVINCES } from "../actions/parametersFetchAction";

const initialState = {
  countries: [],
  provinces: [],
};

export const parameters = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.searchedUsers,
        provinces: [],
      };
    case SET_PROVINCES:
      return {
        ...state,
        provinces: [],
      };
    default:
      return state;
  }
};
