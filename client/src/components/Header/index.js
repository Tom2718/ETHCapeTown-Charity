import React from 'react';
import styles from './header.module.scss';
import logo from '../../images/ea_logo.png';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        <a href="/" className={styles.link}> <img src={logo} alt="logo" /></a>
      </div>
      <ul>
        <li><a href="/" className={styles.link}> Home</a></li>
        <li><a href="/donate" className={styles.link}> Donate</a></li>
        <li><a href="/charity" className={styles.link}> Charities</a></li>
        <li><a href="/faq" className={styles.link}> FAQ</a></li>
      </ul>
    </nav>
  </div>
)

export default Header;
