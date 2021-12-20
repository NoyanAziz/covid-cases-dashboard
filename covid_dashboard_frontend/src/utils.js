export const prepareDataForGraph = (array, value) => {
  var result = [];
  if (array === null && array.length < 1) {
    return result;
  }

  let previousValue = array[0][value];
  for (var i = 1; i < array.length; i++) {
    result.push({ x: array[i].date, y: array[i][value] - previousValue });
    previousValue = array[i][value];
  }

  return result;
};

export const getGraphOptions = (yAxisTitle) => {
  return {
    chart: {
      id: "area-datetime",
      zoom: {
        autoScaleYaxis: true,
      },
    },

    xaxis: {
      showForNullSeries: true,
      type: "datetime",
      title: {
        text: "Timeline",
        offsetX: 0,
        offsetY: 10,
        style: {
          fontSize: "20px",
        },
      },
    },

    yaxis: {
      showForNullSeries: false,
      title: {
        text: yAxisTitle,
        offsetX: -5,
        offsetY: 0,
        style: {
          fontSize: "20px",
        },
      },
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
      text: "No data available...",
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

export const getDataSeries = (dataSeriesValue, data) => {
  return [
    {
      name: dataSeriesValue,
      data:
        data && data.length > 0
          ? prepareDataForGraph(data, dataSeriesValue)
          : [],
    },
  ];
};
