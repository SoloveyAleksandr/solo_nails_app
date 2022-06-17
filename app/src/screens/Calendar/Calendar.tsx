import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import CalendarGrid from '../../components/CalendarGrid/CalendarGrid';
import Header from '../../components/Header/Header';
import LoginBtn from '../../components/LoginBtn/LoginBtn';
import MonthSwitch from '../../components/MonthSwitch/MonthSwitch';
import Spiner from '../../components/Spiner/Spiner';
import WeekDays from '../../components/WeekDays/WeekDays';
import { setIsAdmin, setMonth, setNextMonth, setPrevMonth, setSelectedDate, setSelectedMonth, setYear } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Calendar.module.css';

interface ICalendar { };

interface IGetDay {
  (day: string): any
}

const Calendar: FC<ICalendar> = () => {
  const reduxDispatch = useAppDispatch();
  const appState = useAppSelector(state => state.AppStore);
  const [spinerIsActive, setActiveSpiner] = useState(true);

  useEffect(() => {
    setActiveSpiner(true);
    axios.get(`http://localhost:5000/:${appState.month}/:${appState.year}`)
      .then(resp => {
        const data = resp.data;
        reduxDispatch(setYear(data.year));
        reduxDispatch(setMonth(data.month));
        reduxDispatch(setSelectedMonth(data.calendarDays));
      })
      .catch(err => console.log(err))
      .finally(() => setActiveSpiner(false))
  }, []);

  useEffect(() => {
    setActiveSpiner(true);
    axios.get(`http://localhost:5000/:${appState.month}/:${appState.year}`)
      .then(resp => {
        const data = resp.data;
        reduxDispatch(setSelectedMonth(data.calendarDays));
      })
      .catch(err => console.log(err))
      .finally(() => setActiveSpiner(false))
  }, [appState.month]);

  const getDay: IGetDay = (date: string) => reduxDispatch(setSelectedDate(date));

  return (
    spinerIsActive ?
      <Spiner /> :
      <div className={styles.Calendar}>
        <Header>
          {
            appState.isAdmin ?
              <div onClick={() => reduxDispatch(setIsAdmin(false))}>log out</div> :
              <LoginBtn
                handleClick={() => reduxDispatch(setIsAdmin(true))} />
          }

          <MonthSwitch
            prevMonth={() => reduxDispatch(setPrevMonth())}
            nextMonth={() => reduxDispatch(setNextMonth())}
            month={appState.month}
            year={appState.year} />
        </Header>
        <div className={styles.weekDaysWrapper}>
          <WeekDays />
        </div>
        <CalendarGrid
          selectDay={getDay}
          prevMonth={() => reduxDispatch(setPrevMonth())}
          nextMonth={() => reduxDispatch(setNextMonth())} />
      </div>
  );
}

export default Calendar;
