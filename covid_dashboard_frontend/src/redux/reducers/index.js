import { combineReducers } from "redux";
import { parameters } from "./parametersReducers";
import { covid_cases_data } from "./covidCasesReducers";

export default combineReducers({
  parameters,
  covid_cases_data,
});
