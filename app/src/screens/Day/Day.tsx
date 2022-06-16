import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import BackBtn from '../../components/BackBtn/BackBtn';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import PlusBtn from '../../components/PlusBtn/PlusBtn';
import Popup from '../../components/Popup/Popup';
import Spiner from '../../components/Spiner/Spiner';
import TimeItem from '../../components/TimeItem/TimeItem';
import { IWorkItem, setSelectedDay } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Day.module.css';

interface IDay { };

const Day: FC<IDay> = () => {
  const reduxDispatch = useAppDispatch();
  const appState = useAppSelector(state => state.AppStore);
  const [spinerIsActive, setActiveSpiner] = useState(true);
  const [timePopupIsActive, setActiveTimePopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState('10:00')

  const monthNames: string[] = ['января', 'февраля', 'мара', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',];

  useEffect(() => {
    setActiveSpiner(true);
    axios.get(`http://localhost:5000/days:${appState.selectedDate}`)
      .then(resp => reduxDispatch(setSelectedDay(resp.data)))
      .catch(err => console.log(err))
      .finally(() => setActiveSpiner(false))
  }, []);

  function getTime(): void {
    setActiveSpiner(true);
    axios.get(`http://localhost:5000/days:${appState.selectedDate}`)
      .then(resp => reduxDispatch(setSelectedDay(resp.data)))
      .catch(err => console.log(err))
      .finally(() => setActiveSpiner(false))
  }

  function addTime(): void {
    closeTimePopup();
    axios.post(`http://localhost:5000/days:${appState.selectedDay.fullDate}/add`, { time: selectedTime }, {
      headers: { "Content-Type": "application/json" }
    })
      .catch(e => console.log(e))
      .finally(() => getTime())
  }

  function closeTimePopup() {
    setActiveTimePopup(false);
    setSelectedTime('10:00');
  }

  return (
    spinerIsActive ?
      <Spiner /> :
      <div className={styles.Day}>
        <Header>
          <BackBtn to={'/calendar'} />
          <span className={styles.dayInfo}>{appState.selectedDay.day} {monthNames[Number(appState.selectedDay.month) - 1]}</span>
        </Header>

        {
          timePopupIsActive && appState.isAdmin ?
            <Popup
              closeFunc={closeTimePopup}>
              <div className={styles.timePopup}>
                <input type="time"
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)} />
                <button
                  className={styles.timePopupBtn}
                  onClick={addTime}>
                  добавить
                </button>
              </div>
            </Popup> :
            <div></div>
        }

        <Container>
          <div className={styles.btnWrapper}>
            {
              appState.isAdmin &&
              <PlusBtn
                handleClick={() => setActiveTimePopup(true)} />
            }
          </div>

          <ul className={styles.list}>
            {
              appState.selectedDay.workList.map(item =>
                <TimeItem
                  key={item.id}
                  time={item.time}
                  removeFunc={() => console.log(`remove time: ${item.time}`)}
                  openFunc={() => console.log(`open time with ID: ${item.id}`)} />
              )
            }
          </ul>
        </Container>
      </div>
  );
}

interface IWorkTime {
  date: string,
  openTime: string,
  isFree?: boolean,
}

class WorkTime {
  date: string;
  openTime: string;
  isFree?: boolean;
  client?: {
    name: string,
    phone: string,
    comment: string,
  }
  constructor({
    date,
    openTime,
    isFree = true,
  }: IWorkTime) {
    this.date = date;
    this.openTime = openTime;
    this.isFree = isFree;
  }
}

// function WorkTime(
//   date: string,
//   time: string,
//   client?: string,
//   phone?: string,
//   comment?: string,
// ) {
//   this.date = date;
//   this.time = time;
//   this.client = client;
//   this.phone = phone;
//   this.comment = comment;
// }

export default Day;
