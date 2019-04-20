import React from "react";
import Hero from "../components/Hero/index.js";
import styles from '../App.module.scss';

export default class Home extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Hero />
      </div>
    )
  }
}
