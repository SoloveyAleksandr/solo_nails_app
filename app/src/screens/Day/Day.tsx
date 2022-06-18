import axios from 'axios';
import { FC, FormEvent, useEffect, useState } from 'react';
import BackBtn from '../../components/BackBtn/BackBtn';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';
import PlusBtn from '../../components/PlusBtn/PlusBtn';
import Popup from '../../components/Popup/Popup';
import ReserveForm from '../../components/ReserveForm/ReserveForm';
import Spiner from '../../components/Spiner/Spiner';
import TimeItem from '../../components/TimeItem/TimeItem';
import { setSelectedDay } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import styles from './Day.module.css';

interface IDay { };

const Day: FC<IDay> = () => {
  const reduxDispatch = useAppDispatch();
  const appState = useAppSelector(state => state.AppStore);

  const [spinerIsActive, setActiveSpiner] = useState(true);
  const [timePopupIsActive, setActiveTimePopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [formPopupIsActive, setActiveFormPopup] = useState(false);
  const [timeItemID, setTimeItemID] = useState('');
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formComment, setFormComment] = useState('');

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
      .then(() => getTime())
      .catch(e => console.log(e))
  }

  function deleteTime(id: string): void {
    const time = appState.selectedDay.workList.find(el => el.id === id);
    const confirmRequest = window.confirm(`Удалить время на ${time?.time}`);
    if (confirmRequest) {
      axios.delete(`http://localhost:5000/days:${appState.selectedDay.fullDate}/delete`, {
        data: {
          id,
        }
      })
        .then(() => getTime())
        .catch(e => console.log(e))
    }
    return;
  }

  function reserveTime(e: FormEvent) {
    e.preventDefault();
    axios.post(`http://localhost:5000/days:${appState.selectedDay.fullDate}/reserve`, {
      timeID: timeItemID,
      name: formName,
      phone: formPhone,
      comment: formComment,
    })
      .then(() => closeFormPopup())
      .catch(e => console.log(e))
      .finally(() => {
        getTime();
      })
  }

  function closeTimePopup() {
    setActiveTimePopup(false);
    setSelectedTime('10:00');
  }

  function closeFormPopup() {
    setFormName('');
    setFormPhone('');
    setFormComment('');
    setActiveFormPopup(false);
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
          timePopupIsActive ?
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
            </Popup>
            :
            <></>
        }

        {
          formPopupIsActive ?
            <div className={styles.formWrapper}>
              <Popup
                closeFunc={closeFormPopup}>
                <div className={styles.formPopup}>
                  <ReserveForm
                    name={formName}
                    phone={formPhone}
                    comment={formComment}
                    changeName={value => setFormName(value)}
                    changePhone={value => setFormPhone(value)}
                    changeComment={value => setFormComment(value)}
                    onSubmit={e => reserveTime(e)} />
                </div>
              </Popup>
            </div>
            :
            <></>
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
              appState.selectedDay.workList.length > 0 ?
                appState.selectedDay.workList.map(item =>
                  <li
                    key={item.id}
                    className={styles.listItem}>
                    <TimeItem
                      timeItem={item}
                      adminBtnClick={() => deleteTime(item.id)}
                      userBtnClick={() => {
                        setTimeItemID(item.id);
                        setActiveFormPopup(true);
                      }} />
                  </li>
                ) :
                <span className={styles.comment}>Записи нет :(</span>
            }
          </ul>
        </Container>
      </div>
  );
}

export default Day;
