const CHART_OPTIONS = {
  chart: {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    toolbar: {
      show: false,
    },
    animations: {
      enabled: false,
    },
    zoom: {
      enabled: false,
    },
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      formatter: (val: number) => String(val), // required
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '30px',
      borderRadius: 50,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '18px',
      colors: ['rgba(82,95,129,0.1'],
    },
    formatter(val: any) {
      if (val === 0) {
        return '.';
      }
      return '';
    },
  },
  xaxis: {
    tickPlacement: 'on',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: () => '',
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      formatter: () => '',
    },
  },
  grid: {
    show: false,
  },
};

export default CHART_OPTIONS;
