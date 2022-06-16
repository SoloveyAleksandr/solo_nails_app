import React, { FC } from "react";

import styles from './Spiner.module.css';

const Spiner: FC = () => {
  return (
    <div className={styles.spinerWrapper}>
      <div className={styles.spiner}></div>
    </div>
  );
};

export default Spiner;
