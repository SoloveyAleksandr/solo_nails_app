import React, { FC } from 'react';
import styles from './Popup.module.css';

interface IPopup {
  children: React.ReactNode,
  closeFunc(): void,
};

const Popup: FC<IPopup> = ({
  children,
  closeFunc }) => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.background}
        onClick={closeFunc}></div>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <button
          className={styles.closeBtn}
          onClick={closeFunc}></button>
        </div>
        
        {children}
        
      </div>
    </div>
  );
};

export default Popup;