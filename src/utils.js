import { useLocation } from "react-router-dom";
import { GRAPH_TYPE_SELECTED_DEFAULT } from "./constants";

export const prepareDiscreteDataForGraph = (array, value) => {
  var result = [];
  if (array === null && array.length < 1) {
    return result;
  }

  let previousValue = array[0][value];
  for (var i = 1; i < array.length; i++) {
    const standAloneValue = array[i][value] - previousValue;
    result.push({
      x: array[i].date,
      y: standAloneValue < 0 ? 0 : standAloneValue,
    });
    previousValue = array[i][value];
  }

  return result;
};

export const prepareCumulativeDataForGraph = (array, value) => {
  var result = [];
  if (array === null && array.length < 1) {
    return result;
  }

  for (var i = 0; i < array.length; i++) {
    const standAloneValue = array[i][value];
    result.push({
      x: array[i].date,
      y: standAloneValue < 0 ? 0 : standAloneValue,
    });
  }

  return result;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const getGraphOptions = (selectedValue, selectedArea) => {
  return {
    chart: {
      id: "area-datetime",
      toolbar: {
        export: {
          csv: {
            filename: `${selectedArea}_covid_cases_${selectedValue}`,
            columnDelimiter: ",",
            headerCategory: "date",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: `${selectedArea}_covid_cases_${selectedValue}`,
          },
          png: {
            filename: `${selectedArea}_covid_cases_${selectedValue}`,
          },
        },
      },
      zoom: {
        autoScaleYaxis: true,
      },
    },

    xaxis: {
      showForNullSeries: true,
      type: "datetime",
    },

    yaxis: {
      showForNullSeries: false,
    },

    tooltip: {
      enabled: true,
      x: {
        format: "dd MMM yyyy",
      },
    },
    dataLabels: {
      enabled: false,
    },

    noData: {
      text: "No data available for these parameters!!!",
      style: {
        fontSize: "20px",
      },
    },

    stroke: {
      show: true,
      curve: "smooth",
      width: 2,
    },

    fill: {
      type: "gradient",

      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1.9,
        opacityTo: 1.0,
        stops: [0, 100],
      },
    },
  };
};

export const getDataSeries = (dataSeriesValue, data, graphType) => {
  return [
    {
      name: dataSeriesValue,
      data:
        data && data.length > 0
          ? graphType === GRAPH_TYPE_SELECTED_DEFAULT
            ? prepareDiscreteDataForGraph(data, dataSeriesValue)
            : prepareCumulativeDataForGraph(data, dataSeriesValue)
          : [],
    },
  ];
};
