import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { candleStickOptionsData } from '../../constants/ChartData';
import { barOptionsData } from '../../constants/ChartData';
const ReactApexChart = dynamic(import('react-apexcharts'), { ssr: false });

export const ApexChart = (props: any) => {
  // [[Timestamp], [O, H, L, C]]
  // y축 open, high, low, close
  // const [series, setSeries] = useState<any>(props?.series);
  const [options, setOptions] = useState<any>(candleStickOptionsData);
  const [barOptions, setBarOptions] = useState<any>(barOptionsData);

  // useEffect(() => {
  //   console.log('자식컴디업', props);
  //   if (!!props?.data && props.data !== false) {
  //     const updateData: any[] = [];
  //     const lastData: any[] = props.data[props.data.length - 1];

  //     updateData.push({ x: lastData[0], y: [lastData[1], lastData[3], lastData[4], lastData[2]] });
  //     console.log('updateData', updateData);
  //     setSeries((prev: any) => {
  //       return [...prev, updateData[0]];
  //     });
  //   }
  // }, [props]);

  return (
    <div>
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
