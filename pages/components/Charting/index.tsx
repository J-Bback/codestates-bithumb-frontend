// import { createRef, useState, useEffect } from 'react';
// import Charting from 'chart-library';

// export const Chartings = () => {
//   const chartRef: any = createRef();
//   const [chart, setChart] = useState();
//   const [intervalId, setIntervalId] = useState<any>();
//   const [mockData, setMockData] = useState();

//   useEffect(() => {
//     console.log('window', window);
//     const candleChart: any = new Charting.Controls.CandlestickChart(chartRef.current);
//     candleChart.title = 'BitCotes 빗코츠';
//     candleChart.theme.titleFontSize = 16;
//     candleChart.candlestickWidth = 12;
//     candleChart.showLegend = false;

//     candleChart.showXCoordinates = false;
//     candleChart.xAxisLabelRotationAngle = 30;
//     candleChart.xAxis.minValue = 0;
//     candleChart.xAxis.interval = 1;
//     candleChart.xAxis.maxValue = 40;
//     candleChart.xAxis.title = 'Time';
//     candleChart.yAxis.title = 'Price';

//     candleChart.gridType = Charting.GridType.Horizontal;
//     candleChart.theme.gridColor1 = new Charting.Drawing.Color('#ffffff');
//     candleChart.theme.gridColor2 = new Charting.Drawing.Color('#fafafa');
//     candleChart.theme.gridLineColor = new Charting.Drawing.Color('#cecece');
//     candleChart.theme.gridLineStyle = Charting.Drawing.DashStyle.Dash;

//     candleChart.plot.seriesStyle = new Charting.CandlestickSeriesStyle(
//       new Charting.Drawing.Brush('#ff2f26'),
//       new Charting.Drawing.Brush('#00b140'),
//       new Charting.Drawing.Brush('#2e2e2a'),
//       2,
//       Charting.Drawing.DashStyle.Solid,
//       candleChart.plot.seriesRenderers.item(0)
//     );

//     candleChart.theme.axisLabelsBrush = candleChart.theme.axisTitleBrush = candleChart.theme.axisStroke = new Charting.Drawing.Brush(
//       '#2e2e2e'
//     );
//     candleChart.theme.highlightStroke = new Charting.Drawing.Brush('#cecece');

//     const dataList: any = new Charting.Collections.List();
//     console.log('DATALIST', dataList);

//     // const setTime = setInterval(() => {
//     //   updateChart;
//     // }, 1000);
//     setChart(candleChart);
//     setMockData(dataList);
//     // setIntervalId(setTime);

//     // return () => clearInterval(intervalId);
//   }, []);

//   const updateChart = () => {};

//   return (
//     <div>
//       <canvas width="1000px" height="450px" ref={chartRef} />
//     </div>
//   );
// };
