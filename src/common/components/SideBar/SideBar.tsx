import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../Button/Button';
import styles from './SideBar.module.css';

type SideBarProps = {
  readonly writings: {
    id: string;
    title: string;
  }[];
};

const SideBar = ({ writings }: SideBarProps) => {
  return (
    <aside className={styles.wrapper}>
      <header className={styles.header}>
        <Button
          value={<AiOutlinePlus />}
          circle={true}
          size="middle"
          color="green"
          onClick={() => {}}
        />
      </header>
      <ul>
        {writings.map((writing) => (
          <li key={writing.id} className={styles.writing}>
            <Button
              value={writing.title}
              color="transparent"
              size="full"
              onClick={() => {}}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
