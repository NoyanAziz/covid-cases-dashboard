import axios from "axios";
import { BASE_BACKEND_URL } from "../../../constants";

import {
  setCountriesLoading,
  setStatesLoading,
} from "../loading_action/loadingAction";

export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_PROVINCES = "SET_PROVINCES";
export const SET_STATES = "SET_STATES";

export function setCountries(countries) {
  return {
    type: SET_COUNTRIES,
    countries,
  };
}

export function setProvinces(provinces) {
  return {
    type: SET_PROVINCES,
    provinces,
  };
}

export function setStates(states) {
  return {
    type: SET_STATES,
    states,
  };
}

export const fetchCountries = () => async (dispatch) => {
  dispatch(setCountriesLoading(true));
  axios
    .get(BASE_BACKEND_URL + "countries/")
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setCountries(res.data));
      dispatch(setCountriesLoading(false));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const fetchProvinces = (countryName) => async (dispatch) => {
  axios
    .get(BASE_BACKEND_URL + `provinces/${countryName}`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setProvinces(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const fetchStates = () => async (dispatch) => {
  dispatch(setStatesLoading(true));

  axios
    .get(BASE_BACKEND_URL + "states/")
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setStates(res.data));

      dispatch(setStatesLoading(false));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
