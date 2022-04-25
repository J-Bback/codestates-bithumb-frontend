import { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import styles from './MarketTopChart.module.scss';

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
}

const MarketTopChart = (props: any) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const option: any = {
    chart: {
      type: 'areaspline',
      zoomType: 'xy',
    },
    title: {
      text: '',
    },
    colors: ['#eeeeee'],
    plotWidth: 280,
    plotHeight: 120,
    containerProps: {
      backgroundColor: '#ffffff',
    },
    xAxis: {
      type: 'datetime',
      label: { backgroundColor: '#ffffff' },
      datetime: [
        new Date('2021-04-25'),
        new Date('2021-05-25'),
        new Date('2021-06-25'),
        new Date('2021-07-25'),
        new Date('2021-08-25'),
        new Date('2021-09-25'),
        new Date('2021-10-25'),
        new Date('2021-11-25'),
        new Date('2021-12-25'),
        new Date('2022-01-25'),
        new Date('2022-02-25'),
        new Date('2022-03-25'),
        new Date('2022-04-25'),
      ],
    },
    yAxis: {
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: 'area',
        name: '',
        data: [1, 2, 1, 2, 1, 6, 4, 2, 3],
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      // constructorType={'stockChart'}
      // className={styles.text}
      containerProps={{ className: 'chartContainer' }}
      options={option}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default MarketTopChart;
