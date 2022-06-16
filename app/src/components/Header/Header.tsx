import React, { FC, ReactNode, useEffect } from 'react';

import styles from './Header.module.css';

interface IHeader {
  children: React.ReactNode
};

const Header: FC<IHeader> = ({
  children
}) => {
  return (
    <header className={styles.header}>
      {children}
    </header>
  )
};

export default Header;
