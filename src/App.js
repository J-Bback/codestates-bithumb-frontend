import styles from "./App.css";
import React, { useState, useEffect, useRef, Fragment } from "react";
import { priceFormat } from "./method";

const SocketTest = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataF, setDataF] = useState({
    BTC_KRW: {
      buyVolume: "",
      chgAmt: "",
      chgRate: "",
      closePrice: "",
      date: "",
      highPrice: "",
      lowPrice: "",
      openPrice: "",
      prevClosePrice: "",
      sellVolume: "",
      symbol: "",
      tickType: "",
      time: "",
      value: "",
      volume: "",
      volumePower: "",
    },
    ETH_KRW: {
      buyVolume: "",
      chgAmt: "",
      chgRate: "",
      closePrice: "",
      date: "",
      highPrice: "",
      lowPrice: "",
      openPrice: "",
      prevClosePrice: "",
      sellVolume: "",
      symbol: "",
      tickType: "",
      time: "",
      value: "",
      volume: "",
      volumePower: "",
    },
  });

  const webSocketUrl = `wss://pubwss.bithumb.com/pub/ws`;
  let ws = useRef(null);
  // 소켓 객체 생성
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
      ws.current.onmessage = async (evt) => {
        try {
        const data = await JSON.parse(evt.data);
        console.log('data', data.content.symbol);
        setTimeout(() => {
          setDataF((prev) => {
            return {
              ...prev,
              [data.content.symbol]: data.content,
            };
          });
          setLoading(false);
        }, 1000);
        } catch (error) {
          console.log(error);
        }
      };
    }

    // return () => {
    //   console.log("clean up");
    //   ws.current.close();
    // };
  }, []);

  // 소켓이 연결되었을 시에 send 메소드
  useEffect(() => {
    if (socketConnected) {
      // 웹소켓 요청
      ws.current.send(
        JSON.stringify({
          type: "ticker",
          symbols: ["BTC_KRW", "ETH_KRW"],
          tickTypes: ["30M", "1H", "12H", "24H", "MID"],
        })
      );

      setSendMsg(true);

    }
  }, [socketConnected]);

  const renderChart = () => {
    const chartData = [
      {
        label: '비트코인',
        price: dataF["BTC_KRW"].closePrice,
        chgRate: dataF["BTC_KRW"].chgRate,
      },
      {
        label: '이더리움',
        price: dataF["ETH_KRW"].closePrice,
        chgRate: dataF["BTC_KRW"].chgRate,
      },
    ];
    return (
      <div className={styles.header_chart}>
      {
      chartData.map((item, i) => {
        return (
      <div key={i + 'chart'}>
        {item.label}
      </div>
        )
      })
    }
      </div>
    )
  }

  return (
    <div className={styles.App}>
      {/* <header className={styles.header}>
        {renderChart()}
      </header> */}
      <div style={{ width: '50vw', flex: 1, margin: '5vw', marginLeft: '20vw', marginRight: '20vw' }}>
        <div
          style={{ color: '#fe9601', border: "1px solid #282828", display: "flex", justifyContent: "space-around", alignItems: 'center' }}
        >
          <div style={styles.header_title}>
            <p>심볼</p>
          </div>
          <div style={styles.header_title}>
            <p>현재가(KRW)</p>
          </div>
          <div style={styles.header_title}>
            <p>변동률(전일대비)</p>
          </div>
          <div style={styles.header_title}>
            <p>누적거래량</p>
          </div>
        </div>
       {!loading&& <>
        <div
          style={{
            marginTop: 5,
            border: "1px solid #282828",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            fontSize: 13,
          }}
        >
          <div style={styles.graph}>
            <p style={{ fontWeight: "bold" }}>BTC</p>
          </div>
          <div style={styles.graph}>
            <p>{priceFormat(dataF["BTC_KRW"].closePrice)}</p>
          </div>
          <div style={styles.graph, { color: dataF["BTC_KRW"].chgAmt > 0 ? '#f75467' : '#4386f9' }}>
            <p>{priceFormat(dataF["BTC_KRW"].chgAmt)}</p>
            <p>{dataF["BTC_KRW"].chgRate}%</p>
          </div>
          <div style={styles.graph}>
            <p>{priceFormat(dataF["BTC_KRW"].volume)}(백만)</p>
          </div>
        </div>

        <div
          style={{
            marginTop: 5,
            border: "1px solid #282828",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: 13,
          }}
        >
          <div style={styles.graph}>
            <p style={{ fontWeight: "bold" }}>ETH</p>
          </div>
          <div style={styles.graph}>
            <p>{priceFormat(dataF["ETH_KRW"].closePrice)}</p>
          </div>
          <div style={styles.graph, { color: dataF["BTC_KRW"].chgAmt > 0 ? '#f75467' : '#4386f9' }}>
            <p>{priceFormat(dataF["BTC_KRW"].chgAmt)}</p>
            <p>{dataF["ETH_KRW"].chgRate}%</p>
          </div>
          <div style={styles.graph}>
            <p>{priceFormat(dataF["ETH_KRW"].volume)}(백만)</p>
          </div>
        </div>


        </>}

        {loading && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SocketTest;
