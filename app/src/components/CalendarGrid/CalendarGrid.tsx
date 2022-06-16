import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import CalendarDay from "../CalendarDay/CalendarDay";

import styles from "./CalendarGrid.module.css";

interface ICalendarGrid {
  selectDay(day: string): {},
  prevMonth(): void,
  nextMonth(): void,
};

const CalendarGrid: FC<ICalendarGrid> = ({
  selectDay,
  prevMonth,
  nextMonth,
}) => {
  const appState = useAppSelector(state => state.AppStore);
  
  return (
    <div className={styles.calendarGrid}>
      {
        appState.selectedMonth.map(day =>
          !(day.isPrevMonth || day.isNextMonth) ?
            <NavLink to={'/day'} key={day.fullDate}>
              <CalendarDay
                day={day}
                selectDay={selectDay}
                prevMonth={prevMonth}
                nextMonth={nextMonth} />
            </NavLink>
            :
            <div key={day.fullDate}>
              <CalendarDay
                day={day}
                selectDay={selectDay}
                prevMonth={prevMonth}
                nextMonth={nextMonth} />
            </div>
        )
      }
    </div>
  )
}

export default CalendarGrid;
