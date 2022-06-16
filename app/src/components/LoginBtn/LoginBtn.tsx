import React, { FC } from 'react';

import styles from './LoginBtn.module.css';

interface ILoginBtn {
  handleClick(): void
};

const LoginBtn: FC<ILoginBtn> = ({handleClick}) => {
  return (
    <button className={styles.loginBtn}
    onClick={handleClick}>
    </button>
  )
};

export default LoginBtn;
