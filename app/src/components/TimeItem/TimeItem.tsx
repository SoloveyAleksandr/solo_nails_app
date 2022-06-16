import { FC } from 'react';
import { useAppSelector } from '../../store/hooks';

import styles from './TimeItem.module.css';

interface ITimeItem {
  time: string,
  removeFunc(): void,
  openFunc(): void,
};

const TimeItem: FC<ITimeItem> = ({
  time,
  removeFunc,
  openFunc,
}) => {
  const appState = useAppSelector(state => state.AppStore);
  return (
    <div
      className={styles.wrapper}
      onClick={() => !appState.isAdmin && openFunc}>
      <div className={styles.innerBox}>
        <span className={styles.time}>{time}</span>
        {
          appState.isAdmin &&
          <span
            className={styles.btn}
            onClick={removeFunc}></span>
        }
      </div>
    </div>
  );
};

export default TimeItem;