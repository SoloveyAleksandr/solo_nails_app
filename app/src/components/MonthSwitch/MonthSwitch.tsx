import React, { FC } from 'react';

import styles from './MonthSwitch.module.css';

interface IMonthSwitch {
  prevMonth(): void,
  nextMonth(): void,
  month: number,
  year: number,
}

const MonthSwitch: FC<IMonthSwitch> = ({
  prevMonth,
  nextMonth,
  month,
  year,
}) => {
  const monthNames: string[] = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',];

  return (
    <div className={styles.monthSwitch}>
      <button className={`${styles.switchBtn} ${styles.left}`}
        onClick={prevMonth}></button>
      <span className={styles.month}>
        {monthNames[month - 1]}
      </span>
      <span className={styles.year}>
        {year}
      </span>
      <button className={`${styles.switchBtn} ${styles.right}`}
        onClick={nextMonth}></button>

    </div>
  );
};

export default MonthSwitch;