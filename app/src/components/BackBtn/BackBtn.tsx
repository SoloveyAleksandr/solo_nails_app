import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from './BackBtn.module.css';

interface IBackBtn {
  to: string
};

const BackBtn: FC<IBackBtn> = ({
  to,
}) => {
  return (
    <NavLink to={to} className={styles.button} />
  );
};

export default BackBtn;