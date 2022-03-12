import React, { MouseEventHandler } from 'react';

import Portal from '../Portal/Portal';
import styles from './Modal.module.css';

type ModalProps = {
  onClose: MouseEventHandler;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <Portal>
      <div onClick={onClose} className={styles.background}>
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
