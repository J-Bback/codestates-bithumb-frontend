import React, { useState, useEffect, useRef, createRef } from 'react';
import { UseWindowSize } from './hooks/UseWindowSize';
import { FetchWrapperArg } from '../../interface/fetchFactory';
// import DataStore from '../stores/DataStore';
import { CallApi } from '../utils/callApi';
import ExchangeData from './ExchangeData';
import { CandleChart } from '../components/CandleChart';
// import { Chartings } from '../components/Charting';

import styles from './Exchange.module.scss';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Exchange = (props: any) => {
  const [data, setData] = useState<ExchangeData>();
  const size: Size = UseWindowSize();
  const innerWidth = typeof size.width === 'number' && size.width < 1000 ? size.width - 20 : 1000;
  const innerHeight = typeof size.width === 'number' && size.width < 1000 ? size.width * 0.4 - 8 : 400;

  // const canvas = useRef<HTMLCanvasElement>(null);
  // const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
  // let canvasWidth = ctx?.canvas.width;
  // let canvasHeight = ctx?.canvas.height;
  // canvasWidth = 1000;
  // canvasHeight = 450;

  // ctx?.lineWidth ? (ctx.lineWidth = 10) : null;
  // ctx?.strokeRect(10, 10, innerWidth - 20, innerHeight - 20);
  // ctx?.strokeStyle ? (ctx.strokeStyle = '#3369ff') : null;
  // ctx?.fillRect(innerWidth / 2, innerHeight / 2 - 60, 80, 120);
  // ctx?.fillStyle ? (ctx.fillStyle = '#3369ff') : null;
  useEffect(() => {
    console.log('props', props);
    setTimeout(() => {
      getData();
      console.log('getData', data);
    }, 1000);
  }, [data]);

  const getData = async () => {
    try {
      const orderCurrency = 'BTC';
      const paymentCurrency = 'KRW';
      const data = {
        method: 'GET',
        url: `https://api.bithumb.com/public/ticker/${orderCurrency}_${paymentCurrency}`,
      };

      const response: any = await CallApi(data);
      const responseJson: any = await response.json();
      if (response.status === 200) {
        setData(responseJson.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className={styles.exchange_wrap}>
      <section className={styles.side_bar_wrap}>사이드바 width 360 ma - r 40px;</section>
      <section className={styles.ticker_wrap}>
        <div className={styles.title_wrap}>
          <div>비트코인 BTC / KRW</div>
          <div>오토 트레이딩 버튼</div>
        </div>
        <div className={styles.header_bar_wrap}>헤더바</div>
        {/* 차트 그리기 */}
        <CandleChart data={data} />
        {/* <Chartings /> */}
      </section>
    </main>
  );
};

Exchange.getInitialProps = async (ctx: FetchWrapperArg) => {
  const orderCurrency = 'BTC';
  const paymentCurrency = 'KRW';
  console.log('fwaoiefjelwakfj');
  const data = {
    method: 'GET',
    url: `https://api.bithumb.com/public/ticker/${orderCurrency}_${paymentCurrency}`,
  };
  const res = await fetch(data.url);
  const resJson = await res.json();
  console.log('resJson', resJson);
  return { props: resJson };
};
