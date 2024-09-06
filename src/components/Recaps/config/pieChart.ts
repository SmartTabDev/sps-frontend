const CHART_OPTIONS = {
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  tooltip: {
    show: false,
  },
  legend: {
    show: false,
  },
  color: ['#4CD9EC', '#5478AB'],
  series: [
    {
      selectedOffset: 4,
      name: '',
      type: 'pie',
      selectedMode: 'single',
      radius: ['80%'],
      label: {
        position: 'inner',
        fontSize: 14,
      },
      labelLine: {
        show: false,
      },
    },
  ],
};

export default CHART_OPTIONS;
