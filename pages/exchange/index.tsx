import React, { useState, useEffect, useRef, useCallback } from 'react';
import { UseWindowSize } from '../components/UseWindowSize';
// import DataStore from '../stores/DataStore';
import ExchangeData from './ExchangeData';
import { CallApi } from '../utils/callApi';
import styles from './Exchange.module.scss';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Exchange = (props: any) => {
  const [data, setData] = useState<ExchangeData>();
  // const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] =
  const size: Size = UseWindowSize();
  const innerWidth = typeof size.width === 'number' && size.width < 1000 ? size.width - 20 : 1000;
  const innerHeight = typeof size.width === 'number' && size.width < 1000 ? size.width * 0.4 - 8 : 400;
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
  ctx?.lineWidth ? (ctx.lineWidth = 10) : null;
  ctx?.strokeRect(10, 10, innerWidth - 20, innerHeight - 20);
  ctx?.strokeStyle ? (ctx.strokeStyle = '#3369ff') : null;
  ctx?.fillRect(innerWidth / 2, innerHeight / 2 - 60, 80, 120);
  ctx?.fillStyle ? (ctx.fillStyle = '#3369ff') : null;

  useEffect(() => {
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

  const handleCanvasClick = (event: any) => {
    // const currentCoord = { x: event.clientX, y: event.clientY };
    if (typeof ctx?.canvas.offsetLeft === 'number') {
      const x = event.clientX - ctx?.canvas.offsetLeft;
      const y = event.clientY - ctx?.canvas.offsetTop;

      ctx.fillRect(x - 15, y - 15, 30, 30);
    }
  };

  return (
    // ㅊㅏ트 만들기
    <section>
      <div>비트코인 BTC / KRW</div>
      <div>
        {size.width}px / {size.height}px
      </div>
      <canvas
        ref={canvas}
        className={styles.canvas}
        width={innerWidth}
        height={innerHeight}
        onClick={handleCanvasClick}
      />
    </section>
  );
};
