import axios from "axios";
import { setGlobalCovidCasesLoading } from "../loading_action/loadingAction";
import { setGlobalCovidCases } from "./globalCovidCasesAction";

export const fetchProvinceWiseCovidCases =
  (provinceId, days) => async (dispatch) => {
    dispatch(setGlobalCovidCasesLoading(true));
    axios
      .get(
        `http://127.0.0.1:8000/country-province-cases/${provinceId}/?days=${days}`
      )
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
