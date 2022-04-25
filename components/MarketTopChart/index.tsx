import { useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const option = {
  chart: {
    type: 'spline',
  },
  title: {
    text: 'My stock chart',
  },
  series: [
    {
      type: 'area',
      data: [1, 2, 1, 4, 3, 6, 7, 3, 8, 6, 9],
    },
  ],
};

const MarketTopChart = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={option}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default MarketTopChart;
