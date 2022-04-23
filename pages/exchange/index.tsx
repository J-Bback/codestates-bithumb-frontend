import React, { useState, useEffect, useRef, createRef } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';

import { UseWindowSize } from './hooks/UseWindowSize';
import { FetchWrapperArg } from '../../interface/fetchFactory';
// import DataStore from '../stores/DataStore';
import { CallApi } from '../utils/callApi';
import costComma from '../../helpers/costComma';
import { signRatePositive, signPricePositive } from '../../helpers/signPositiveNumber';

import ExchangeData from './ExchangeData';
import { ApexChart } from '../components/ApexChart';
import Input from '../../atoms/Input';
import Nav from '../components/Nav';
import Tab from '../components/Tab';
import Table from '../components/Table';

import styles from './Exchange.module.scss';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const Exchange = (props: any) => {
  const [navigation, setNavigation] = useState('exchange');
  const [series, setSeries] = useState<any>([]);
  const [currencyList, setCurrencyList] = useState<any>({});
  // const [recentData, setRecentData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BTC');
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
    setTimeout(() => {
      getTicker();
    }, 1000);
  }, [currencyList]);

  useEffect(() => {
    router.push({ query: { tab: 'krw' } }, undefined, { shallow: true });
  }, []);

  const getData = async () => {
    try {
      const orderCurrency = selectedCurrency;
      const paymentCurrency = 'KRW';
      const chartIntervals = '1h';
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
        const tenthData: any = cloneData.splice(-50, 50);
        tenthData.map((v: any) => seriesData.push({ x: v[0], y: [v[1], v[3], v[4], v[2]] }));
        setSeries(seriesData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getTicker = async () => {
    try {
      const orderCurrency = 'ALL';
      const paymentCurrency = 'KRW';
      const data = {
        method: 'GET',
        url: `https://api.bithumb.com/public/ticker/${orderCurrency}_${paymentCurrency}`,
      };

      const response: any = await CallApi(data);
      const responseJson: any = await response.json();
      if (response.status === 200) {
        // if (searchValue) {
        //   const filter = Object.keys(responseJson.data);
        // }
        setCurrencyList(responseJson.data);
        // const seriesData: any[] = [];
        // const tenthData: any = cloneData.splice(-10, 10);
        // tenthData.map((v: any) => seriesData.push({ x: v[0], y: [v[1], v[3], v[4], v[2]] }));
        // setSeries(seriesData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentPrice = () => {
    return costComma(currencyList[selectedCurrency]?.closing_price);
    //   const fluctateRate = currencyList[name].fluctate_rate_24H;
    //   const accTradeValue = currencyList[name].acc_trade_value_24H;
  };

  const getCurrentFluctateRate = () => {
    return costComma(currencyList[selectedCurrency]?.fluctate_rate_24H);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const moveTab = (tab: string) => {
    router.push({ query: { tab } }, undefined, { shallow: true });
  };

  const tbodyData = () => {
    let keys = Object.keys(currencyList);
    if (searchValue) {
      keys = keys.filter((v) => v.includes(searchValue.toUpperCase()));
    }
    // const sorted = keys.map((v) => currencyList[v].acc_trade_value_24H).sort((a, b) => a - b);
    return keys.map((name, i) => {
      const currentPrice = currencyList[name].closing_price;
      const fluctate = currencyList[name].fluctate_24H;
      const fluctateRate = currencyList[name].fluctate_rate_24H;
      const accTradeValue = currencyList[name].acc_trade_value_24H;
      if (name === 'date') {
        return;
      }
      return (
        <tr
          key={i}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            height: '50px',
            wordBreak: 'break-all',
            alignItems: 'center',
          }}
          onClick={() => name !== selectedCurrency && setSelectedCurrency(name)}>
          <td>{`${name} / KRW`}</td>
          <td>{costComma(currentPrice)}</td>
          <td
            style={
              Math.sign(Number(fluctateRate)) === 1
                ? { color: '#F75467' }
                : Math.sign(Number(fluctateRate)) === 0
                ? { color: '#282828' }
                : { color: '#4386F9' }
            }>
            <span>{`${signRatePositive(Number(fluctateRate))} %`}</span>
            <br />
            <span>{signPricePositive(Number(fluctate))}</span>
          </td>
          <td>{`${costComma(Math.round(Number(accTradeValue) / 1000000))} 백만`}</td>
        </tr>
      );
    });
    // console.log('currencyList', currencyList);
  };

  const renderTitle = () => {
    return (
      <div className={styles.title_wrap}>
        <div className={styles.title}>코인이름</div>
        <div>{selectedCurrency} / KRW</div>
      </div>
    );
  };

  const renderChartHeader = () => {
    return (
      <div className={styles.header_bar_wrap}>
        <div>{'자산'}</div>
        <div>
          <span>{`${selectedCurrency} 사용가능 0.00000000 / 사용중 0.00000000 `}</span>
          <span className={styles.address_link_style}>{` ${selectedCurrency} 입금`}</span>
        </div>
        <div>
          <span>{`KRW 사용가능 0 / 사용중 0 `}</span>
          <span className={styles.address_link_style}>{` KRW 입금`}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Nav setItem={(key: string) => setNavigation(key)} default={'exchange'} />
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
          <Table
            theadWidth={[30, 22, 20, 28]}
            theadData={['자산', '현재가', '변동률(당일)', '거래금액(24H)']}
            tbodyData={tbodyData()}
            emptyTable={{
              text: '검색된 가상자산이 없습니다',
              style: { fontSize: '13px', textAlign: 'center', paddingTop: '20px' },
            }}
            tableStyle={{ width: '100%', maxHeight: '1073px', fontSize: '12px' }}
            tbodyStyle={{ height: '975px', overflowY: 'auto' }}
          />
        </section>
        <section className={styles.ticker_wrap}>
          {renderTitle()}
          {renderChartHeader()}
          <ApexChart series={series} />
          <div className={styles.transaction_and_order_wrap}>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>{getCurrentPrice()}</div>
                <div>{getCurrentFluctateRate()}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div>거래량~</div>
              </div>
              <div>차트</div>
              <div>체결내역</div>
            </div>
            <div>ㅁㅐ수/매도 호가창</div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Exchange;

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
