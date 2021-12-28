export const PRIMARY_COLOR = "#1DA1FF";
export const SECONDARY_COLOR = "gray";

export const TOOLBAR_OPTIONS_MARGIN_LEFT = 5;
export const PAGE_LOADER_SIZE = 100;

export const DROPDOWN_MIN_WIDTH = 180;
export const GRAPH_LOADER_SIZE = 60;

export const GRAPH_HEIGHT = 500;

export const BASE_BACKEND_URL = "https://noyan-covid-dashboard.herokuapp.com/";

export const PAGE_TITLES = {
  globalCovidCases: "Global Covid Cases",
  usCovidCases: "US Covid Cases",
};

export const ALL_PROVINCE_ITEM = {
  title: "All",
  value: "-1",
};

export const DROP_DOWN_LABELS = {
  country: "Country",
  province: "Province",
  state: "State",
  days: "Days",
  graphValue: "Graph Value",
  graphType: "Graph Type",
};

export const DAYS_LIST = [
  {
    title: "Last Week",
    days: 8,
  },
  {
    title: "Last Month",
    days: 31,
  },
  {
    title: "Last Six Month",
    days: 183,
  },
  {
    title: "Last Year",
    days: 366,
  },
  {
    title: "Total",
    days: 1000,
  },
];

export const GRAPH_TYPE_OPTIONS = [
  { value: "Discrete" },
  { value: "Cumulative" },
];

export const DAYS_SELECTED_DEFAULT = 31;
export const COUNTRY_SELECTED_DEFAULT = "Oman";
export const STATE_SELECTED_DEFAULT = "58";
export const GRAPH_TYPE_SELECTED_DEFAULT = "Discrete";
export const GRAPH_VALUE_SELECTED_DEFAULT = "confirmed";
