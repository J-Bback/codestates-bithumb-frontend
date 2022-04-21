import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Nav from '../components/Nav';
import Exchange from '../exchange';

const Home = (props: any) => {
  const router = useRouter();
  const [navigation, setNavigation] = useState('home');

  useEffect(() => {
    router.push({ pathname: `/${navigation}` });
  }, [navigation]);
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeStates X Bithumb</title>
        <meta name="Bithumb" content="Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav setItem={(key: string) => setNavigation(key)} default={'home'} />
      {navigation === 'exchange' && <Exchange />}
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
