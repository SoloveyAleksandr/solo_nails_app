import { FC } from 'react';
import { IWorkItem } from '../../store';
import { useAppSelector } from '../../store/hooks';

import styles from './TimeItem.module.css';

interface ITimeItem {
  timeItem: IWorkItem,
  adminBtnClick(): void,
  userBtnClick(): void,
};

const TimeItem: FC<ITimeItem> = ({
  timeItem,
  adminBtnClick,
  userBtnClick,
}) => {
  const appState = useAppSelector(state => state.AppStore);

  return (
    <div className={timeItem.reserved && !appState.isAdmin ? `${styles.wrapper} ${styles.disabled}` : styles.wrapper}>
      <div className={timeItem.reserved ?
        `${styles.header} ${styles._red}` : styles.header}>
        <span className={styles.time}>{timeItem.time}</span>
        <span
          className={timeItem.reserved ?
            `${styles.status} ${styles._red}` :
            `${styles.status} ${styles._green}`}>
          {timeItem.reserved ?
            'зарезервиравано' :
            'свободно'}
        </span>
      </div>
      <div className={styles.box}>
        {
          timeItem.reserved ?
            (appState.isAdmin ?
              <ul className={styles.list}>
                <li className={styles.listItem}>{`Имя: ${timeItem.client.name}`}</li>
                <li className={styles.listItem}>{`Телефон: ${timeItem.client.phone}`}</li>
                <li className={styles.listItem}>{`Комментарий: ${timeItem.client.comment}`}</li>
              </ul>
              : <></>) : <></>
        }
        {
          appState.isAdmin ?
            <button
              className={styles.btn}
              onClick={adminBtnClick}>удалить</button> :
            (timeItem.reserved ?
              <></> :
              <button
                className={styles.btn}
                onClick={userBtnClick}>записаться</button>)
        }
      </div>
    </div>
  );
};

export default TimeItem;