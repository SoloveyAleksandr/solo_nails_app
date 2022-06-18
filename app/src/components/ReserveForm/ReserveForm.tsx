import { FC, FormEvent, ReactEventHandler } from 'react';

import styles from './ReserveForm.module.css';

interface IReserveForm {
  name: string,
  changeName(value: string): void,
  phone: string,
  changePhone(value: string): void,
  comment: string,
  changeComment(value: string): void,
  onSubmit(e: FormEvent): void
};

const ReserveForm: FC<IReserveForm> = ({
  name,
  phone,
  comment,
  changeName,
  changePhone,
  changeComment,
  onSubmit,
}) => {
  return (
    <form className={styles.form}
      onSubmit={(e) => onSubmit(e)}>
      <label className={styles.label} htmlFor="formName">Имя*</label>
      <input
        required
        id='formName'
        className={styles.mainInfo}
        type="text"
        value={name}
        onChange={(e) => changeName(e.target.value)} />

      <label className={styles.label} htmlFor="formPhone">Телефон*</label>
      <input
        required
        id='formPhone'
        className={styles.mainInfo}
        type="text"
        value={phone}
        onChange={(e) => changePhone(e.target.value)} />

      <label className={styles.label} htmlFor="formComment">Коментарий</label>
      <input
        id='formComment'
        className={styles.comment}
        type="textaria"
        value={comment}
        onChange={(e) => changeComment(e.target.value)} />

      <button
        type='submit'
        className={styles.btn}>
        записаться
      </button>
    </form>
  );
}

export default ReserveForm;
