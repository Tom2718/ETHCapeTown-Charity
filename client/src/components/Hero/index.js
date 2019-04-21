import React, { Component } from "react";
import styles from './Hero.module.scss';
import cx from 'classnames';
import logos from './ea_logo.png';

export default class Hero extends Component {

  renderLogo(name, imgUrl) {
    return (
      <div className={cx(styles.logo, styles[name])}>
        <img alt="zeppelin" className="logo-img"
          src={imgUrl} />
      </div>
    );
  }
  render()  {
    return (
      <div className={styles.Hero}>
        <div className={styles.hwrapper}>
          <div className={styles.left}>
            <h1> Charity Transparency </h1>
            <h2>
              Donate effectively, with blockchain.
            </h2>
            <div className={styles.sellingpoints}>
              <div className={styles.feature}>
                - Transparent funding process.
              </div>
              <div className={styles.feature}>
                - Verifiable donations.
              </div>
              <div className={styles.feature}>
                - Encourages and incentivizes good behaviour and 
                  whistleblowing.
              </div>
            </div>
            <div className={styles.ctas}>
              <a
                className={styles.mainLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Tom2718/ETHCapeTown-Charity">
               > View code on github
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <img alt="Zepkit" src={logos} />
          </div>
        </div>
      </div>
    );
  }
}
