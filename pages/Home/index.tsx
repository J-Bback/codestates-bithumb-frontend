import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';

import { CallApi } from '../utils/callApi';
import costComma from '../../helpers/costComma';
import { signRatePositive, signPricePositive } from '../../helpers/signPositiveNumber';
import { coinNameKR } from '../../constants/NameParser';

import Input from '../../atoms/Input';
import Nav from '../../components/Nav';
import Tab from '../../components/Tab';
import Table from '../../components/Table';
import MarketTopChart from '../../components/MarketTopChart';

import styles from './Home.module.scss';

const Home = (props: any) => {
  const [navigation, setNavigation] = useState('home');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currencyList, setCurrencyList] = useState<any>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState<number>();

  const tableRef = useRef<HTMLTableRowElement>(null);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    router.push({ query: { tab: 'krw' } }, undefined, { shallow: true });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getTicker();
    }, 1000);
  }, [currencyList]);

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
      }
    } catch (e) {
      console.log(e);
    }
  };

  const moveTab = (tab: string) => {
    router.push({ query: { tab } }, undefined, { shallow: true });
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const getDayToDayFluctate = (name: string, type: string) => {
    const yesterdayPrice = Number(currencyList[name].prev_closing_price);
    const currentPrice = Number(currencyList[name].closing_price);
    const fluctatePrice = Math.round((currentPrice - yesterdayPrice) * 100) / 100;
    const fluctateRate = Math.round((fluctatePrice / yesterdayPrice) * 10000) / 100;
    if (type === 'krw') {
      return fluctatePrice;
    }
    if (type === 'rate') {
      return fluctateRate;
    }
  };

  const renderHeaderChart = () => {
    return (
      <header className={styles.header_wrap}>
        <div className={styles.header_title}>{'원화 마켓 변동률 TOP5'}</div>
        <div className={styles.header_chart}>
          <MarketTopChart />
        </div>
      </header>
    );
  };

  const tbodyData = () => {
    let keys = Object.keys(currencyList);
    if (searchValue) {
      keys = keys.filter((v) => v.includes(searchValue.toUpperCase()));
    }
    // const sorted = keys.map((v) => currencyList[v].acc_trade_value_24H).sort((a, b) => a - b);
    if (Math.ceil(keys.length / 30) !== totalPage) {
      setTotalPage(Math.ceil(keys.length / 30));
    }
    return keys.map((name, i) => {
      const currentPrice = currencyList[name].closing_price;
      // const fluctate = currencyList[name].fluctate_24H;
      // const fluctateRate = currencyList[name].fluctate_rate_24H;
      const accTradeValue = currencyList[name].acc_trade_value_24H;
      const dayToDayFluctate = getDayToDayFluctate(name, 'krw');
      const dayToDayFluctateRate = getDayToDayFluctate(name, 'rate');
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
            height: '49px',
            wordBreak: 'break-all',
            alignItems: 'center',
            fontSize: '14px',
          }}
          ref={tableRef}
          onClick={() => name !== selectedCurrency && setSelectedCurrency(name)}>
          <td style={{ textAlign: 'left', width: '222px', paddingLeft: '10px' }}>
            <div style={{ fontSize: '15px' }}>{nameKR}</div>
            <div style={{ fontSize: '12px', color: '#a4a4a4' }}>{`${name} / KRW`}</div>
          </td>
          <td style={{ width: '161px', padding: '0 13px', fontSize: '14px' }}>{`${costComma(currentPrice)} 원`}</td>
          <td
            style={
              Math.sign(Number(dayToDayFluctateRate)) === 1
                ? { color: '#F75467', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
                : Math.sign(Number(dayToDayFluctateRate)) === 0
                ? { color: '#282828', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
                : { color: '#4386F9', width: '262px', padding: '0 24px 0 15px', fontSize: '14px' }
            }>
            <span>{`${signPricePositive(Number(dayToDayFluctate))} 원 `}</span>
            <span>{`(${signRatePositive(Number(dayToDayFluctateRate))} %)`}</span>
          </td>
          <td style={{ width: '192px', padding: '0 13px', fontSize: '14px' }}>{`${costComma(
            Math.round(Number(accTradeValue))
          )} 원`}</td>
          <td style={{ width: '65px', textAlign: 'center', paddingLeft: '23px' }}>입금</td>
          <td style={{ width: '44px', textAlign: 'center' }}>입금</td>
          <td style={{ width: '44px', textAlign: 'center' }}>입금</td>
          <td style={{ width: '65px', textAlign: 'center', paddingRight: '23px' }}>입금</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CodeStates X Bithumb</title>
        <meta name="Bithumb" content="Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav setItem={(key: string) => setNavigation(key)} default={'home'} />
      {renderHeaderChart()}
      <div className={styles.contents_wrap}>
        <div className={styles.table_header_wrap}>
          <Tab
            tabs={{
              tabItems: [
                { key: 'krw', label: '원화 마켓', onClick: () => moveTab('krw') },
                { key: 'favorites', label: '즐겨 찾기', onClick: () => moveTab('favorites') },
              ],
              selectedTab: query.tab,
            }}
            contentsStyle={{ width: '260px', fontSize: '20px' }}
          />
          <Input
            type="text"
            placeholder="검색"
            className={styles.input_style}
            maxLength={12}
            handleChange={(value: string) => handleChange(value)}
            propValue={searchValue}
            clearButton="on"
          />
        </div>
        <Table
          theadWidth={[222, 161, 262, 192, 65, 44, 44, 65]}
          theadTextAlign={['left', 'right', 'right', 'right', 'center', 'center', 'center', 'center']}
          theadPadding={['0 0 0 30px', '0 13px', '0 24px 0 13px', '0 13px', '0 0 0 23px', '0', '0', '0 23px 0 0']}
          theadData={['자산', '실시간 시세', '변동률 (전일대비)', '거래금액(24H)', '입금', '출금', '차트', '거래']}
          tbodyData={tbodyData()}
          tbodyStyle={{ fontSize: '14px', fontWeight: 400 }}
          emptyTable={{
            text: '검색된 가상자산이 없습니다',
            style: { fontSize: '13px', textAlign: 'center', paddingTop: '20px' },
          }}
          tableStyle={{ width: '100%', maxHeight: '1073px', fontSize: '12px' }}
          // tbodyStyle={{ height: '975px', overflowY: 'auto' }}
        />
      </div>
      <footer className={styles.footer}>{'푸터'}</footer>
    </div>
  );
};

export default Home;
