// import { useEffect, useRef } from 'react';
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
// // import ExchageData from './ExchageData';

// Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

// export const CandleChart = (datas: any) => {
//   const canvas = useRef<any>();
//   const current = canvas.current;
//   const ctx: any = current?.getContext('2d');

//   ctx?.lineWidth ? (ctx.lineWidth = 10) : null;

//   useEffect(() => {
//     console.log('DATAS', datas);
//     myChart.destroy();
//     return () => myChart.destroy();
//   }, []);

//   const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [
//         {
//           label: '# of Votes',
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)',
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)',
//           ],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <canvas
//         // ref={canvas}
//         // id={myChart}
//         // className={styles.canvas}
//         width={1000}
//         height={450}
//         // onClick={handleCanvasClick}
//       />
//     </div>
//   );
// };
