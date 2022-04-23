export const candleStickOptionsData = {
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'candles',
    toolbar: {
      autoSelected: 'pan',
      show: true,
    },
    animations: {
      enabled: false,
      // easing: 'easeinout',
      // speed: 500,
      // animateGradually: {
      //   enabled: true,
      //   delay: 100,
      // },
      // dynamicAnimation: {
      //   enabled: true,
      //   speed: 300,
      // },
    },
    zoom: {
      enabled: true,
      type: 'x',
      resetIcon: {
        offsetX: -100,
        offsetY: 0,
        fillColor: '#fff',
        strokeColor: '#37474f',
      },
      selection: {
        background: '#90CAF9',
        border: '#0D47A1',
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#D13C4B',
        downward: '#1F5ED2',
      },
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      datetimeUTC: false,
    },
    tickPlacement: 'between',
  },
  title: {
    align: 'left',
    margin: 10,
    offsetX: 60,
    offsetY: 0,
  },
};

export const barOptionsData = {
  chart: {
    type: 'candlestick',
    height: 290,
    id: 'candles',
    toolbar: {
      autoSelected: 'pan',
      show: true,
    },
    animations: {
      enabled: false,
      easing: 'easeinout',
      speed: 500,
      animateGradually: {
        enabled: false,
        delay: 100,
      },
      dynamicAnimation: {
        enabled: false,
        speed: 300,
      },
    },
    zoom: {
      enabled: true,
      type: 'x',
      resetIcon: {
        offsetX: -100,
        offsetY: 0,
        fillColor: '#fff',
        strokeColor: '#37474f',
      },
      selection: {
        background: '#90CAF9',
        border: '#0D47A1',
      },
    },
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#3C90EB',
        downward: '#DF7D46',
      },
    },
  },
  xaxis: {
    type: 'datetime',
    labels: {
      show: true,
      datetimeUTC: false,
    },
    tickPlacement: 'between',
  },
  title: {
    align: 'left',
    margin: 10,
    offsetX: 60,
    offsetY: 0,
  },
};
