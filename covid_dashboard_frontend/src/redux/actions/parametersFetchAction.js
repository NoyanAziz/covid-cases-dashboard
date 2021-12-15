import axios from "axios";

export const SET_COUNTRIES = "SET_COUNTRIES";
export const SET_PROVINCES = "SET_PROVINCES";

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

export const fetchProvince = (countryName) => async (dispatch) => {
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
