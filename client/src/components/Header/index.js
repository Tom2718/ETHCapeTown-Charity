import React from 'react';
import styles from './header.module.scss';
import logo from '../../images/ea_logo.png';
import { Link } from 'react-router-dom'
import { Button } from 'rimble-ui';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <div className={styles.brand}>
        <a href="/" className={styles.link}> <img src={logo} alt="logo" /></a>
      </div>
      <ul>
        <li><Link to="/" className={styles.link}> Home</Link></li>
        <li><Link to="/donate" className={styles.link}> Donate</Link></li>
        <li><Link to="/charity" className={styles.link}> Charities</Link></li>
        <li><Link to="/validate" className={styles.link}> Validate</Link></li>
        <li><Link to="/faq" className={styles.link}> FAQ</Link></li>
        <li><Link to="/register" className={styles.link}><Button size="small">Register</Button></Link></li>
      </ul>
    </nav>
  </div>
)

export default Header;
