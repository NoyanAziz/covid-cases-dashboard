import axios from "axios";
import { setGlobalCovidCases } from "./globalCovidCasesAction";

export const fetchProvinceWiseCovidCases =
  (provinceId, days) => async (dispatch) => {
    axios
      .get(
        `http://127.0.0.1:8000/country-province-cases/${provinceId}/?days=${days}`
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(setGlobalCovidCases(res.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log("Server response: ", error.response.data);
        }
      });
  };
