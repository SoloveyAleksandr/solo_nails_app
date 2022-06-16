import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { IDayItem } from "../../store";

import styles from './CalendarDay.module.css';

interface ICalendarDay {
  day: IDayItem,
  selectDay(date: string): void,
  prevMonth(): void,
  nextMonth(): void,
};

const CalendarDay: FC<ICalendarDay> = ({
  day,
  selectDay,
  prevMonth,
  nextMonth,
}) => {
  return (
    <div
      onClick={() => {
        if (day.isPrevMonth) {
          prevMonth();
          return;
        } else if (day.isNextMonth) {
          nextMonth();
          return;
        } else {
          selectDay(day.fullDate);
          return;
        }
      }}
      className={
        day.isPrevMonth || day.isNextMonth ?
          `${styles.calendarDay} ${styles.disabled}` :
          styles.calendarDay
      }>
      <span className={`${styles.day} ${day.isToday ? styles.isToday : ''}`}>
        {day.day}
      </span>
      {day.isToday && <span className={styles.marker}></span>}
    </div>
  );
};

export default CalendarDay;
