import { Progress } from 'antd';
import styles from '@/styles/progress.module.css';
export type ProgressProps = {
  titlePrefix: string;
  titleSuffix: string;
  value: number;
  total: number;
  color: string;
};

export default function TimeProgress({
  titlePrefix,
  titleSuffix,
  value,
  total,
  color,
}: ProgressProps) {
  return (
    <>
      <div className={styles.progress_box}>
        <div className={styles.progress_title}>
          {titlePrefix}已经过去
          <span className={styles.progress_value}>{value}</span>
          {titleSuffix}
        </div>
        <Progress
          percent={getPercent(value, total)}
          status={getStatus(value, total)}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
      </div>
    </>
  );
}

export function getPercent(value: number, total: number) {
  return ~~((value / total) * 100);
}

export function getStatus(value: number, total: number) {
  if ((value / total) * 100 >= 100) {
    return 'success';
  } else {
    return 'active';
  }
}
