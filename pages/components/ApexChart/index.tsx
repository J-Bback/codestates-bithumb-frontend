import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { candleStickOptionsData } from '../../constants/ChartData';
import { barOptionsData } from '../../constants/ChartData';
import styles from './ApexChart.module.scss';
const ReactApexChart = dynamic(import('react-apexcharts'), { ssr: false });

export const ApexChart = (props: any) => {
  // [[Timestamp], [O, H, L, C]]
  // y축 open, high, low, close
  const [options, setOptions] = useState<any>(candleStickOptionsData);
  const [barOptions, setBarOptions] = useState<any>(barOptionsData);

  return (
    <div className={styles.contents_wrap}>
      <ReactApexChart
        options={options}
        series={[{ data: props?.series }]}
        type="candlestick"
        width={1000}
        height={290}
      />
      <div>
        <ReactApexChart options={barOptions} series={[{ data: props?.series }]} type="bar" width={1000} height={160} />
      </div>
    </div>
  );
};
