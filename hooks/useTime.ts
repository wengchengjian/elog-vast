import moment from "moment";
import { useEffect, useState } from "react";

/**
 * 按照延迟更新时间
 * @param delay in seconds
 * @returns 
 */
export default function useTime(delay: number) {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, delay * 1000);

    return () => clearInterval(interval);
  }, [delay]);

  return time;
}