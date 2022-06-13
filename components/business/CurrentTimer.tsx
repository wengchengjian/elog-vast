import { useState } from 'react';
import useTime from '@/hooks/useTime';

import styles from '@/styles/time.module.css';

const colors = [
  '#2f90b9',
  '#c3d7df',
  '#132c33',
  '#1a94bc',
  '#b0d5df',
  '#737c7b',
  '#57c3c2',
  '#141e1b',
  '#45b787',
  '#20894d',
  '#b2cf87',
  '#f8df72',
  '#8e804b',
  '#393733',
  '#964d22',
  '#f27635',
  '#a6522c',
  '#773d31',
  '#eea2a4',
  '#c04851',
  '#2b1216',
  '#f03752',
  '#ec9bad',
  '#63071c',
];

export default function CurrentTimer() {
  const now = useTime(1);
  /**
   * 确定当前时间的颜色
   */
  const color = colors[now.hour() % colors.length];

  return (
    <>
      <div className={styles.time_box} style={{ color }}>
        <div className={styles.time_date}>{now.format('YYYY-MM-DD')}</div>
        <div className={styles.time_time}>{now.format('HH:mm:ss')}</div>
      </div>
    </>
  );
}
