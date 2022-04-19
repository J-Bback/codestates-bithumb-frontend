import React, { useState, useEffect, useRef, createRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';
import { UseWindowSize } from './hooks/UseWindowSize';
import { FetchWrapperArg } from '../../interface/fetchFactory';
// import DataStore from '../stores/DataStore';
import { CallApi } from '../utils/callApi';
import ExchangeData from './ExchangeData';
import { ApexChart } from '../components/ApexChart';
import Input from '../../atoms/Input';
import Tab from '../components/Tab';

import styles from './Exchange.module.scss';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export const Exchange = (props: any) => {
  const [data, setData] = useState<any>();
  const [series, setSeries] = useState<any>([]);
  // const [recentData, setRecentData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const router = useRouter();
  const { query } = router;

  const size: Size = UseWindowSize();
  const innerWidth = typeof size.width === 'number' && size.width < 1000 ? size.width - 20 : 1000;
  const innerHeight = typeof size.width === 'number' && size.width < 1000 ? size.width * 0.4 - 8 : 400;
  // const canvas = useRef<HTMLCanvasElement>(null);
  // const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
  // let canvasWidth = ctx?.canvas.width;
  // let canvasHeight = ctx?.canvas.height;
  // ctx?.lineWidth ? (ctx.lineWidth = 10) : null;
  // ctx?.fillRect(innerWidth / 2, innerHeight / 2 - 60, 80, 120);
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [series]);

  useEffect(() => {
    router.push({ query: { tab: 'krw' } }, undefined, { shallow: true });
  }, []);

  const getData = async () => {
    try {
      const orderCurrency = 'BTC';
      const paymentCurrency = 'KRW';
      const chartIntervals = '1m';
      const data = {
        method: 'GET',
        url: `https://api.bithumb.com/public/candlestick/${orderCurrency}_${paymentCurrency}/${chartIntervals}`,
      };

      const response: any = await CallApi(data);
      const responseJson: any = await response.json();
      if (response.status === 200) {
        const cloneData: any[] = cloneDeep(responseJson.data);
        const seriesData: any[] = [];
        const len: number = responseJson.data.length;
        const lastData: any[] = responseJson.data[len];
        const tenthData: any = cloneData.splice(-10, 10);
        tenthData.map((v: any) => seriesData.push({ x: v[0], y: [v[1], v[3], v[4], v[2]] }));
        setSeries(seriesData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const search = () => {};
  const moveTab = (tab: string) => {
    router.push({ query: { tab } }, undefined, { shallow: true });
  };

  return (
    <main className={styles.exchange_wrap}>
      <section className={styles.side_bar_wrap}>
        <Input
          type="text"
          placeholder="검색"
          className={styles.input_style}
          maxLength={12}
          handleChange={(value: string) => handleChange(value)}
          propValue={searchValue}
          clearButton="on"
        />
        <Tab
          tabs={{
            tabItems: [
              { key: 'krw', label: '원화 마켓', onClick: () => moveTab('krw') },
              { key: 'favorites', label: '즐겨 찾기', onClick: () => moveTab('favorites') },
            ],
            selectedTab: query.tab,
          }}
          contentsStyle={{ width: '360px' }}
        />
        <table>
          <thead>
            <tr>테이블 헤더</tr>
          </thead>
          <tbody>테이블 바디바디</tbody>
        </table>
        {/* {query.tab && ( */}
        {/* )} */}
      </section>
      <section className={styles.ticker_wrap}>
        <div className={styles.title_wrap}>
          <div>비트코인 BTC / KRW</div>
          <div>오토 트레이딩 버튼</div>
        </div>
        <div className={styles.header_bar_wrap}>헤더바</div>
        {/* 차트 그리기 */}
        <ApexChart data={data !== undefined && data} series={series} />
      </section>
    </main>
  );
};

Exchange.getInitialProps = async (ctx: FetchWrapperArg) => {
  const orderCurrency = 'BTC';
  const paymentCurrency = 'KRW';
  const chartIntervals = '1m';
  const data = {
    method: 'GET',
    url: `https://api.bithumb.com/public/candlestick/${orderCurrency}_${paymentCurrency}/${chartIntervals}`,
  };
  const res = await fetch(data.url);
  const resJson = await res.json();
  console.log('SSR resJson', resJson);
  return { props: resJson };
};
