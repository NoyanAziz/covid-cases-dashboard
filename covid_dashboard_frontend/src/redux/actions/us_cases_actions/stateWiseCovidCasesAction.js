import axios from "axios";
import { fetchStates } from "../parametersFetchAction";
import { setUSCovidCases } from "./usCovidCasesAction";

export const fetchStateWiseCovidCases = (stateId, days) => async (dispatch) => {
  dispatch(fetchStates());

  axios
    .get(`http://127.0.0.1:8000/us-cases/?state=${stateId}&days=${days}`)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      dispatch(setUSCovidCases(res.data));
    })
    .catch((error) => {
      if (error.response) {
        console.log("Server response: ", error.response.data);
      }
    });
};
