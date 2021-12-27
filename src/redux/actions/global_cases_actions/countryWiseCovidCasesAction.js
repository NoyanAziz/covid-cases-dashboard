import axios from "axios";
import { BASE_BACKEND_URL } from "../../../constants";

import { setGlobalCovidCasesLoading } from "../loading_action/loadingAction";
import { setGlobalCovidCases } from "./globalCovidCasesAction";

export const fetchCountryWiseCovidCases =
  (countryName, days) => async (dispatch) => {
    dispatch(setGlobalCovidCasesLoading(true));
    axios
      .get(BASE_BACKEND_URL + `country-cases/${countryName}/?days=${days}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(setGlobalCovidCases(res.data));
        dispatch(setGlobalCovidCasesLoading(false));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server response: ", error.response.data);
        }
      });
  };
