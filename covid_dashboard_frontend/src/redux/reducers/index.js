import { combineReducers } from "redux";
import { parameters } from "./parametersReducer";
import { covid_cases_data } from "./covidCasesReducer";
import { loadingStates } from "./loadingReducer";

export default combineReducers({
  parameters,
  covid_cases_data,
  loadingStates,
});
