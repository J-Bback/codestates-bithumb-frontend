import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Nav.module.scss';

type Items = {
  key: string;
  label: string;
};

interface Props {
  setItem: any;
  default: string;
}

const Nav = (props: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(props.default);
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'exchange', label: 'Exchange' },
    { key: 'stake', label: 'Stake' },
    { key: 'farm', label: 'Farm' },
  ];
  const renderItems = () => {
    return (
      <div className={styles.itemWrap}>
        {items.map((v, i) => {
          return (
            <div
              key={'nav' + i}
              className={selected === v.key ? styles.activeItem : styles.item}
              onClick={() => selectItem(v.key)}>
              {v.label}
            </div>
          );
        })}
      </div>
    );
  };

  const selectItem = (key: string) => {
    if (key !== selected) {
      setSelected(key);
      props.setItem(key);
      if (key === 'exchange') {
        router.push(
          {
            pathname: '/exchange',
            query: { tab: 'krw' },
          },
          undefined,
          { shallow: true }
        );
        return;
      }
      router.push({ pathname: `/${key}` }, undefined, { shallow: true });
    }
  };

  return (
    <nav className={styles.nav}>
      <div style={{ fontSize: '24px' }}>BitCotes</div>
      {renderItems()}
      <div style={{ fontSize: '24px' }}>Login</div>
    </nav>
  );
};

export default Nav;
