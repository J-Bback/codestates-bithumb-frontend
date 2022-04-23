import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Exchange from '../exchange';

const Home = (props: any) => {
  const [navigation, setNavigation] = useState('home');
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeStates X Bithumb</title>
        <meta name="Bithumb" content="Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav setItem={(key: string) => setNavigation(key)} default={'home'} />

      {/* {tab === 'exchange' && <Exchange />} */}
      <footer className={styles.footer}>{'푸터'}</footer>
    </div>
  );
};

export default Home;
