import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import React, { useState } from 'react';
import Nav from '../components/Nav';
import { Exchange } from '../exchange';

const Home = (props: any) => {
  const [tab, setTab] = useState('home');
  return (
    <div className={styles.container}>
      <Head>
        <title>CodeStates X Bithumb</title>
        <meta name="Bithumb" content="Exchange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav setItem={(key: string) => setTab(key)} />
      {tab === 'exchange' && <Exchange />}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
