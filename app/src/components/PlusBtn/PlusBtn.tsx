import React, { FC } from 'react';

import styles from './PlusBtn.module.css';

interface IPlusBtn {
  handleClick(): void;
}

const PlusBtn: FC<IPlusBtn> = ({
  handleClick,
}) => {
  return (
    <button
      className={styles.button}
      onClick={handleClick}></button>
  );
};

export default PlusBtn;