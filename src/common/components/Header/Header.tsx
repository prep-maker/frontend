import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.white}>PREP Maker</div>
      <div className={styles.yellow}></div>
    </header>
  );
};

export default Header;
