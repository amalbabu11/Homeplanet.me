import React from "react";
import styles from "./HomePage.module.css";

const Home = () => {
  return (
    <>
    <div className={styles.homePage}></div>
    {/* <img alt="timer" src={require('../../assets/galaxy_background.jpeg')} /> */}
      <div className={styles.homeTitle}>
        HomePlanet
        <div className={styles.homeSubTitle}>
          Your Go-To Source For All Things Astronomy
          <div className={styles.homeSubTitle}>
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.homeSubTitle}>
        </div>
      </div>
    </>
  );
};
export default Home;
