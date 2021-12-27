import axios from "axios";
import { BASE_BACKEND_URL } from "../../../constants";

import { setUSCovidCasesLoading } from "../loading_action/loadingAction";
import { setUSCovidCases } from "./usCovidCasesAction";

export const fetchStateWiseCovidCases = (stateId, days) => async (dispatch) => {
  dispatch(setUSCovidCasesLoading(true));
  axios
    .get(BASE_BACKEND_URL + `us-cases/?state=${stateId}&days=${days}`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setUSCovidCases(res.data));
      dispatch(setUSCovidCasesLoading(false));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
