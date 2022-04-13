import React, { useState } from 'react';
import styles from './Nav.module.scss';

type Items = {
  key: string;
  label: string;
};

interface Props {
  setItem: any;
}

const Nav = (props: Props) => {
  const [selected, setSelected] = useState('home');
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
