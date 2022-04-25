import React, { useState, useEffect, useRef, createRef, useContext } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { UseWindowSize } from './hooks/UseWindowSize';
import { FetchWrapperArg } from '../../interface/fetchFactory';
// import DataStore from '../stores/DataStore';
import { CallApi } from '../utils/callApi';
import costComma from '../../helpers/costComma';
import { signRatePositive, signPricePositive } from '../../helpers/signPositiveNumber';
import { coinNameKR } from '../../constants/NameParser';

import ExchangeData from './ExchangeData';
import { ApexChart } from '../../components/ApexChart';
import Input from '../../atoms/Input';
import Nav from '../../components/Nav';
import Tab from '../../components/Tab';
import Table from '../../components/Table';

import styles from './Exchange.module.scss';
import { IMainContext } from '../../interface/Interface';
import { MainContext } from '../../context/Context';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const Exchange = (props: any) => {
  const context = useContext<IMainContext>(MainContext);
  const [navigation, setNavigation] = useState('exchange');
  const [series, setSeries] = useState<any>([]);
  const [currencyList, setCurrencyList] = useState<any>({});
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('BTC');
  const [chartList, setChartList] = useState<any>(['1분', '10분', '30분', '1시간']);
  const [chartSelect, setChartSelect] = useState<string>('1분');
  const [favorites, setFavorites] = useState<any[]>([]);
  const router = useRouter();
  const { query } = router;

  const size: Size = UseWindowSize();
  const innerWidth = typeof size.width === 'number' && size.width < 1000 ? size.width - 20 : 1000;
  const innerHeight = typeof size.width === 'number' && size.width < 1000 ? size.width * 0.4 - 8 : 400;
  // const canvas = useRef<HTMLCanvasElement>(null);
  // const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;

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

  useEffect(() => {}, [favorites]);

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
        setCurrencyList(responseJson.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentPrice = () => {
    return costComma(currencyList[selectedCurrency]?.closing_price);
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

  const onAddFavorites = (i: number, e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    let temp: any = [...favorites];
    if (temp.length !== 0) {
      let exist = false;
      for (let k in temp) {
        if (temp[k] === i) {
          exist = true;
          if (exist) {
            temp.splice(k, 1);
          }
        }
      }
      if (exist) {
        setFavorites(temp);
        context.handleStateChange('favorites', temp);
      }
      if (!exist) {
        setFavorites((prev: any) => {
          return [...prev, i];
        });
        context.handleStateChange('favorites', [...favorites, i]);
      }
    } else {
      setFavorites([i]);
      context.handleStateChange('favorites', [i]);
    }
  };

  const tbodyData = () => {
    let keys = Object.keys(currencyList);
    if (searchValue) {
      keys = keys.filter((v) => v.includes(searchValue.toUpperCase()));
    }
    return keys.map((name, i) => {
      const currentPrice = currencyList[name].closing_price;
      const fluctate = currencyList[name].fluctate_24H;
      const fluctateRate = currencyList[name].fluctate_rate_24H;
      const accTradeValue = currencyList[name].acc_trade_value_24H;
      const nameKR: string = coinNameKR[name];
      if (name === 'date') {
        return;
      }

      return (
        <tr
          key={i}
          style={{
            cursor: 'pointer',
            textAlign: 'right',
            height: '48px',
            wordBreak: 'break-all',
            alignItems: 'center',
            borderLeft: name === selectedCurrency ? '2px solid #979797' : '',
          }}
          onClick={() => {
            name !== selectedCurrency && setSelectedCurrency(name);
          }}>
          <td style={{ width: '25px' }}>
            <div
              onClick={(e: any) => {
                onAddFavorites(i, e);
              }}>
              {!favorites.includes(i) && (
                <Image src="/images/star_empty.png" alt="Close Button" width={14} height={14} />
              )}
              {favorites.includes(i) && <Image src="/images/star.png" alt="Close Button" width={14} height={14} />}
            </div>
          </td>
          <td style={{ width: '76px', textAlign: 'left' }}>
            <div>{nameKR}</div>
            <div>{`${name} / KRW`}</div>
          </td>
          <td style={{ width: '74px' }}>{costComma(currentPrice)}</td>
          <td
            style={
              Math.sign(Number(fluctateRate)) === 1
                ? { color: '#F75467', width: '71px' }
                : Math.sign(Number(fluctateRate)) === 0
                ? { color: '#282828', width: '71px' }
                : { color: '#4386F9', width: '71px' }
            }>
            <span>{`${signRatePositive(Number(fluctateRate))} %`}</span>
            <br />
            <span>{signPricePositive(Number(fluctate))}</span>
          </td>
          <td style={{ width: '92px', paddingRight: '14px' }}>{`${costComma(
            Math.round(Number(accTradeValue) / 1000000)
          )} 백만`}</td>
        </tr>
      );
    });
  };

  const renderTitle = () => {
    return (
      <div className={styles.title_wrap}>
        <div className={styles.title}>코인이름</div>
        <div style={{ color: '#979797', marginBottom: 4 }}>{selectedCurrency} / KRW</div>
      </div>
    );
  };

  const renderChartHeader = () => {
    return (
      <div className={styles.header_bar_wrap}>
        <div className={styles.property}>{'자산'}</div>
        <div>
          <span className={styles.property}>
            {`${selectedCurrency}`} <span>사용가능</span> <span className={styles.color_b}>0.00000000</span> /{' '}
            <span>사용중</span> <span className={styles.color_b}>0.00000000 </span>
          </span>
          <span className={styles.address_link_style}>{` ${selectedCurrency} 입금`}</span>
        </div>
        <div>
          <span className={styles.property}>
            {`${selectedCurrency}`} <span>사용가능</span> <span className={styles.color_b}>0.00000000</span> /{' '}
            <span>사용중</span> <span className={styles.color_b}>0.00000000 </span>
          </span>
          <span className={styles.address_link_style}>{`KRW 입금`}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <Nav setItem={(key: string) => setNavigation(key)} default={'exchange'} />
      <main className={styles.exchange_wrap}>
        <div className={styles.container}>
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
                  { key: 'krw', label: '원화마켓', onClick: () => moveTab('krw') },
                  { key: 'favorites', label: '즐겨찾기', onClick: () => moveTab('favorites') },
                ],
                selectedTab: query.tab,
              }}
              contentsStyle={{ width: '340px', borderLeft: '1px solid #eeeeee', borderRight: '1px solid #eeeeee' }}
            />
            <Table
              theadWidth={[101, 74, 71, 92]}
              theadTextAlign={['left', 'right', 'right', 'right']}
              theadPadding={['0 0 0 25px', '0', '0', '0 14px 0 0']}
              theadData={['자산', '현재가', '변동률(당일)', '거래금액(24H)']}
              tbodyData={tbodyData()}
              emptyTable={{
                text: '검색된 가상자산이 없습니다',
                style: { fontSize: '13px', textAlign: 'center', paddingTop: '20px' },
              }}
              tableStyle={{ width: '100%', maxHeight: '1073px', fontSize: '12px', color: '#232323' }}
              tbodyStyle={{ height: '975px', overflowY: 'auto' }}
            />
          </section>
          <section className={styles.ticker_wrap}>
            {renderTitle()}
            {renderChartHeader()}

            <div className={styles.chart_select_bar}>
              {chartList.map((el: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setChartSelect(el)}
                  className={el === chartSelect ? styles.chart_selected : styles.chart_unselected}>
                  {el}
                </div>
              ))}
            </div>
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
        </div>
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
