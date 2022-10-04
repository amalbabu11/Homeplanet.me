import React from "react";
import styles from "./HomePage.module.css";

// Adapted from Finding Footprints: https://gitlab.com/AlejandroCantu/group2

const Home = () => {
  return (
    <>
    <div className={styles.homePage}></div>
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
