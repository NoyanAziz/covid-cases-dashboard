import axios from "axios";

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
  axios
    .get("http://127.0.0.1:8000/countries/")
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setCountries(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};

export const fetchProvinces = (countryName) => async (dispatch) => {
  axios
    .get(`http://127.0.0.1:8000/provinces/${countryName}`)
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
  axios
    .get("http://127.0.0.1:8000/states/")
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setStates(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
